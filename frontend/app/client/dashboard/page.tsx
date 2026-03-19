import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ClientDashboard() {
  // Mock data for now - we will fetch this from /api/bookings later
  const myBookings = [
    { id: '1', vendor: 'Floral Magic', date: 'Oct 12, 2026', status: 'Confirmed', price: 450 },
  ]

  return (
    <DashboardShell userType="client" userName="Khristine">
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2 text-xs uppercase tracking-wider font-semibold opacity-80">Total Spent</CardHeader>
          <CardContent className="text-2xl font-bold">$1,200</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-xs uppercase tracking-wider font-semibold text-muted-foreground">Active Bookings</CardHeader>
          <CardContent className="text-2xl font-bold">2</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {myBookings.map((booking) => (
              <div key={booking.id} className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{booking.vendor}</p>
                  <p className="text-xs text-muted-foreground">{booking.date}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-1">{booking.status}</Badge>
                  <p className="text-sm font-bold">${booking.price}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}