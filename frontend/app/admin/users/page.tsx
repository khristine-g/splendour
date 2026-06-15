// app/admin/users/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!API_URL) return

    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/activity`)

        if (!res.ok) throw new Error('Failed to fetch users')

        const data = await res.json()
        setUsers(data.users || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="p-8 text-slate-500 font-serif italic">
        Loading clients...
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-serif font-bold italic">
        Clients
      </h1>

      <Card className="bg-white border-none shadow-sm">
        <div className="p-4 space-y-2">
          {users.length > 0 ? (
            users.map((u) => (
              <div
                key={u.id}
                className="flex justify-between p-3 border-b last:border-0"
              >
                <span className="font-medium text-sm">
                  {u.name || 'Unknown User'}
                </span>

                <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold uppercase">
                  {u.role || 'USER'}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center py-6 text-sm text-slate-400">
              No users found
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}