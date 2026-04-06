import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🇰🇪 Seeding Splendour database with 8 Vendors...')
  
  const hashedPassword = await bcrypt.hash('password123', 10)

  // 1. CLEANUP (Order is important to avoid foreign key errors)
  await prisma.transaction.deleteMany({})
  await prisma.booking.deleteMany({})
  await prisma.service.deleteMany({})
  await prisma.vendor.deleteMany({})
  await prisma.user.deleteMany({})

  const vendorData = [
    { name: 'Safari Lens Photography', category: 'Photography', location: 'Westlands, Nairobi', email: 'info@safarilens.co.ke', price: 45000, tagline: 'Capturing your wild side.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', cover: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80' },
    { name: 'Swahili Plate Catering', category: 'Catering', location: 'Nyali, Mombasa', email: 'chef@swahiliplate.com', price: 2500, tagline: 'The true taste of the coast.', avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxhY2slMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D', cover: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80' },
    { name: 'Zidi Luxe Decor', category: 'Decoration', location: 'Karen, Nairobi', email: 'hello@zidi.co.ke', price: 150000, tagline: 'Events beyond imagination.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', cover: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80' },
    { name: 'DJ Shinski Entertainment', category: 'DJ', location: 'Kilimani, Nairobi', email: 'bookings@shinski.com', price: 35000, tagline: 'The ultimate party vibe.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', cover: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80' },
    { name: 'Maina Kageni — Event Host', category: 'MC', location: 'Nairobi CBD', email: 'maina@events.co.ke', price: 80000, tagline: 'Your voice of elegance.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', cover: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80' },
    { name: 'Rift Film Studios', category: 'Videography', location: 'Nakuru City', email: 'produce@riftfilms.com', price: 60000, tagline: 'Cinematic memories of the Rift.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80', cover: 'https://images.unsplash.com/photo-1739526169655-0378b9aae5ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBwZW9wbGUlMjB3ZWRkaW5nfGVufDB8fDB8fHww' },
    { name: 'Lake View Florals', category: 'Floral', location: 'Milimani, Kisumu', email: 'flowers@lakeview.com', price: 12000, tagline: 'Fresh blooms from the lakeside.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80', cover: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80' },
    { name: 'Savannah Sound & Lights', category: 'DJ', location: 'Eldoret, Uasin Gishu', email: 'sound@savannah.co.ke', price: 25000, tagline: 'Crystal clear sound for your big day.', avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=200&q=80', cover: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80' },
  ]

  // 2. CREATE THE MAIN ADMIN ACCOUNT
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@splendour.com',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

  // 3. LOOP THROUGH VENDORS
  for (const v of vendorData) {
    // Create the User Account for the Vendor
    const user = await prisma.user.create({
      data: {
        name: v.name,
        email: v.email,
        password: hashedPassword,
        role: 'VENDOR',
        phone: '+254700000000'
      },
    })

    // Create the Vendor Profile (Linked to User)
    const vendor = await prisma.vendor.create({
      data: {
        id: user.id, // Linking Vendor to User
        name: v.name,
        category: v.category,
        tagline: v.tagline,
        description: `Top-tier ${v.category} services located in ${v.location}. Perfect for your next big event.`,
        avatar: v.avatar,
        coverImage: v.cover,
        joinedDate: new Date(), // Fixes ISO-8601 Error
        startingPrice: v.price,
        location: v.location,
        featured: true
      },
    })

    // Create the Service for this Vendor
    await prisma.service.create({
      data: {
        title: `Premium ${v.category} Package`,
        description: `Full access to all ${v.category.toLowerCase()} amenities and professional staff.`,
        category: v.category,
        price: v.price,
        image: v.cover,
        vendorId: vendor.id // Linking Service to Vendor
      }
    })
  }

  console.log('✅ Seeding complete! All 8 vendors and their services are live.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })