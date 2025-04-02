'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { submitPost, categories, getUserSubmittedPosts } from '@/lib/data/mockData'
import { BlogPost } from '@/types'
import { toast } from 'sonner'
import Link from 'next/link'

export default function ContributePage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    categoryId: '',
    coverImage: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userPosts, setUserPosts] = useState<BlogPost[]>([])
  const [activeTab, setActiveTab] = useState<'write' | 'submissions'>('write')
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!isLoading && !isAuthenticated) {
      toast.error('You need to be logged in to contribute')
      router.push('/auth/login')
      return
    }
    
    // Load user's submitted posts
    if (user) {
      const posts = getUserSubmittedPosts(user.id)
      setUserPosts(posts)
    }
  }, [isLoading, isAuthenticated, user, router])
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      categoryId: value
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) return
    
    setIsSubmitting(true)
    
    try {
      // Validate inputs
      if (!formData.title.trim()) {
        throw new Error('Title is required')
      }
      
      if (!formData.content.trim()) {
        throw new Error('Content is required')
      }
      
      if (!formData.excerpt.trim()) {
        throw new Error('Excerpt is required')
      }
      
      if (!formData.categoryId) {
        throw new Error('Category is required')
      }
      
      if (!formData.coverImage.trim()) {
        throw new Error('Cover image URL is required')
      }
      
      // Submit post
      const post = submitPost(
        user.id,
        formData.title,
        formData.content,
        formData.excerpt,
        formData.categoryId,
        formData.coverImage
      )
      
      if (post) {
        toast.success('Post submitted for review successfully')
        
        // Update user posts list
        setUserPosts(prev => [post, ...prev])
        
        // Reset form
        setFormData({
          title: '',
          content: '',
          excerpt: '',
          categoryId: '',
          coverImage: ''
        })
        
        // Switch to submissions tab
        setActiveTab('submissions')
      } else {
        throw new Error('Failed to submit post')
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">Approved</span>
      case 'pending':
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">Pending</span>
      case 'rejected':
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full">Rejected</span>
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full">Draft</span>
    }
  }
  
  if (isLoading) {
    return (
      <div className="container max-w-5xl mx-auto px-4 py-12">
        <p>Loading...</p>
      </div>
    )
  }
  
  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contribute to DevBlog</h1>
      
      <div className="mb-8 flex border-b">
        <button
          className={`pb-2 mr-4 font-medium ${
            activeTab === 'write'
              ? 'text-yellow-500 border-b-2 border-yellow-500'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('write')}
        >
          Write New Post
        </button>
        <button
          className={`pb-2 font-medium ${
            activeTab === 'submissions'
              ? 'text-yellow-500 border-b-2 border-yellow-500'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('submissions')}
        >
          Your Submissions
        </button>
      </div>
      
      {activeTab === 'write' ? (
        <Card className='py-6'>
          <CardHeader>
            <CardTitle>Write a New Post</CardTitle>
            <CardDescription>
              Submit your post for review. Once approved, it will appear on the blog.
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a captivating title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt (Summary)</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Brief summary of your post (appears in previews)"
                  className="h-20"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your post content using Markdown"
                  className="h-60"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Use Markdown for formatting. You can use # for headings, ** for bold, * for italic, etc.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={handleSelectChange}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/your-image.jpg"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter a URL to an image. For testing, you can use Unsplash: https://unsplash.com/
                </p>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-6">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => router.push('/')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-yellow-500 hover:bg-yellow-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Review'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Submitted Posts</h2>
          
          {userPosts.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-muted-foreground">You haven&apos;t submitted any posts yet</p>
              <Button 
                className="mt-4 bg-yellow-500 hover:bg-yellow-600"
                onClick={() => setActiveTab('write')}
              >
                Write Your First Post
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {userPosts.map(post => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div 
                      className="w-full md:w-1/4 h-48 md:h-auto bg-cover bg-center"
                      style={{ backgroundImage: `url(${post.cover_image})` }}
                    />
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        {getStatusBadge(post.status)}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        Submitted on {new Date(post.submission_date || post.published_at).toLocaleDateString()}
                      </p>
                      
                      <p className="line-clamp-2 mb-4">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-sm bg-muted px-2 py-1 rounded">
                            {post.category.name}
                          </span>
                        </div>
                        
                        {post.status === 'approved' && (
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/blog/${post.slug}`}>
                              View Post
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
} 