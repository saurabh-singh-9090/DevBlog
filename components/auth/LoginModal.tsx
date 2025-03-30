'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

interface LoginModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  onSwitchToSignup: () => void
}

export function LoginModal({ isOpen, setIsOpen, onSwitchToSignup }: LoginModalProps) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      toast.success('Logged in successfully!')
      setIsOpen(false)
      // Reset form
      setEmail('')
      setPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login')
      toast.error('Failed to login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Login to DevBlog</DialogTitle>
          <DialogDescription>
            Enter your credentials to login to your account
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {error && (
            <div className="bg-red-50 text-red-500 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button variant="link" size="sm" className="px-0 text-xs">
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <DialogFooter className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:space-x-0">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onSwitchToSignup}
              disabled={isLoading}
            >
              Don&apos;t have an account? Sign up
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600"
            >
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
          </DialogFooter>
        </form>
        <div className="mt-4 text-center text-sm text-muted-foreground border-t pt-4">
          <p>Demo credentials:</p>
          <p>Admin: admin@example.com / admin123</p>
          <p>User: user@example.com / user123</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
