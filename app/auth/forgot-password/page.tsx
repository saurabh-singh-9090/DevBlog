'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { FaEnvelope } from 'react-icons/fa'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, just show a success message
      setIsSubmitted(true)
    } catch (error) {
      toast.error('Failed to send reset email. Please try again.')
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Reset Your Password</h1>
          <p className="text-muted-foreground mt-2">
            Enter your email to receive password reset instructions
          </p>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm p-6">
          {isSubmitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Check Your Email</h3>
              <p className="text-muted-foreground mb-4">
                We&apos;ve sent a password reset link to <strong>{email}</strong>.
                Please check your inbox and follow the instructions.
              </p>
              <Button asChild className="mt-2">
                <Link href="/auth/login">Return to Login</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
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
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-600 mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          )}
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link 
              href="/auth/login" 
              className="text-yellow-500 hover:text-yellow-600 font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
} 