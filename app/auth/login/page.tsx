'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'
import { FaEnvelope, FaLock, FaGoogle, FaGithub } from 'react-icons/fa'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await login(email, password)
      toast.success('Login successful!')
      router.push('/')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Log in to your account to continue
          </p>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  <FaEnvelope />
                </div>
                <Input 
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link 
                  href="/auth/forgot-password"
                  className="text-xs text-yellow-500 hover:text-yellow-600"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  <FaLock />
                </div>
                <Input 
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-yellow-500 hover:bg-yellow-600 mt-2"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" disabled={isLoading}>
                <FaGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" type="button" disabled={isLoading}>
                <FaGithub className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </form>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link 
              href="/auth/signup" 
              className="text-yellow-500 hover:text-yellow-600 font-medium"
            >
              Sign up
            </Link>
          </p>
          <div className="mt-4">
            <p className="text-xs text-muted-foreground">
              For demo, use one of these accounts or create your own:
            </p>
            <p className="text-xs text-muted-foreground">
              Admin: admin@example.com / admin123
            </p>
            <p className="text-xs text-muted-foreground">
              User: user@example.com / user123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 