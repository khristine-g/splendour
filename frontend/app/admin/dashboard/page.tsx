import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function AdminDashboard() {
  return (
    <DashboardShell userType="admin" userName="Admin">
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card><CardHeader className="pb-2 text-xs text-muted-foreground">Total Revenue</CardHeader>
          <CardContent className="text-2xl font-bold">$45,000</CardContent>
        </Card>
        <Card><CardHeader className="pb-2 text-xs text-muted-foreground">New Vendors</CardHeader>
          <CardContent className="text-2xl font-bold">12</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg font-serif">System Wide Bookings</CardTitle></CardHeader>
        <CardContent>
           {/* We will map over ALL bookings from the database here */}
           <p className="text-sm text-muted-foreground italic">Fetching live platform data...</p>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}