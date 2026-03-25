'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface User {
  id: string
  name: string
  email: string
  role: 'CLIENT' | 'VENDOR' | 'ADMIN'
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (userData: User, token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  
  const initializeAuth = useCallback(() => {
    try {
      const savedUser = localStorage.getItem('user')
      const token = localStorage.getItem('token')

      if (savedUser && token) {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        
      
        Cookies.set('user-role', parsedUser.role, { expires: 7, path: '/' })
      } else {
        
        setUser(null)
        Cookies.remove('user-role', { path: '/' })
      }
    } catch (error) {
      console.error("Auth initialization error:", error)
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      Cookies.remove('user-role', { path: '/' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  
  const login = (userData: User, token: string) => {
   
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
    
   
    Cookies.set('user-role', userData.role, { expires: 7, path: '/' })
    
    
    setUser(userData)

   
    if (userData.role === 'VENDOR') {
      router.push('/vendor/dashboard')
    } else if (userData.role === 'ADMIN') {
      router.push('/admin/dashboard')
    } else {
      router.push('/client/dashboard')
    }
  }

  
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    Cookies.remove('user-role', { path: '/' })
    
    setUser(null)
    router.push('/auth/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}