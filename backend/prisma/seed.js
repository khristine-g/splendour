import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.service.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding finished.');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
