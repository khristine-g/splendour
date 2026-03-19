// //frontend/lib/mock-data.ts
// // ─── Splendour Events — Mock Data ────────────────────────────────────────────

// export type Category =
//   | 'Photography'
//   | 'Catering'
//   | 'Decoration'
//   | 'DJ'
//   | 'MC'
//   | 'Videography'
//   | 'Floral'

// export type BookingStatus =
//   | 'pending'
//   | 'confirmed'
//   | 'completed'
//   | 'cancelled'

// export type PaymentStatus = 'paid' | 'unpaid' | 'partial' | 'refunded'

// export interface Vendor {
//   id: string
//   name: string
//   category: Category
//   tagline: string
//   description: string
//   avatar: string
//   coverImage: string
//   rating: number
//   reviewCount: number
//   startingPrice: number
//   location: string
//   verified: boolean
//   featured: boolean
//   portfolio: string[]
//   services: Service[]
//   reviews: Review[]
//   joinedDate: string
//   completedEvents: number
// }

// export interface Service {
//   id: string
//   vendorId: string
//   vendorName: string
//   vendorAvatar: string
//   title: string
//   description: string
//   category: Category
//   price: number
//   priceType: 'fixed' | 'per_hour' | 'per_person'
//   duration?: string
//   image: string
//   rating: number
//   reviewCount: number
//   inclusions: string[]
// }

// export interface Review {
//   id: string
//   authorName: string
//   authorAvatar: string
//   rating: number
//   date: string
//   comment: string
//   eventType: string
// }

// export interface Booking {
//   id: string
//   clientName: string
//   clientEmail: string
//   vendorId: string
//   vendorName: string
//   serviceId: string
//   serviceName: string
//   category: Category
//   eventDate: string
//   eventLocation: string
//   notes: string
//   status: BookingStatus
//   paymentStatus: PaymentStatus
//   totalAmount: number
//   createdAt: string
// }

// export interface User {
//   id: string
//   name: string
//   email: string
//   role: 'client' | 'vendor' | 'admin'
//   avatar: string
//   joinedDate: string
//   phone?: string
// }

// // ─── Images (Unsplash stable URLs) ───────────────────────────────────────────
// const IMAGES = {
//   // Vendor covers
//   photo1: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
//   photo2: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
//   photo3: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80',
//   photo4: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
//   photo5: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
//   photo6: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
//   photo7: 'https://images.unsplash.com/photo-1487530811015-780f2241c527?w=800&q=80',
//   photo8: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
//   // Avatars
//   avatar1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
//   avatar2: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&q=80',
//   avatar3: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
//   avatar4: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
//   avatar5: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
//   avatar6: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
// }

// // ─── Reviews ─────────────────────────────────────────────────────────────────
// const sharedReviews: Review[] = [
//   {
//     id: 'r1',
//     authorName: 'Amara Johnson',
//     authorAvatar: IMAGES.avatar4,
//     rating: 5,
//     date: '2024-11-15',
//     comment: 'Absolutely incredible experience. Every detail was perfect and our guests were blown away. Would recommend 100 times over!',
//     eventType: 'Wedding',
//   },
//   {
//     id: 'r2',
//     authorName: 'David Mensah',
//     authorAvatar: IMAGES.avatar5,
//     rating: 5,
//     date: '2024-10-22',
//     comment: 'Professional, punctual, and incredibly talented. Exceeded all our expectations for our anniversary celebration.',
//     eventType: 'Anniversary Party',
//   },
//   {
//     id: 'r3',
//     authorName: 'Priya Sharma',
//     authorAvatar: IMAGES.avatar6,
//     rating: 4,
//     date: '2024-09-10',
//     comment: 'Great work overall. A few minor coordination hiccups but the final result was stunning. Would book again.',
//     eventType: 'Corporate Gala',
//   },
//   {
//     id: 'r4',
//     authorName: 'Marcus Williams',
//     authorAvatar: IMAGES.avatar1,
//     rating: 5,
//     date: '2024-08-05',
//     comment: 'Made our special day unforgettable. The team was warm, skilled, and really listened to what we wanted.',
//     eventType: 'Wedding',
//   },
// ]

// // ─── Vendors ─────────────────────────────────────────────────────────────────
// export const vendors: Vendor[] = [
//   {
//     id: 'v1',
//     name: 'LensArt Photography',
//     category: 'Photography',
//     tagline: 'Capturing timeless moments with an artistic eye',
//     description:
//       'LensArt Photography has been the premier choice for weddings, corporate events, and milestone celebrations for over a decade. Our team of award-winning photographers uses state-of-the-art equipment to deliver stunning, editorial-quality images that tell the story of your special day.',
//     avatar: IMAGES.avatar1,
//     coverImage: IMAGES.photo1,
//     rating: 4.9,
//     reviewCount: 127,
//     startingPrice: 1500,
//     location: 'Lagos, Nigeria',
//     verified: true,
//     featured: true,
//     portfolio: [IMAGES.photo1, IMAGES.photo2, IMAGES.photo3, IMAGES.photo4],
//     reviews: sharedReviews,
//     joinedDate: '2020-03-15',
//     completedEvents: 312,
//     services: [],
//   },
//   {
//     id: 'v2',
//     name: 'Golden Table Catering',
//     category: 'Catering',
//     tagline: 'Culinary excellence for every occasion',
//     description:
//       'Golden Table Catering brings world-class cuisine to your events. From intimate dinners to grand galas, our award-winning chefs craft menus that delight and inspire. We cater to all dietary requirements with elegance and precision.',
//     avatar: IMAGES.avatar2,
//     coverImage: IMAGES.photo5,
//     rating: 4.8,
//     reviewCount: 89,
//     startingPrice: 3500,
//     location: 'Abuja, Nigeria',
//     verified: true,
//     featured: true,
//     portfolio: [IMAGES.photo5, IMAGES.photo2, IMAGES.photo7, IMAGES.photo8],
//     reviews: sharedReviews,
//     joinedDate: '2019-08-22',
//     completedEvents: 245,
//     services: [],
//   },
//   {
//     id: 'v3',
//     name: 'Bloom & Luxe Decor',
//     category: 'Decoration',
//     tagline: 'Transforming spaces into extraordinary experiences',
//     description:
//       'Bloom & Luxe specialises in high-end event décor that transforms any venue into a breathtaking backdrop. Our creative directors work closely with you to bring your vision to life, sourcing premium materials and crafting bespoke installations.',
//     avatar: IMAGES.avatar3,
//     coverImage: IMAGES.photo3,
//     rating: 4.9,
//     reviewCount: 203,
//     startingPrice: 2000,
//     location: 'Lagos, Nigeria',
//     verified: true,
//     featured: true,
//     portfolio: [IMAGES.photo3, IMAGES.photo4, IMAGES.photo8, IMAGES.photo1],
//     reviews: sharedReviews,
//     joinedDate: '2018-05-10',
//     completedEvents: 418,
//     services: [],
//   },
//   {
//     id: 'v4',
//     name: 'DJ Supreme',
//     category: 'DJ',
//     tagline: 'Setting the perfect soundtrack for your celebration',
//     description:
//       'DJ Supreme brings unmatched energy and musical expertise to every event. With a library of over 50,000 tracks spanning every genre and era, we read the crowd perfectly and keep your dance floor packed all night long.',
//     avatar: IMAGES.avatar5,
//     coverImage: IMAGES.photo6,
//     rating: 4.7,
//     reviewCount: 156,
//     startingPrice: 800,
//     location: 'Port Harcourt, Nigeria',
//     verified: true,
//     featured: false,
//     portfolio: [IMAGES.photo6, IMAGES.photo2, IMAGES.photo5, IMAGES.photo7],
//     reviews: sharedReviews,
//     joinedDate: '2021-01-18',
//     completedEvents: 289,
//     services: [],
//   },
//   {
//     id: 'v5',
//     name: 'Victor Osei — MC & Host',
//     category: 'MC',
//     tagline: 'Keeping your event flowing with charisma and class',
//     description:
//       'Victor Osei is a renowned Master of Ceremonies with 15 years of experience hosting weddings, corporate galas, award ceremonies, and product launches. His warm personality, quick wit, and professional polish guarantee an unforgettable experience.',
//     avatar: IMAGES.avatar1,
//     coverImage: IMAGES.photo2,
//     rating: 4.95,
//     reviewCount: 78,
//     startingPrice: 600,
//     location: 'Accra, Ghana',
//     verified: true,
//     featured: true,
//     portfolio: [IMAGES.photo2, IMAGES.photo6, IMAGES.photo3, IMAGES.photo5],
//     reviews: sharedReviews,
//     joinedDate: '2022-09-05',
//     completedEvents: 134,
//     services: [],
//   },
//   {
//     id: 'v6',
//     name: 'CineVision Videography',
//     category: 'Videography',
//     tagline: 'Cinematic storytelling for your most important moments',
//     description:
//       'CineVision creates breathtaking cinematic films for weddings and events. Using cinema-grade cameras and advanced colour grading, we deliver films that feel like Hollywood productions.',
//     avatar: IMAGES.avatar6,
//     coverImage: IMAGES.photo7,
//     rating: 4.85,
//     reviewCount: 62,
//     startingPrice: 2200,
//     location: 'Lagos, Nigeria',
//     verified: true,
//     featured: false,
//     portfolio: [IMAGES.photo7, IMAGES.photo1, IMAGES.photo4, IMAGES.photo8],
//     reviews: sharedReviews,
//     joinedDate: '2021-11-30',
//     completedEvents: 98,
//     services: [],
//   },
//   {
//     id: 'v7',
//     name: 'Petals & Grace Florals',
//     category: 'Floral',
//     tagline: 'Luxury floral designs for extraordinary events',
//     description:
//       'Petals & Grace creates stunning floral arrangements and installations for weddings and luxury events. Every arrangement is handcrafted using the freshest seasonal blooms sourced from the world\'s finest growers.',
//     avatar: IMAGES.avatar4,
//     coverImage: IMAGES.photo8,
//     rating: 4.75,
//     reviewCount: 91,
//     startingPrice: 1200,
//     location: 'Lagos, Nigeria',
//     verified: false,
//     featured: false,
//     portfolio: [IMAGES.photo8, IMAGES.photo3, IMAGES.photo5, IMAGES.photo2],
//     reviews: sharedReviews,
//     joinedDate: '2023-02-14',
//     completedEvents: 67,
//     services: [],
//   },
//   {
//     id: 'v8',
//     name: 'Harmony Sound & Lights',
//     category: 'DJ',
//     tagline: 'Professional sound & lighting for epic events',
//     description:
//       'Harmony provides complete audio/visual solutions including professional DJs, sound systems, and lighting rigs. We handle everything from intimate lounge sets to stadium-scale productions.',
//     avatar: IMAGES.avatar3,
//     coverImage: IMAGES.photo4,
//     rating: 4.6,
//     reviewCount: 44,
//     startingPrice: 1100,
//     location: 'Kano, Nigeria',
//     verified: false,
//     featured: false,
//     portfolio: [IMAGES.photo4, IMAGES.photo6, IMAGES.photo1, IMAGES.photo7],
//     reviews: sharedReviews,
//     joinedDate: '2023-07-19',
//     completedEvents: 52,
//     services: [],
//   },
// ]

// // ─── Services ─────────────────────────────────────────────────────────────────
// export const services: Service[] = [
//   {
//     id: 's1',
//     vendorId: 'v1',
//     vendorName: 'LensArt Photography',
//     vendorAvatar: IMAGES.avatar1,
//     title: 'Full-Day Wedding Photography',
//     description:
//       'Complete coverage of your wedding day from bridal prep to the last dance. Includes two photographers, 500+ edited images, and a luxe online gallery delivered within 4 weeks.',
//     category: 'Photography',
//     price: 3500,
//     priceType: 'fixed',
//     duration: '10–12 hours',
//     image: IMAGES.photo1,
//     rating: 4.9,
//     reviewCount: 127,
//     inclusions: [
//       'Two professional photographers',
//       '500+ fully edited images',
//       'Private online gallery',
//       'High-resolution digital downloads',
//       'Complimentary engagement shoot',
//       'Printed photo album (optional add-on)',
//     ],
//   },
//   {
//     id: 's2',
//     vendorId: 'v1',
//     vendorName: 'LensArt Photography',
//     vendorAvatar: IMAGES.avatar1,
//     title: 'Corporate Event Photography',
//     description:
//       'Professional photography for conferences, product launches, and corporate galas. Crisp, high-quality images ready for press and marketing use.',
//     category: 'Photography',
//     price: 1500,
//     priceType: 'fixed',
//     duration: '4–8 hours',
//     image: IMAGES.photo2,
//     rating: 4.8,
//     reviewCount: 54,
//     inclusions: [
//       'One lead photographer',
//       '200+ edited images',
//       'Same-day preview gallery',
//       'Commercial usage licence',
//     ],
//   },
//   {
//     id: 's3',
//     vendorId: 'v2',
//     vendorName: 'Golden Table Catering',
//     vendorAvatar: IMAGES.avatar2,
//     title: 'Premium Wedding Buffet',
//     description:
//       'A lavish multi-course buffet for up to 300 guests featuring live cooking stations, premium cuts, and a dedicated service team ensuring impeccable presentation.',
//     category: 'Catering',
//     price: 85,
//     priceType: 'per_person',
//     image: IMAGES.photo5,
//     rating: 4.8,
//     reviewCount: 89,
//     inclusions: [
//       'Full buffet setup & service',
//       'Live cooking stations',
//       'Dedicated service staff (1:15 ratio)',
//       'All crockery, cutlery & linens',
//       'Dessert station',
//       'Non-alcoholic beverages',
//     ],
//   },
//   {
//     id: 's4',
//     vendorId: 'v2',
//     vendorName: 'Golden Table Catering',
//     vendorAvatar: IMAGES.avatar2,
//     title: 'Cocktail Reception Package',
//     description:
//       'Elegant cocktail canapés, finger foods, and small plates for up to 150 guests. Perfect for corporate mixers, engagement parties, and cocktail-style receptions.',
//     category: 'Catering',
//     price: 45,
//     priceType: 'per_person',
//     image: IMAGES.photo7,
//     rating: 4.7,
//     reviewCount: 43,
//     inclusions: [
//       '15 canapé varieties',
//       'Miniature desserts',
//       'Beverage service',
//       'Waitstaff for 3 hours',
//     ],
//   },
//   {
//     id: 's5',
//     vendorId: 'v3',
//     vendorName: 'Bloom & Luxe Decor',
//     vendorAvatar: IMAGES.avatar3,
//     title: 'Luxury Wedding Décor Package',
//     description:
//       'Complete venue transformation including ceremony arch, table centrepieces, sweetheart table, aisle décor, and a custom neon sign.',
//     category: 'Decoration',
//     price: 5500,
//     priceType: 'fixed',
//     image: IMAGES.photo3,
//     rating: 4.9,
//     reviewCount: 203,
//     inclusions: [
//       'Custom floral ceremony arch',
//       '20 table centrepieces',
//       'Sweetheart table styling',
//       'Aisle runners & pew décor',
//       'Custom neon sign',
//       'Setup & breakdown crew',
//     ],
//   },
//   {
//     id: 's6',
//     vendorId: 'v4',
//     vendorName: 'DJ Supreme',
//     vendorAvatar: IMAGES.avatar5,
//     title: 'Wedding DJ Experience',
//     description:
//       'Full reception DJ service with custom playlist curation, state-of-the-art sound system, intelligent lighting rig, and MC duties for ceremony transitions.',
//     category: 'DJ',
//     price: 1800,
//     priceType: 'fixed',
//     duration: '6 hours',
//     image: IMAGES.photo6,
//     rating: 4.7,
//     reviewCount: 156,
//     inclusions: [
//       'Custom playlist consultation',
//       'Professional sound system',
//       'LED lighting rig',
//       'Wireless microphone',
//       'MC announcements',
//       '1 hour overtime included',
//     ],
//   },
//   {
//     id: 's7',
//     vendorId: 'v5',
//     vendorName: 'Victor Osei — MC & Host',
//     vendorAvatar: IMAGES.avatar1,
//     title: 'Wedding MC & Host',
//     description:
//       'Seamless hosting of your wedding reception — from introductions and toasts to first dances and cake cutting. Victor ensures every transition is smooth and every guest is engaged.',
//     category: 'MC',
//     price: 1200,
//     priceType: 'fixed',
//     duration: '5 hours',
//     image: IMAGES.photo2,
//     rating: 4.95,
//     reviewCount: 78,
//     inclusions: [
//       'Pre-event consultation',
//       'Customised run-of-show',
//       'Guest engagement activities',
//       'Coordination with vendors',
//       'Post-event report',
//     ],
//   },
//   {
//     id: 's8',
//     vendorId: 'v6',
//     vendorName: 'CineVision Videography',
//     vendorAvatar: IMAGES.avatar6,
//     title: 'Cinematic Wedding Film',
//     description:
//       'A full-length cinematic wedding film (4–6 minutes highlight + 20+ minute documentary cut) captured on cinema-grade cameras with drone aerials.',
//     category: 'Videography',
//     price: 4500,
//     priceType: 'fixed',
//     duration: '10–12 hours',
//     image: IMAGES.photo7,
//     rating: 4.85,
//     reviewCount: 62,
//     inclusions: [
//       '2-camera shoot',
//       'Drone aerial footage',
//       '4–6 min highlight film',
//       '20+ min documentary cut',
//       'Ceremony & speeches in full',
//       'Online streaming gallery',
//     ],
//   },
// ]

// // Attach services to vendors
// vendors.forEach((vendor) => {
//   vendor.services = services.filter((s) => s.vendorId === vendor.id)
// })

// // ─── Bookings ─────────────────────────────────────────────────────────────────
// export const bookings: Booking[] = [
//   {
//     id: 'b1',
//     clientName: 'Amara Johnson',
//     clientEmail: 'amara@example.com',
//     vendorId: 'v1',
//     vendorName: 'LensArt Photography',
//     serviceId: 's1',
//     serviceName: 'Full-Day Wedding Photography',
//     category: 'Photography',
//     eventDate: '2025-06-14',
//     eventLocation: 'Four Seasons Hotel, Lagos',
//     notes: 'Please arrive by 9am for bridal prep coverage.',
//     status: 'confirmed',
//     paymentStatus: 'paid',
//     totalAmount: 3500,
//     createdAt: '2025-01-10',
//   },
//   {
//     id: 'b2',
//     clientName: 'David Mensah',
//     clientEmail: 'david@example.com',
//     vendorId: 'v2',
//     vendorName: 'Golden Table Catering',
//     serviceId: 's3',
//     serviceName: 'Premium Wedding Buffet',
//     category: 'Catering',
//     eventDate: '2025-07-05',
//     eventLocation: 'Eko Hotel, Victoria Island',
//     notes: '200 guests, 30 vegetarian, 10 vegan.',
//     status: 'pending',
//     paymentStatus: 'unpaid',
//     totalAmount: 17000,
//     createdAt: '2025-02-20',
//   },
//   {
//     id: 'b3',
//     clientName: 'Priya Sharma',
//     clientEmail: 'priya@example.com',
//     vendorId: 'v3',
//     vendorName: 'Bloom & Luxe Decor',
//     serviceId: 's5',
//     serviceName: 'Luxury Wedding Décor Package',
//     category: 'Decoration',
//     eventDate: '2025-05-20',
//     eventLocation: 'Transcorp Hilton, Abuja',
//     notes: 'Colour palette: ivory, blush, and gold.',
//     status: 'confirmed',
//     paymentStatus: 'partial',
//     totalAmount: 5500,
//     createdAt: '2025-01-28',
//   },
//   {
//     id: 'b4',
//     clientName: 'Marcus Williams',
//     clientEmail: 'marcus@example.com',
//     vendorId: 'v4',
//     vendorName: 'DJ Supreme',
//     serviceId: 's6',
//     serviceName: 'Wedding DJ Experience',
//     category: 'DJ',
//     eventDate: '2024-12-01',
//     eventLocation: 'Landmark Event Centre, Lagos',
//     notes: 'Afrobeats heavy set, plus classic RnB.',
//     status: 'completed',
//     paymentStatus: 'paid',
//     totalAmount: 1800,
//     createdAt: '2024-09-14',
//   },
//   {
//     id: 'b5',
//     clientName: 'Amara Johnson',
//     clientEmail: 'amara@example.com',
//     vendorId: 'v5',
//     vendorName: 'Victor Osei — MC & Host',
//     serviceId: 's7',
//     serviceName: 'Wedding MC & Host',
//     category: 'MC',
//     eventDate: '2025-06-14',
//     eventLocation: 'Four Seasons Hotel, Lagos',
//     notes: 'Same event as photography booking.',
//     status: 'confirmed',
//     paymentStatus: 'paid',
//     totalAmount: 1200,
//     createdAt: '2025-01-12',
//   },
//   {
//     id: 'b6',
//     clientName: 'Fatima Al-Hassan',
//     clientEmail: 'fatima@example.com',
//     vendorId: 'v1',
//     vendorName: 'LensArt Photography',
//     serviceId: 's2',
//     serviceName: 'Corporate Event Photography',
//     category: 'Photography',
//     eventDate: '2025-03-08',
//     eventLocation: 'Lagos Business School',
//     notes: 'Annual awards ceremony, ~150 attendees.',
//     status: 'cancelled',
//     paymentStatus: 'refunded',
//     totalAmount: 1500,
//     createdAt: '2025-02-01',
//   },
// ]

// // ─── Users ─────────────────────────────────────────────────────────────────────
// export const users: User[] = [
//   { id: 'u1', name: 'Amara Johnson', email: 'amara@example.com', role: 'client', avatar: IMAGES.avatar4, joinedDate: '2024-05-12', phone: '+234 801 234 5678' },
//   { id: 'u2', name: 'David Mensah', email: 'david@example.com', role: 'client', avatar: IMAGES.avatar5, joinedDate: '2024-08-03' },
//   { id: 'u3', name: 'Priya Sharma', email: 'priya@example.com', role: 'client', avatar: IMAGES.avatar6, joinedDate: '2024-07-19' },
//   { id: 'u4', name: 'Marcus Williams', email: 'marcus@example.com', role: 'client', avatar: IMAGES.avatar1, joinedDate: '2024-03-22' },
//   { id: 'u5', name: 'Chioma Obi', email: 'chioma@lensart.com', role: 'vendor', avatar: IMAGES.avatar2, joinedDate: '2020-03-15' },
//   { id: 'u6', name: 'Victor Osei', email: 'victor@mchost.com', role: 'vendor', avatar: IMAGES.avatar1, joinedDate: '2022-09-05' },
//   { id: 'u7', name: 'Admin User', email: 'admin@splendourevents.com', role: 'admin', avatar: IMAGES.avatar3, joinedDate: '2019-01-01' },
// ]

// // ─── Analytics (Admin) ────────────────────────────────────────────────────────
// export const adminAnalytics = {
//   totalRevenue: 284500,
//   totalBookings: 1847,
//   totalVendors: 142,
//   totalClients: 3291,
//   revenueByMonth: [
//     { month: 'Jan', revenue: 18400 },
//     { month: 'Feb', revenue: 21200 },
//     { month: 'Mar', revenue: 19800 },
//     { month: 'Apr', revenue: 24600 },
//     { month: 'May', revenue: 28100 },
//     { month: 'Jun', revenue: 32400 },
//     { month: 'Jul', revenue: 29700 },
//     { month: 'Aug', revenue: 35200 },
//     { month: 'Sep', revenue: 31600 },
//     { month: 'Oct', revenue: 26800 },
//     { month: 'Nov', revenue: 18500 },
//     { month: 'Dec', revenue: 38700 },
//   ],
//   bookingsByCategory: [
//     { category: 'Photography', count: 512 },
//     { category: 'Catering', count: 384 },
//     { category: 'Decoration', count: 298 },
//     { category: 'DJ', count: 267 },
//     { category: 'MC', count: 186 },
//     { category: 'Videography', count: 124 },
//     { category: 'Floral', count: 76 },
//   ],
// }

// // ─── Vendor Earnings (mock for vendor dashboard) ─────────────────────────────
// export const vendorEarnings = {
//   totalEarned: 42800,
//   pendingPayout: 5200,
//   thisMonth: 8400,
//   earningsByMonth: [
//     { month: 'Jan', earnings: 2800 },
//     { month: 'Feb', earnings: 3400 },
//     { month: 'Mar', earnings: 2900 },
//     { month: 'Apr', earnings: 4100 },
//     { month: 'May', earnings: 5200 },
//     { month: 'Jun', earnings: 4800 },
//     { month: 'Jul', earnings: 3600 },
//     { month: 'Aug', earnings: 6200 },
//     { month: 'Sep', earnings: 3900 },
//     { month: 'Oct', earnings: 2400 },
//     { month: 'Nov', earnings: 1800 },
//     { month: 'Dec', earnings: 8400 },
//   ],
// }

// // ─── Testimonials ─────────────────────────────────────────────────────────────
// export const testimonials = [
//   {
//     id: 't1',
//     name: 'Chiamaka & Emeka',
//     role: 'Wedding Couple',
//     avatar: IMAGES.avatar4,
//     quote: 'Splendour Events made finding the perfect vendors for our dream wedding effortless. Every vendor delivered beyond expectations and our day was absolutely magical.',
//     rating: 5,
//     eventType: 'Traditional Wedding',
//   },
//   {
//     id: 't2',
//     name: 'Tunde Adeyemi',
//     role: 'Corporate Events Manager',
//     avatar: IMAGES.avatar5,
//     quote: 'We\'ve used Splendour for three major corporate events now. The quality of vendors, the easy booking process, and the responsive support team are unmatched.',
//     rating: 5,
//     eventType: 'Annual Corporate Gala',
//   },
//   {
//     id: 't3',
//     name: 'Ngozi Okafor',
//     role: 'Birthday Celebrant',
//     avatar: IMAGES.avatar6,
//     quote: 'My 40th birthday party was the talk of Lagos! Splendour Events connected me with the most incredible decorator and caterer. Absolutely worth every penny.',
//     rating: 5,
//     eventType: 'Birthday Celebration',
//   },
// ]

// // ─── Categories ───────────────────────────────────────────────────────────────
// export const categories: { name: Category; icon: string; count: number }[] = [
//   { name: 'Photography', icon: '📷', count: 48 },
//   { name: 'Catering', icon: '🍽️', count: 36 },
//   { name: 'Decoration', icon: '🌸', count: 29 },
//   { name: 'DJ', icon: '🎧', count: 22 },
//   { name: 'MC', icon: '🎤', count: 18 },
//   { name: 'Videography', icon: '🎬', count: 15 },
//   { name: 'Floral', icon: '💐', count: 12 },
// ]

// // ─── Helper: Simulate async API ────────────────────────────────────────────────
// export async function fetchVendors(params?: {
//   category?: Category
//   search?: string
//   minRating?: number
//   maxPrice?: number
// }): Promise<Vendor[]> {
//   await new Promise((r) => setTimeout(r, 200))
//   let result = [...vendors]
//   if (params?.category) result = result.filter((v) => v.category === params.category)
//   if (params?.search) {
//     const q = params.search.toLowerCase()
//     result = result.filter(
//       (v) =>
//         v.name.toLowerCase().includes(q) ||
//         v.category.toLowerCase().includes(q) ||
//         v.location.toLowerCase().includes(q),
//     )
//   }
//   if (params?.minRating) result = result.filter((v) => v.rating >= params.minRating!)
//   if (params?.maxPrice) result = result.filter((v) => v.startingPrice <= params.maxPrice!)
//   return result
// }

// export async function fetchVendorById(id: string): Promise<Vendor | undefined> {
//   await new Promise((r) => setTimeout(r, 150))
//   return vendors.find((v) => v.id === id)
// }

// export async function fetchServiceById(id: string): Promise<Service | undefined> {
//   await new Promise((r) => setTimeout(r, 150))
//   return services.find((s) => s.id === id)
// }

// export async function fetchBookings(clientEmail?: string): Promise<Booking[]> {
//   await new Promise((r) => setTimeout(r, 200))
//   if (clientEmail) return bookings.filter((b) => b.clientEmail === clientEmail)
//   return bookings
// }
