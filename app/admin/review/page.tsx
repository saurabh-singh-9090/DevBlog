'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getPendingPosts, approvePost, rejectPost } from '@/lib/data/mockData'
import { BlogPost } from '@/types'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from 'next/image'

export default function ReviewPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  
  const [pendingPosts, setPendingPosts] = useState<BlogPost[]>([])
  const [isReviewLoading, setIsReviewLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject' | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  useEffect(() => {
    // Redirect if not admin
    if (!isLoading && (!isAuthenticated || !user?.isAdmin)) {
      toast.error('You need admin privileges to access this page')
      router.push('/')
      return
    }
    
    // Load pending posts
    if (isAuthenticated && user?.isAdmin) {
      const posts = getPendingPosts()
      setPendingPosts(posts)
      setIsReviewLoading(false)
    }
  }, [isLoading, isAuthenticated, user, router])
  
  const handleViewPost = (post: BlogPost) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }
  
  const handleApprove = (post: BlogPost) => {
    setSelectedPost(post)
    setReviewAction('approve')
    setIsModalOpen(true)
  }
  
  const handleReject = (post: BlogPost) => {
    setSelectedPost(post)
    setReviewAction('reject')
    setIsModalOpen(true)
  }
  
  const confirmAction = () => {
    if (!selectedPost || !reviewAction) return
    
    if (reviewAction === 'approve') {
      const success = approvePost(selectedPost.id)
      if (success) {
        // Store the approved post slug for viewing
        const approvedPostSlug = selectedPost.slug
        
        toast.success(
          <div className="flex flex-col space-y-2">
            <div>Post approved and published successfully!</div>
            <div className="flex space-x-2 mt-2">
              <button 
                onClick={() => {
                  router.push(`/blog/${approvedPostSlug}`)
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
              >
                View Post
              </button>
              <button 
                onClick={() => {
                  // Force a complete page reload to ensure fresh data
                  window.location.href = '/'
                }}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
              >
                Go to Homepage
              </button>
            </div>
          </div>,
          { duration: 8000 }
        )
        
        setPendingPosts(prev => prev.filter(p => p.id !== selectedPost.id))
      } else {
        toast.error('Failed to approve post')
      }
    } else if (reviewAction === 'reject') {
      const success = rejectPost(selectedPost.id)
      if (success) {
        toast.success('Post rejected')
        setPendingPosts(prev => prev.filter(p => p.id !== selectedPost.id))
      } else {
        toast.error('Failed to reject post')
      }
    }
    
    setIsModalOpen(false)
    setSelectedPost(null)
    setReviewAction(null)
  }
  
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
    setReviewAction(null)
  }
  
  if (isLoading || isReviewLoading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <p>Loading...</p>
      </div>
    )
  }
  
  const getActionText = () => {
    if (reviewAction === 'approve') {
      return 'approve and publish'
    } else if (reviewAction === 'reject') {
      return 'reject'
    }
    return 'review'
  }
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Review Pending Submissions</h1>
        <Button
          variant="outline"
          onClick={() => router.push('/admin')}
        >
          Back to Dashboard
        </Button>
      </div>
      
      {pendingPosts.length === 0 ? (
        <div className="text-center p-12 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">No Pending Posts</h2>
          <p className="text-muted-foreground mb-6">
            There are no pending posts to review at this time.
          </p>
          <Button
            onClick={() => router.push('/admin')}
            className="bg-yellow-500 hover:bg-yellow-600"
          >
            Return to Dashboard
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingPosts.map(post => (
            <Card key={post.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div 
                  className="w-full md:w-1/3 h-48 md:h-auto bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.cover_image})` }}
                />
                <div className="flex-1 p-6">
                  <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      <span className="text-sm bg-muted px-2 py-1 rounded">
                        {post.category.name}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Submitted: {new Date(post.submission_date || '').toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={post.author.image || ''} 
                        alt={post.author.name} 
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{post.author.name}</p>
                      <p className="text-xs text-muted-foreground">{post.author.email}</p>
                    </div>
                  </div>
                  
                  <p className="line-clamp-2 mb-6">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleViewPost(post)}
                    >
                      View Content
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(post)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReject(post)}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {/* Post Content Dialog */}
      <Dialog open={isModalOpen && !reviewAction} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
            <DialogDescription>
              Submitted by {selectedPost?.author.name} on {selectedPost && new Date(selectedPost.submission_date || '').toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[60vh] overflow-y-auto mt-4">
            <div className="relative w-full h-60 mb-6">
              {selectedPost && (
                <Image
                  src={selectedPost.cover_image} 
                  alt={selectedPost.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
              )}
            </div>
            
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {selectedPost && (
                <div dangerouslySetInnerHTML={{ 
                  __html: selectedPost.content
                    .replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
                    .replace(/^## (.*?)$/gm, '<h2 class="text-xl font-bold mt-4 mb-3">$1</h2>')
                    .replace(/^### (.*?)$/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
                    .replace(/\n\n/g, '<br/><br/>')
                }} />
              )}
            </div>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={closeModal}
              >
                Close
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  setReviewAction('approve')
                  closeModal()
                  if (selectedPost) {
                    handleApprove(selectedPost)
                  }
                }}
              >
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setReviewAction('reject')
                  closeModal()
                  if (selectedPost) {
                    handleReject(selectedPost)
                  }
                }}
              >
                Reject
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Confirm Action Dialog */}
      <Dialog open={isModalOpen && !!reviewAction} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {reviewAction === 'approve' ? 'Approve Post' : 'Reject Post'}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {getActionText()} &ldquo;{selectedPost?.title}&rdquo;?
              {reviewAction === 'approve' && (
                <span className="mt-2 block">
                  This post will be published and visible to all users.
                </span>
              )}
              {reviewAction === 'reject' && (
                <span className="mt-2 block">
                  This post will be rejected and removed from pending submissions.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              variant={reviewAction === 'approve' ? 'default' : 'destructive'}
              className={reviewAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}
              onClick={confirmAction}
            >
              {reviewAction === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 