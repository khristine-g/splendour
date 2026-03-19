// backend/seed.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('--- Start Seeding Splendour Data ---');

  // 1. Clean existing data (Optional but recommended for a fresh start)
  await prisma.booking.deleteMany();
  await prisma.service.deleteMany();
  await prisma.vendor.deleteMany();

  // 2. Define the Vendors and their nested Services
  const vendorsData = [
    {
      name: 'LensArt Photography',
      category: 'Photography',
      tagline: 'Capturing timeless moments with an artistic eye',
      description: 'LensArt Photography has been the premier choice for weddings for over a decade.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      coverImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
      rating: 4.9,
      reviewCount: 127,
      startingPrice: 1500,
      location: 'Nairobi',
      verified: true,
      featured: true,
      portfolio: [
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80'
      ],
      joinedDate: '2020-03-15',
      completedEvents: 312,
      services: {
        create: [
          {
            title: 'Full-Day Wedding Photography',
            description: 'Complete coverage from bridal prep to the last dance.',
            category: 'Photography',
            price: 3500,
            priceType: 'fixed',
            duration: '10–12 hours',
            image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
            inclusions: ['Two photographers', '500+ edited images', 'Online gallery']
          },
          {
            title: 'Corporate Event Photography',
            description: 'Professional photography for conferences and galas.',
            category: 'Photography',
            price: 1500,
            priceType: 'fixed',
            duration: '4–8 hours',
            image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
            inclusions: ['One lead photographer', 'Commercial usage licence']
          }
        ]
      }
    },
    {
      name: 'Golden Table Catering',
      category: 'Catering',
      tagline: 'Culinary excellence for every occasion',
      description: 'World-class cuisine from award-winning chefs.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80',
      coverImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
      rating: 4.8,
      reviewCount: 89,
      startingPrice: 3500,
      location: 'Mombasa',
      verified: true,
      featured: true,
      portfolio: ['https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80'],
      joinedDate: '2019-08-22',
      completedEvents: 245,
      services: {
        create: [
          {
            title: 'Premium Wedding Buffet',
            description: 'A lavish multi-course buffet for up to 300 guests.',
            category: 'Catering',
            price: 85,
            priceType: 'per_person',
            image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
            inclusions: ['Full buffet setup', 'Live cooking stations', 'Waitstaff']
          }
        ]
      }
    }
  ];

  // 3. Execute the creation
  for (const v of vendorsData) {
    await prisma.vendor.create({
      data: v,
    });
  }

  console.log('--- Seeding Finished Successfully! ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });