'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Your message has been sent successfully!')
      
      // Reset form
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch (error) {
      toast.error('Failed to send message. Please try again later.')
      console.error('Error sending message:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg text-muted-foreground mb-6">
            Have a question, suggestion, or want to contribute to DevBlog? 
            We&apos;d love to hear from you! Fill out the form below or use our 
            contact information to get in touch.
          </p>
          
          <div className="space-y-6 mt-8">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                <HiMail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">90360saurabh@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* <div className="h-10 w-10 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                <HiPhone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground"></p>
              </div> */}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                <HiLocationMarker className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-muted-foreground">Bangalore, Kormangala, India</p>
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              placeholder="Your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input 
              id="subject" 
              placeholder="Subject of your message" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <textarea 
              id="message" 
              rows={5} 
              placeholder="Your message" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-yellow-500 hover:bg-yellow-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>
    </div>
  )
}
