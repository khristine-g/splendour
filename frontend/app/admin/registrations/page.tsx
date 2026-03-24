'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UserPlus, Calendar, Mail } from 'lucide-react'

export default function NewRegistrationsPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/activity')
      .then(res => res.json())
      .then(data => {
        // We only want the users from the activity feed
        setUsers(data.users)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-10 animate-pulse font-serif">Loading New Members...</div>

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold italic text-slate-900">New Registrations</h1>
        <p className="text-sm text-slate-500 italic">Latest members to join the Splendour platform</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <Card key={user.id} className="border-none shadow-sm bg-white hover:border-l-4 hover:border-l-primary transition-all">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary border border-slate-200">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{user.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email || 'No email provided'}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <Badge className={user.role === 'VENDOR' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'} variant="secondary">
                  {user.role}
                </Badge>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-slate-100">
            <UserPlus className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 italic">No recent registrations found.</p>
          </div>
        )}
      </div>
    </div>
  )
}