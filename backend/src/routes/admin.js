import express from 'express';
import { prisma } from '../../prisma.config.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();


const isAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: "Access denied. Admin role required." });
  }
  next();
};


router.get('/stats', verifyToken, isAdmin, async (req, res) => {
  try {
    const [userCount, vendorCount, bookingCount, revenue] = await Promise.all([
      prisma.user.count(),
      prisma.vendor.count(),
      prisma.booking.count(),
      prisma.booking.aggregate({
        _sum: { totalAmount: true },
        where: { status: 'CONFIRMED' }
      })
    ]);

    res.json({
      users: userCount,
      vendors: vendorCount,
      bookings: bookingCount,
      revenue: revenue._sum.totalAmount || 0
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admin stats" });
  }
});


router.patch('/vendors/:id/verify', verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await prisma.vendor.update({
      where: { id: req.params.id },
      data: { verified: true }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Verification failed" });
  }
});
router.get('/activity', verifyToken, isAdmin, async (req, res) => {
  try {

    const recentBookings = await prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        client: { select: { name: true, email: true } },
        service: { select: { title: true } },
        vendor: { select: { name: true } }
      }
    });

  
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { 
        id: true, 
        name: true, 
        role: true, 
        createdAt: true 
      }
    });

    res.json({
      bookings: recentBookings,
      users: recentUsers
    });
  } catch (error) {
    console.error("Admin Activity Error:", error);
    res.status(500).json({ error: "Failed to fetch platform activity" });
  }
});
export default router;