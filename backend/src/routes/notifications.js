import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();


router.get('/:userId/count', async (req, res) => {
  try {
    const count = await prisma.notification.count({
      where: { userId: req.params.userId, isRead: false }
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Count fetch failed" });
  }
});


router.get('/:userId', async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.params.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Fetch failed" });
  }
});


router.patch('/:id/read', async (req, res) => {
  try {
    const updated = await prisma.notification.update({
      where: { id: req.params.id },
      data: { isRead: true }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});


router.patch('/:userId/read-all', async (req, res) => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.params.userId, isRead: false },
      data: { isRead: true }
    });
    res.json({ message: "All marked as read" });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});


router.delete('/:userId', async (req, res) => {
  try {
    await prisma.notification.deleteMany({ where: { userId: req.params.userId } });
    res.json({ message: "Cleared" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;