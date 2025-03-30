'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { getAllPosts, deletePost, getReviewedPosts } from '@/lib/data/mockData'
import { BlogPost } from '@/types'
import Link from 'next/link'
import { toast } from 'sonner'
import { HiPencil, HiTrash, HiPlus } from 'react-icons/hi'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [reviewedPosts, setReviewedPosts] = useState<BlogPost[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [loadingPostId, setLoadingPostId] = useState<string | null>(null)
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null)
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  
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
    
    // Fetch posts
    const fetchPosts = async () => {
      try {
        // Using mock data for now
        const allPosts = getAllPosts()
        setPosts(allPosts)
        
        // Fetch reviewed posts
        const reviewed = getReviewedPosts()
        setReviewedPosts(reviewed)
      } catch (error) {
        console.error('Error fetching posts:', error)
        toast.error('Failed to load posts')
      } finally {
        setIsLoadingPosts(false)
      }
    }
    
    if (isAuthenticated && user?.isAdmin) {
      fetchPosts()
    }
  }, [isLoading, isAuthenticated, user, router])
  
  const handleDeletePost = async (postId: string) => {
    setDeletingPostId(postId)
    try {
      const isDeleted = deletePost(postId)
      
      if (isDeleted) {
        // Update the UI by reloading posts
        setPosts(getAllPosts())
        setReviewedPosts(getReviewedPosts())
        toast.success('Post deleted successfully')
      } else {
        toast.error('Post not found')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post')
    } finally {
      setDeletingPostId(null)
      setDeleteDialogOpen(false)
      setPostToDelete(null)
    }
  }
  
  const handleEdit = (postId: string) => {
    setLoadingPostId(postId)
    router.push(`/admin/edit/${postId}`)
  }
  
  if (isLoading || isLoadingPosts) {
    return (
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex justify-center">
        <p>Loading...</p>
      </div>
    )
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
        return null
    }
  }
  
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/review">
              Review Submissions
            </Link>
          </Button>
          <Button asChild className="bg-yellow-500 hover:bg-yellow-600">
            <Link href="/admin/new">
              <HiPlus className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
        </div>
      </div>
      
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{postToDelete?.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => postToDelete && handleDeletePost(postToDelete.id)}
              disabled={deletingPostId !== null}
            >
              {deletingPostId ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Tabs defaultValue="all-posts" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2 mb-8">
          <TabsTrigger value="all-posts">All Posts</TabsTrigger>
          <TabsTrigger value="reviewed-posts">Reviewed Posts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-posts">
          <div className="bg-card rounded-lg shadow">
            <h2 className="text-xl font-semibold p-4 border-b">Manage Posts</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-4">Title</th>
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">Date</th>
                    <th className="text-center p-4">Likes</th>
                    <th className="text-center p-4">Views</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id} className="border-t">
                      <td className="p-4">
                        <Link 
                          href={`/blog/${post.slug}`} 
                          className="font-medium hover:text-yellow-500 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td className="p-4">{post.category.name}</td>
                      <td className="p-4">{new Date(post.published_at).toLocaleDateString()}</td>
                      <td className="p-4 text-center">{post.likes}</td>
                      <td className="p-4 text-center">{post.views}</td>
                      <td className="p-4 text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(post.id)}
                          disabled={loadingPostId === post.id}
                        >
                          {loadingPostId === post.id ? (
                            <span className="animate-pulse">Loading...</span>
                          ) : (
                            <HiPencil className="h-4 w-4" />
                          )}
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            setPostToDelete(post)
                            setDeleteDialogOpen(true)
                          }}
                          disabled={deletingPostId === post.id}
                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        >
                          {deletingPostId === post.id ? (
                            <span className="animate-pulse">Deleting...</span>
                          ) : (
                            <HiTrash className="h-4 w-4" />
                          )}
                          <span className="sr-only">Delete</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                  
                  {posts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-muted-foreground">
                        No posts found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviewed-posts">
          <div className="bg-card rounded-lg shadow">
            <h2 className="text-xl font-semibold p-4 border-b">Reviewed Posts</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-4">Title</th>
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">Date</th>
                    <th className="text-center p-4">Status</th>
                    <th className="text-center p-4">Likes</th>
                    <th className="text-center p-4">Views</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewedPosts.map(post => (
                    <tr key={post.id} className="border-t">
                      <td className="p-4">
                        <Link 
                          href={`/blog/${post.slug}`} 
                          className="font-medium hover:text-yellow-500 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td className="p-4">{post.category.name}</td>
                      <td className="p-4">{new Date(post.published_at).toLocaleDateString()}</td>
                      <td className="p-4 text-center">{getStatusBadge(post.status)}</td>
                      <td className="p-4 text-center">{post.likes}</td>
                      <td className="p-4 text-center">{post.views}</td>
                      <td className="p-4 text-right space-x-2">
                        {post.status === 'approved' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEdit(post.id)}
                            disabled={loadingPostId === post.id}
                          >
                            {loadingPostId === post.id ? (
                              <span className="animate-pulse">Loading...</span>
                            ) : (
                              <HiPencil className="h-4 w-4" />
                            )}
                            <span className="sr-only">Edit</span>
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            setPostToDelete(post)
                            setDeleteDialogOpen(true)
                          }}
                          disabled={deletingPostId === post.id}
                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        >
                          {deletingPostId === post.id ? (
                            <span className="animate-pulse">Deleting...</span>
                          ) : (
                            <HiTrash className="h-4 w-4" />
                          )}
                          <span className="sr-only">Delete</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                  
                  {reviewedPosts.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-muted-foreground">
                        No reviewed posts found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
