'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { categories, getPostById } from '@/lib/data/mockData'
import { toast } from 'sonner'
import { HiArrowLeft } from 'react-icons/hi'
import Link from 'next/link'
import { BlogPost } from '@/types'
import { useParams } from 'next/navigation'
import Image from 'next/image'

export default function EditPostPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  
  const [post, setPost] = useState<BlogPost | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingPost, setIsLoadingPost] = useState(true)
  
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
    
    // Fetch post data
    const fetchPost = async () => {
      try {
        const postData = getPostById(id)
        
        if (!postData) {
          toast.error('Post not found')
          router.push('/admin')
          return
        }
        
        setPost(postData)
        setTitle(postData.title)
        setContent(postData.content)
        setExcerpt(postData.excerpt)
        setCoverImage(postData.cover_image)
        setCategoryId(postData.category.id)
      } catch (error) {
        console.error('Error fetching post:', error)
        toast.error('Failed to load post')
        router.push('/admin')
      } finally {
        setIsLoadingPost(false)
      }
    }
    
    if (isAuthenticated && user?.isAdmin) {
      fetchPost()
    }
  }, [id, isLoading, isAuthenticated, user, router])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title || !content || !excerpt || !categoryId || !coverImage) {
      toast.error('Please fill in all required fields')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Get the selected category
      const selectedCategory = categories.find(cat => cat.id === categoryId)
      if (!selectedCategory) {
        throw new Error('Invalid category')
      }
      
      toast.success('Post updated successfully!')
      router.push('/admin')
    } catch (error) {
      console.error('Error updating post:', error)
      toast.error('Failed to update post')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (isLoading || isLoadingPost) {
    return (
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex justify-center">
        <p>Loading...</p>
      </div>
    )
  }
  
  if (!post) {
    return (
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex justify-center">
        <p>Post not found</p>
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
          <h1 className="text-3xl font-bold">Edit Post</h1>
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
            <Label htmlFor="coverImage">Cover Image URL *</Label>
            <Input
              id="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Enter image URL"
              required
            />
            {coverImage && (
              <div className="mt-2 relative h-40 w-full overflow-hidden rounded-md">
                <Image
                  src={coverImage} 
                  alt="Cover preview" 
                  className="object-cover w-full h-full"
                  onError={() => {
                    toast.error('Invalid image URL')
                    setCoverImage('')
                  }}
                />
              </div>
            )}
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
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 