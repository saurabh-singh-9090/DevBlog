'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { categories } from '@/lib/data/mockData'
import { toast } from 'sonner'
import { HiArrowLeft } from 'react-icons/hi'
import { FaUpload } from 'react-icons/fa'
import Link from 'next/link'
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
import Image from 'next/image'

export default function NewPostPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  
  useEffect(() => {
    // Check if user is admin
    if (!isLoading && !isAuthenticated) {
      toast.error('You need to be logged in to access this page')
      router.push('/')
      return
    }
    
    if (!isLoading && isAuthenticated && !user?.isAdmin) {
      toast.error('You need admin privileges to access this page')
      router.push('/')
      return
    }
  }, [isLoading, isAuthenticated, user, router])
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setCoverImage('') // Clear URL input when file is selected
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleUrlChange = (url: string) => {
    setCoverImage(url)
    if (url) {
      setImagePreview(url)
      setSelectedFile(null) // Clear selected file when URL is entered
    } else {
      setImagePreview('')
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title || !content || !excerpt || !categoryId || (!coverImage && !selectedFile)) {
      toast.error('Please fill in all required fields')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Handle image upload if file is selected
      let finalImageUrl = coverImage
      
      if (selectedFile) {
        // Simulate file upload to server
        toast.info('Uploading image...')
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // In a real app, we'd upload to a server and get back a URL
        // For now, just use the preview URL
        finalImageUrl = imagePreview
        toast.success('Image uploaded successfully')
      }
      
      // Simulate API call for post creation with the image URL
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here we would typically send finalImageUrl to the server
      console.log('Creating post with image URL:', finalImageUrl)
      
      toast.success('Post created successfully!')
      router.push('/admin')
    } catch (error) {
      console.error('Error creating post:', error)
      toast.error('Failed to create post')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex justify-center">
        <p>Loading...</p>
      </div>
    )
  }
  
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/admin">
              <HiArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Create New Post</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt/Summary *</Label>
            <Input
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary of the post"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label>Cover Image *</Label>
            <input 
              type="file" 
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <div className="flex flex-col space-y-3">
              <div className="flex gap-2">
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      type="button" 
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <FaUpload className="h-4 w-4" />
                      Choose Image
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Upload Cover Image</DialogTitle>
                      <DialogDescription>
                        Choose a source for your cover image
                      </DialogDescription>
                    </DialogHeader>
                    
                    <Tabs defaultValue="upload" className="mt-4">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                        <TabsTrigger value="url">URL</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="upload" className="py-4">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-slate-50 transition-colors" 
                            onClick={() => fileInputRef.current?.click()}>
                          <FaUpload className="h-8 w-8 text-gray-400 mb-2" />
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
                              value={coverImage}
                              onChange={(e) => handleUrlChange(e.target.value)}
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
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
                        onClick={() => setIsUploadDialogOpen(false)}
                        disabled={!selectedFile && !coverImage}
                      >
                        Apply
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              {(imagePreview || coverImage) && (
                <div className="mt-2 relative h-48 w-full overflow-hidden rounded-md">
                  <Image
                    src={imagePreview || coverImage} 
                    alt="Cover preview" 
                    className="object-cover w-full h-full"
                    onError={() => {
                      toast.error('Invalid image URL')
                      setCoverImage('')
                      setImagePreview('')
                    }}
                  />
                </div>
              )}
              
              <p className="text-xs text-muted-foreground">
                Upload an image from your device or provide a URL.
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <div className="border rounded-md bg-background">
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content in Markdown format"
                className="w-full min-h-[300px] p-3 bg-transparent resize-y"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Use Markdown for formatting. For example, # for headings, **text** for bold, *text* for italic.
            </p>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
