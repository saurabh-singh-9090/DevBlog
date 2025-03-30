'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { User, AuthState } from '@/types'
import { login as authLogin, logout as authLogout, getCurrentUser } from '@/lib/auth/auth'

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  })

  useEffect(() => {
    // Check if user is already logged in
    const user = getCurrentUser()
    setAuthState({
      user,
      isAuthenticated: !!user,
      isLoading: false
    })
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const user = await authLogin(email, password)
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      })
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    authLogout()
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    })
  }

  const value = {
    ...authState,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
