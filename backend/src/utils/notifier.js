import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createNotification = async (userId, title, message) => {
  try {
    await prisma.notification.create({
      data: { userId, title, message }
    });
  } catch (error) {
    console.error("Notification Error:", error);
  }
};