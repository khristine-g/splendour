import { PrismaClient } from '@prisma/client'

// On version 5.20.0, this is all you need!
export const prisma = new PrismaClient();