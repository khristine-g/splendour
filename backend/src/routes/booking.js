import express from 'express';
import { prisma } from '../../prisma.config.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 * @access  Private (Logged-in users only)
 */
router.post('/', verifyToken, async (req, res) => {
  const { serviceId, bookingDate, status } = req.body;

  try {
    // req.user.id comes from our verifyToken middleware!
    const newBooking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        serviceId: parseInt(serviceId),
        bookingDate: new Date(bookingDate),
        status: status || 'PENDING',
      },
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ message: 'Failed to create booking' });
  }
});

/**
 * @route   GET /api/bookings/my-bookings
 * @desc    Get all bookings for the logged-in user
 */
router.get('/my-bookings', verifyToken, async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: { service: true } // This joins the Service table so you see the service name
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

export default router;