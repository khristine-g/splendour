import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// --- 1. IMPORT ROUTES ---
import authRoutes from './src/routes/auth.js';
import adminRoutes from './src/routes/admin.js';
import bookingRoutes from './src/routes/booking.js';
import notificationRoutes from './src/routes/notifications.js'; 
import paymentRoutes from './src/routes/payment.js'

const prisma = new PrismaClient();
const app = express();

// --- 2. MIDDLEWARE ---
app.use(cors()); 
app.use(express.json()); 

// Register notification routes BEFORE other specific routes
app.use('/api/notifications', notificationRoutes); 

// --- 3. ADMIN COMMAND CENTER ENDPOINTS ---
app.get('/api/admin/stats', async (req, res) => {
  try {
    const [
      userCount, 
      vendorCount, 
      totalBookingCount, 
      pendingBookingCount, // Specifically for the Sidebar Badge
      allBookings
    ] = await Promise.all([
      prisma.user.count(),
      prisma.vendor.count(),
      prisma.booking.count(),
      prisma.booking.count({ where: { status: 'PENDING' } }), // Count only PENDING
      prisma.booking.findMany()
    ]);

    // Calculate total revenue from all bookings
    const totalRevenue = allBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    res.json({ 
      users: userCount, 
      vendors: vendorCount, 
      bookings: pendingBookingCount, // This goes to the Sidebar badge
      totalBookings: totalBookingCount, // This can be used for the Overview charts
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

// --- 4. VENDOR & CATEGORY PUBLIC ROUTES ---
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

// --- 5. SERVICE MANAGEMENT ---
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

app.post('/api/services', async (req, res) => {
  const { title, description, price, priceType, category, image, duration, vendorId, inclusions } = req.body;
  try {
    const newService = await prisma.service.create({
      data: {
        title, description, category,
        price: parseInt(price),
        priceType, duration,
        image: image || "/placeholder-service.jpg",
        inclusions: inclusions || [],
        vendorId,
      },
    });
    res.status(201).json(newService);
  } catch (error) {
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

// --- 6. BOOKING MANAGEMENT ---
app.post('/api/bookings', async (req, res) => {
  const { clientId, vendorId, serviceId, eventDate, totalAmount } = req.body;
  
  try {
    // 1. Create the booking
    const booking = await prisma.booking.create({
      data: {
        clientId,
        vendorId, // Keeping vendorId so your schema doesn't break
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

    // 2. FIND THE ADMIN
    // This looks for the first user with the role 'ADMIN'
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    // 3. SEND NOTIFICATION TO ADMIN
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
        client: { select: { id: true } } // Get client ID to notify them
      }
    });

    // NOTIFY THE CLIENT OF THE RESULT
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
app.post('/api/payments/create-checkout', async (req, res) => {
  const { bookingId, amount, email, name } = req.body;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); 

  try {
    const response = await fetch("https://sandbox.intasend.com/api/v1/checkout/", {
  method: "POST",
  signal: controller.signal,
  headers: {
    // Ensure no extra spaces around the key
    "Authorization": `Bearer ${process.env.INTASEND_SECRET_KEY.trim()}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    public_key: process.env.INTASEND_PUBLIC_KEY.trim(),
    amount: Number(amount),
    currency: "KES",
    email: email || "customer@example.com",
    first_name: name || "Client",
    redirect_url: "http://localhost:3000/client/payment-success",
    method: "MPESA-STK-PUSH",
    api_ref: bookingId
  })
});

    clearTimeout(timeoutId);
    const data = await response.json();
    
    if (response.ok) {
      res.json({ url: data.url });
    } else {
      // LOG THIS: This will show you the exact field IntaSend hates
      console.log("--- INTASEND REJECTION DETAILS ---");
      console.log(data); 
      console.log("----------------------------------");
      res.status(400).json({ error: "IntaSend rejected request", details: data });
    }
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("Payment error:", error);
    res.status(500).json({ error: "Connection failed" });
  }
});
// --- 7. ROUTES REGISTRATION ---
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Splendour Backend running on http://localhost:${PORT}`));