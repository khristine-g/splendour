'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/activity')
      .then(res => res.json())
      .then(data => setUsers(data.users))
  }, [])

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-serif font-bold italic">Clients</h1>
      <Card className="bg-white border-none shadow-sm">
        <div className="p-4 space-y-2">
          {users.map(u => (
            <div key={u.id} className="flex justify-between p-3 border-b last:border-0">
              <span className="font-medium text-sm">{u.name}</span>
              <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold uppercase">{u.role}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}