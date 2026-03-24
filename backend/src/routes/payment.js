// backend/src/routes/payment.js
import express from 'express';
const router = express.Router();

router.post('/create-checkout', async (req, res) => {
  const { bookingId, amount, email, name } = req.body;

  try {
    // 1. Call Payment Gateway API (e.g., Intasend)
    const response = await fetch("https://payment.intasend.com/api/v1/checkout/", {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${process.env.INTASEND_SECRET_KEY}`,
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        public_key: process.env.INTASEND_PUBLIC_KEY,
        amount: amount,
        currency: "KES",
        email: email,
        first_name: name,
        redirect_url: "http://localhost:3000/payment/success"
      })
    });

    const data = await response.json();

    // 2. Save Pending Transaction in DB
    await prisma.transaction.create({
      data: {
        bookingId,
        amount: parseFloat(amount),
        providerRef: data.id 
      }
    });

    res.json({ url: data.url }); // Send the checkout link to frontend
  } catch (error) {
    res.status(500).json({ error: "Payment initiation failed" });
  }
});
router.post('/webhook', async (req, res) => {
  const { invoice_id, state, challenge } = req.body;

  // 1. Verify the payment state
  if (state === 'COMPLETE') {
    // 2. Find the transaction and update it
    const transaction = await prisma.transaction.update({
      where: { providerRef: invoice_id },
      data: { status: 'SUCCESS' },
      include: { booking: true }
    });

    // 3. Mark the booking as PAID
    await prisma.booking.update({
      where: { id: transaction.bookingId },
      data: { status: 'PAID' }
    });

    // 4. Notify the Admin that money has arrived!
    await prisma.notification.create({
      data: {
        userId: 'ADMIN_ID',
        title: "Payment Received! 💰",
        message: `KSh ${transaction.amount} received for Booking #${transaction.bookingId.slice(-5)}`
      }
    });
  }

  res.json({ status: "received" });
});
export default router;