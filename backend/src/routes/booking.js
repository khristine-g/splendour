import express from 'express';
import { prisma } from '../../prisma.config.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/bookings/vendor
 * @desc    Fetch bookings for the logged-in vendor.
 * Tries to match by vendorId directly or via the Vendor record.
 */
router.get('/vendor', verifyToken, async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        OR: [
          { vendorId: req.user.id }, // Strategy A: User ID is the Vendor ID
          { 
            vendor: {
              // Strategy B: Find bookings where the vendor record matches the User ID
              id: req.user.id 
            } 
          }
        ]
      },
      include: {
        client: { 
          select: { name: true, email: true, phone: true } 
        },
        service: { 
          select: { title: true, price: true } 
        }
      },
      orderBy: { eventDate: 'asc' }
    });
    
    console.log(`✅ Vendor ${req.user.id} accessed dashboard. Found ${bookings.length} bookings.`);
    res.json(bookings);
  } catch (error) {
    console.error("Fetch Vendor Bookings Error:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

/**
 * @route   PATCH /api/bookings/:id/status
 */
router.patch('/:id/status', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await prisma.booking.update({
      where: { id },
      data: { status },
      include: { 
        client: true, 
        service: true 
      }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

/**
 * @route   GET /api/bookings/client/:id
 */
router.get('/client/:id', async (req, res) => {
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

/**
 * @route   POST /api/bookings
 */
router.post('/', async (req, res) => {
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
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking" });
  }
});

/**
 * @route   DELETE /api/bookings/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    await prisma.booking.delete({ where: { id: req.params.id } });
    res.json({ message: "Booking cancelled" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;