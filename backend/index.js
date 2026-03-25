import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import AfricasTalking from 'africastalking';




import authRoutes from './src/routes/auth.js';
import adminRoutes from './src/routes/admin.js';
import bookingRoutes from './src/routes/booking.js';
import notificationRoutes from './src/routes/notifications.js'; 
import paymentRoutes from './src/routes/payment.js'

const prisma = new PrismaClient();
const app = express();


const at = AfricasTalking({
  apiKey: process.env.AT_SANDBOX_API_KEY, 
  username: 'sandbox' 
});
const sms = at.SMS;


const sendDemoSMS = async (phone, vendorName, amount) => {
  try {
 
    let cleanPhone = phone.replace(/\D/g, '');

    
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '254' + cleanPhone.slice(1);
    } else if (!cleanPhone.startsWith('254')) {
      cleanPhone = '254' + cleanPhone;
    }


    const formattedPhone = `+${cleanPhone}`;

    console.log(`📡 Sending SMS to: ${formattedPhone}`); 

    const result = await sms.send({
      to: [formattedPhone],
      message: `Splendour 🥂: Payment of KES ${amount} for ${vendorName} received! Your booking is now PENDING approval.`,
      enqueue: true
    });
    
    console.log("📱 SMS Simulator Response:", result.SMSMessageData.Recipients[0].status);
  } catch (err) {
    console.error(" Africa's Talking Error:", err.message);
  }
};
app.get('/api/test-sms', async (req, res) => {
  await sendDemoSMS('254725952696', 'Test Vendor', '100');
  res.send('Check your simulator!');
});




app.use(cors()); 
app.use(express.json()); 


app.use('/api/notifications', notificationRoutes); 


app.get('/api/admin/stats', async (req, res) => {
  try {
    const [
      userCount, 
      vendorCount, 
      totalBookingCount, 
      pendingBookingCount, 
      allBookings
    ] = await Promise.all([
      prisma.user.count(),
      prisma.vendor.count(),
      prisma.booking.count(),
      prisma.booking.count({ where: { status: 'PENDING' } }), 
      prisma.booking.findMany()
    ]);

    
    const totalRevenue = allBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    res.json({ 
      users: userCount, 
      vendors: vendorCount, 
      bookings: pendingBookingCount, 
      totalBookings: totalBookingCount,
      revenue: totalRevenue 
    });
  } catch (err) {
    console.error("Stats Error:", err);
    res.status(500).json({ error: "Failed to fetch platform stats" });
  }
});

app.get('/api/admin/activity', async (req, res) => {
  try {
    const [recentBookings, recentUsers] = await Promise.all([
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          client: { select: { name: true } },
          vendor: { select: { name: true } },
          service: { select: { title: true } }
        }
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, role: true, createdAt: true }
      })
    ]);
    res.json({ bookings: recentBookings, users: recentUsers });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch activity stream" });
  }
});


app.get('/api/vendors', async (req, res) => {
  try {
    const vendors = await prisma.vendor.findMany({ include: { services: true } });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});

app.get('/api/vendors/:id', async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id: req.params.id },
      include: { services: true }
    });
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ error: "Error fetching vendor" });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const groupCategories = await prisma.vendor.groupBy({
      by: ['category'],
      _count: { category: true },
    });
    res.json(groupCategories.map(item => ({ name: item.category, count: item._count.category })));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});


app.get('/api/services/:id', async (req, res) => {
  try {
    const service = await prisma.service.findUnique({
      where: { id: req.params.id },
      include: { vendor: true }
    });
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/admin/add-vendor', async (req, res) => {
  const { name, category, location, price, tagline, avatar, cover } = req.body;

  try {
    const newVendor = await prisma.vendor.create({
      data: {
        name,
        category,
        location,
        startingPrice: parseInt(price) || 0,
        tagline,
        description: tagline, 
        avatar: avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
        coverImage: cover || "https://images.unsplash.com/photo-1519222970733-f546218fa6d7?w=800&q=80",
        joinedDate: new Date().toLocaleDateString(),
        featured: true,
      }
    });
    res.status(201).json(newVendor);
  } catch (err) {
    console.error("Add Vendor Error:", err);
    res.status(500).json({ error: "Failed to create vendor listing" });
  }
});


app.post('/api/admin/add-service', async (req, res) => {
  const { vendorId, title, category, price, description, image } = req.body;

  try {
    const newService = await prisma.service.create({
      data: {
        vendorId,
        title,
        category,
        price: parseInt(price),
        description,
        image: image || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
      }
    });
    res.status(201).json(newService);
  } catch (err) {
    console.error("Add Service Error:", err);
    res.status(500).json({ error: "Failed to add service" });
  }
});
app.delete('/api/services/:id', async (req, res) => {
  try {
    await prisma.booking.deleteMany({ where: { serviceId: req.params.id } });
    await prisma.service.delete({ where: { id: req.params.id } });
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete service" });
  }
});


app.post('/api/bookings', async (req, res) => {
  const { clientId, vendorId, serviceId, eventDate, totalAmount } = req.body;
  
  try {
    
    const booking = await prisma.booking.create({
      data: {
        clientId,
        vendorId, 
        serviceId,
        eventDate: new Date(eventDate),
        totalAmount: parseFloat(totalAmount),
        status: 'PENDING'
      },
      include: {
        client: { select: { name: true } },
        service: { select: { title: true } }
      }
    });

  
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

  
    if (adminUser) {
      await prisma.notification.create({
        data: {
          userId: adminUser.id,
          title: "New Booking for Approval",
          message: `${booking.client.name} wants to book "${booking.service.title}". Amount: KSh ${totalAmount}`,
          isRead: false
        }
      });
    }

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

app.get('/api/clients/:id/bookings', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { clientId: req.params.id },
      include: {
        vendor: { select: { name: true, category: true, avatar: true, location: true } },
        service: { select: { title: true, price: true } }
      },
      orderBy: { eventDate: 'desc' }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch client bookings" });
  }
});

app.patch('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; 
  
  try {
    const updated = await prisma.booking.update({ 
      where: { id }, 
      data: { status },
      include: {
        service: { select: { title: true } },
        client: { select: { id: true } } 
      }
    });

    await prisma.notification.create({
      data: {
        userId: updated.clientId,
        title: status === 'ACCEPTED' ? "Booking Confirmed! ✅" : "Booking Declined ❌",
        message: `Your request for "${updated.service.title}" has been ${status.toLowerCase()} by Splendour Admin.`
      }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking" });
  }
});
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    await prisma.booking.delete({ where: { id: req.params.id } });
    res.json({ message: "Booking cancelled" });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel booking" });
  }
});


app.post('/api/payments/stk-push', async (req, res) => {
  const { amount, phone, email, vendorName } = req.body;

  
  const secretKey = (process.env.INTASEND_SECRET_KEY || "").replace(/[^a-zA-Z0-9-_]/g, "").trim();
  const publicKey = (process.env.INTASEND_PUBLIC_KEY || "").replace(/[^a-zA-Z0-9-_]/g, "").trim();

  try {
    console.log(` Triggering STK Push for ${phone}...`);

    const response = await fetch("https://sandbox.intasend.com/api/v1/payment/mpesa-stk-push/", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + secretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_key: publicKey,
        amount: Number(amount),
        phone_number: phone, 
        email: email || "customer@example.com",
        api_ref: "Booking-" + Date.now() 
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log(" STK Push Initiated:", data);

      
      sendDemoSMS(phone, vendorName || 'Vendor', amount);

      res.json({ success: true, message: "Check your phone for the M-Pesa prompt" });
    } else {
      console.log("--- STK REJECTION ---", data);
      res.status(400).json({ error: "STK Push failed", details: data });
    }
  } catch (error) {
    console.error(" Connection failed:", error.message);
    res.status(500).json({ error: "Network Error" });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(` Splendour Backend running on http://localhost:${PORT}`));