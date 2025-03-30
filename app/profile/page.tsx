'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { updateUser } from '@/lib/auth/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { toast } from 'sonner'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FaCloudUploadAlt, FaGoogle, FaDropbox, FaDownload, FaUser } from 'react-icons/fa'
import { Loader2 } from 'lucide-react'

export default function ProfileSettingsPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: ''
  })
  
  const [originalData, setOriginalData] = useState({
    name: '',
    email: '',
    image: ''
  })
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  // Check if user has made any changes
  const hasChanges = () => {
    return (
      formData.name !== originalData.name ||
      formData.email !== originalData.email ||
      formData.image !== originalData.image ||
      selectedFile !== null
    )
  }
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!isLoading && !isAuthenticated) {
      toast.error('You need to be logged in to access this page')
      router.push('/auth/login')
      return
    }
    
    // Pre-fill form with user data
    if (user) {
      const userData = {
        name: user.name || '',
        email: user.email || '',
        image: user.image || ''
      }
      
      setFormData(userData)
      setOriginalData(userData)
      setImagePreview(user.image || '')
    }
  }, [isLoading, isAuthenticated, user, router])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleUrlChange = (url: string) => {
    setFormData(prev => ({
      ...prev,
      image: url
    }))
    setImagePreview(url)
    setIsUploadDialogOpen(false)
  }
  
  const handleCloudUpload = (provider: string) => {
    // Simulate cloud upload from different providers
    toast.info(`Connecting to ${provider}...`)
    
    // This would normally connect to respective cloud APIs
    setTimeout(() => {
      const mockCloudUrl = `https://i.pravatar.cc/150?u=${Date.now()}`
      handleUrlChange(mockCloudUrl)
      toast.success(`Image from ${provider} uploaded successfully`)
    }, 1500)
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) return
    
    setIsSaving(true)
    
    try {
      // Validate input
      if (!formData.name.trim()) {
        throw new Error('Name is required')
      }
      
      if (!formData.email.trim()) {
        throw new Error('Email is required')
      }
      
      // Basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(formData.email)) {
        throw new Error('Please enter a valid email address')
      }
      
      // This would be where we'd upload the file to a server 
      let finalImageUrl = formData.image
      
      if (selectedFile) {
        // Simulate file upload to server
        toast.info('Uploading image...')
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // In a real app, we'd upload to a server and get back a URL
        // For now, just use the preview URL
        finalImageUrl = imagePreview
        toast.success('Image uploaded successfully')
      }
      
      // Update user data
      const updatedUser = updateUser({
        name: formData.name,
        email: formData.email,
        image: finalImageUrl || user.image
      })
      
      if (updatedUser) {
        // Add a slight delay to show the spinner briefly
        await new Promise(resolve => setTimeout(resolve, 800))
        
        toast.success('Profile updated successfully')
        
        // Update original data to match the new data
        setOriginalData({
          name: formData.name,
          email: formData.email,
          image: (finalImageUrl || user.image) ?? ''
        })
        
        // Clear selected file
        setSelectedFile(null)
        
        // Force page refresh to update UI with new user data
        router.refresh()
      } else {
        throw new Error('Failed to update profile')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsSaving(false)
    }
  }
  
  if (isLoading) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <p>Loading...</p>
      </div>
    )
  }

console.log(imagePreview)
  
  return (
    <div className="container max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      
      <Card className="py-6">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal information and how others see you on the site
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Avatar preview and upload */}
            <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4">
              <div className="relative h-24 w-24 rounded-full border overflow-hidden bg-muted flex items-center justify-center">
                {imagePreview.length > 0 ? (
                  <img 
                    src={imagePreview} 
                    alt={formData.name} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaUser className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <Label>Profile Photo</Label>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                <div>
                  <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        type="button" 
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <FaDownload className="h-4 w-4" />
                        Choose Photo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Upload Profile Photo</DialogTitle>
                        <DialogDescription>
                          Choose a source for your profile photo
                        </DialogDescription>
                      </DialogHeader>
                      
                      <Tabs defaultValue="upload" className="mt-4">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="upload">Device</TabsTrigger>
                          <TabsTrigger value="url">URL</TabsTrigger>
                          <TabsTrigger value="cloud">Cloud</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="upload" className="py-4">
                          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-slate-50 transition-colors" 
                              onClick={() => fileInputRef.current?.click()}>
                            <FaDownload className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-center">
                              Click to browse files or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Supports JPG, PNG, and GIF
                            </p>
                          </div>
                          {selectedFile && (
                            <p className="text-sm mt-2">
                              Selected: {selectedFile.name}
                            </p>
                          )}
                        </TabsContent>
                        
                        <TabsContent value="url" className="py-4">
                          <div className="space-y-2">
                            <Label htmlFor="image-url">Image URL</Label>
                            <div className="flex gap-2">
                              <Input
                                id="image-url"
                                value={formData.image}
                                onChange={(e) => handleUrlChange(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                              />
                              <Button 
                                type="button" 
                                onClick={() => setIsUploadDialogOpen(false)}
                                disabled={!formData.image}
                              >
                                Set
                              </Button>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="cloud" className="py-4">
                          <div className="space-y-3">
                            <Button 
                              variant="outline" 
                              className="w-full justify-start gap-2"
                              onClick={() => handleCloudUpload('Google Drive')}
                            >
                              <FaGoogle className="h-4 w-4 text-red-500" />
                              Google Drive
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              className="w-full justify-start gap-2"
                              onClick={() => handleCloudUpload('Dropbox')}
                            >
                              <FaDropbox className="h-4 w-4 text-blue-500" />
                              Dropbox
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              className="w-full justify-start gap-2"
                              onClick={() => handleCloudUpload('Cloud Storage')}
                            >
                              <FaCloudUploadAlt className="h-4 w-4 text-purple-500" />
                              Other Cloud Storage
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                      
                      <DialogFooter className="mt-4">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsUploadDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={() => {
                            if (selectedFile) {
                              setIsUploadDialogOpen(false)
                            } else {
                              toast.error('Please select a file or enter a URL')
                            }
                          }}
                          disabled={!selectedFile && !formData.image}
                        >
                          Apply
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Upload a photo from your device or connect to cloud storage.
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end border-t pt-6 mt-4">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => router.back()}
              className="mr-2"
            >
              Cancel
            </Button>
            {hasChanges() && (
              <Button 
                type="submit" 
                disabled={isSaving}
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : 'Save Changes'}
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
      
      {user && user.isAdmin && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Admin Options</CardTitle>
              <CardDescription>
                Quick access to admin features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => router.push('/admin')}
              >
                Go to Admin Dashboard
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => router.push('/admin/new')}
              >
                Create New Post
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 