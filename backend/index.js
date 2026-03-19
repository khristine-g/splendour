// backend/index.js 
import { verifyToken } from './src/middleware/authMiddleware.js';
import bookingRoutes from './src/routes/booking.js';
import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/auth.js';
import { PrismaClient } from '@prisma/client'; // Ensure prisma is imported

const prisma = new PrismaClient();
const app = express();

// --- 1. MIDDLEWARE FIRST ---
app.use(cors()); // Move this to the very top of the middleware section
app.use(express.json()); 

// --- 2. ROUTES SECOND ---

app.get('/api/auth/profile', verifyToken, (req, res) => {
  res.json({
    message: `Welcome to your profile, User #${req.user.id}`,
    user: req.user
  });
});

app.get('/api/vendors', async (req, res) => {
  try {
    const vendors = await prisma.vendor.findMany({
      include: {
        services: true 
      }
    });
    res.json(vendors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});
app.get('/api/vendors/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id },
      include: {
        services: true // This ensures the 'Services' tab in VendorProfile works
      }
    });

    if (!vendor) return res.status(404).json({ error: "Vendor not found" });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const groupCategories = await prisma.vendor.groupBy({
      by: ['category'],
      _count: {
        category: true,
      },
    });

    const formattedCategories = groupCategories.map((item) => ({
      name: item.category,
      count: item._count.category,
    }));

    res.json(formattedCategories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});
// backend/index.js

app.get('/api/clients/:id/bookings', async (req, res) => {
  const { id } = req.params;

  try {
    const bookings = await prisma.booking.findMany({
      where: { clientId: id },
      include: {
        vendor: {
          select: { name: true, avatar: true, location: true }
        },
        service: {
          select: { name: true, price: true }
        }
      },
      orderBy: { eventDate: 'asc' }
    });
    res.json(bookings);
  } catch (error) {
    console.error("Fetch client bookings error:", error);
    res.status(500).json({ error: "Failed to fetch your bookings" });
  }
});
app.get('/api/services/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const service = await prisma.service.findUnique({
      where: { id: id }, // Use the UUID string from the URL
      include: { 
        vendor: true // REQUIRED: service-detail.tsx needs service.vendor
      }
    });

    if (!service) {
      console.log(`Service with ID ${id} not found in DB`);
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/services', async (req, res) => {
  const { title, description, price, priceType, category, image, vendorId, inclusions } = req.body;

  try {
    const newService = await prisma.service.create({
      data: {
        title,
        description,
        category,
        price: parseInt(price),
        priceType, // e.g., "flat" or "per_person"
        image: image || "/placeholder-service.jpg",
        inclusions: inclusions || [],
        vendorId,
      },
    });
    res.status(201).json(newService);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Check if all required fields are sent" });
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
        totalAmount: parseFloat(totalAmount), // Ensure this is a number
        status: 'PENDING'
      },
    });
    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});


app.get('/api/vendors/:id/bookings', async (req, res) => {
  const { id } = req.params;

  try {
    const bookings = await prisma.booking.findMany({
      where: { vendorId: id },
      include: {
        client: {
          select: { name: true, email: true } // Only get what we need
        },
        service: {
          select: { name: true, price: true }
        }
      },
      orderBy: { eventDate: 'asc' } // Show upcoming events first
    });
    res.json(bookings);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

app.post('/api/vendors/:id/portfolio', async (req, res) => {
  const { id } = req.params;
  const { imageUrl } = req.body;

  try {
    // We fetch the current vendor to get their existing portfolio array
    const vendor = await prisma.vendor.findUnique({ where: { id } });
    
    // Add the new image to the existing array
    const updatedPortfolio = [...(vendor.portfolio || []), imageUrl];

    const updatedVendor = await prisma.vendor.update({
      where: { id },
      data: { portfolio: updatedPortfolio },
    });

    res.json(updatedVendor);
  } catch (error) {
    console.error("Portfolio update error:", error);
    res.status(500).json({ error: "Failed to update portfolio" });
  }
});
// backend/index.js

app.patch('/api/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Expecting 'CONFIRMED' or 'DECLINED'

  try {
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: { 
        client: true, // So we can send an email notification later
        service: true 
      }
    });
    res.json(updatedBooking);
  } catch (error) {
    console.error("Update booking error:", error);
    res.status(500).json({ error: "Failed to update booking status" });
  }
});

// Router-based routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));