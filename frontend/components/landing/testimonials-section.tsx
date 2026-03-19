// import Image from 'next/image'
// import { Star, Quote } from 'lucide-react'
// import { Card, CardContent } from '@/components/ui/card'
// import { testimonials } from '@/lib/mock-data'

// export function TestimonialsSection() {
//   return (
//     <section className="py-20">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <h2 className="font-serif text-3xl font-bold text-foreground text-balance sm:text-4xl">
//             Stories from Our Community
//           </h2>
//           <p className="mt-3 text-muted-foreground">
//             Real experiences from clients who created magic with Splendour
//           </p>
//         </div>

//         <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
//           {testimonials.map((t) => (
//             <Card key={t.id} className="relative overflow-hidden border-border">
//               <div className="absolute right-4 top-4 text-accent/20">
//                 <Quote className="h-12 w-12" />
//               </div>
//               <CardContent className="p-6">
//                 <div className="flex">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <Star key={star} className="h-4 w-4 fill-accent text-accent" />
//                   ))}
//                 </div>

//                 <p className="mt-4 text-sm leading-relaxed text-foreground italic">
//                   &ldquo;{t.quote}&rdquo;
//                 </p>

//                 <div className="mt-6 flex items-center gap-3">
//                   <div className="relative h-11 w-11 overflow-hidden rounded-full">
//                     <Image
//                       src={t.avatar}
//                       alt={t.name}
//                       fill
//                       className="object-cover"
//                       sizes="44px"
//                     />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-foreground">{t.name}</p>
//                     <p className="text-xs text-muted-foreground">{t.eventType}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
