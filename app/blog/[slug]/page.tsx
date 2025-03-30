'use client'

import { useEffect, useState, useRef } from 'react'
import { getPostBySlug, hasUserLikedPost, togglePostLike, getCommentsByPostId, addComment, deleteComment } from '@/lib/data/mockData'
import { notFound, useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HiCalendar, HiHeart, HiEye, HiOutlineHeart, HiTrash } from 'react-icons/hi'
import Link from 'next/link'
import { BlogPost, Comment } from '@/types'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const commentRef = useRef<HTMLTextAreaElement>(null)
  
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  
  useEffect(() => {
    // Fetch the post data
    const fetchData = () => {
      const postData = getPostBySlug(slug as string)
      
      if (!postData) {
        notFound()
      }
      
      setPost(postData)
      
      // Check if user has liked this post
      if (isAuthenticated && user) {
        const hasLiked = hasUserLikedPost(postData.id, user.id)
        setLiked(hasLiked)
      }
      
      // Fetch comments for this post
      const postComments = getCommentsByPostId(postData.id)
      setComments(postComments)
      
      setIsLoading(false)
    }
    
    fetchData()
  }, [slug, isAuthenticated, user])
  
  const handleLikeToggle = () => {
    if (!isAuthenticated) {
      toast.error('You need to log in to like posts')
      router.push('/auth/login')
      return
    }
    
    if (!post || !user) return
    
    const hasLiked = togglePostLike(post.id, user.id)
    setLiked(hasLiked)
    
    // Update post data to reflect the like/unlike
    const updatedPost = getPostBySlug(slug as string)
    if (updatedPost) {
      setPost(updatedPost)
    }
  }
  
  const handleCommentSubmit = () => {
    if (!isAuthenticated) {
      toast.error('You need to log in to comment')
      router.push('/auth/login')
      return
    }
    
    if (!post || !user) return
    
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty')
      return
    }
    
    setIsSubmittingComment(true)
    
    try {
      const comment = addComment(post.id, user.id, newComment)
      
      if (comment) {
        setComments(prev => [comment, ...prev])
        setNewComment('')
        toast.success('Comment added successfully')
        
        // Scroll to the new comment
        if (commentRef.current) {
          commentRef.current.focus()
        }
      }
    } catch (error: unknown) {
      toast.error('Failed to add comment')
      console.error(error)
    } finally {
      setIsSubmittingComment(false)
    }
  }
  
  const handleDeleteComment = (commentId: string) => {
    if (!user) return
    
    const isDeleted = deleteComment(commentId, user.id)
    
    if (isDeleted) {
      setComments(prev => prev.filter(comment => comment.id !== commentId))
      toast.success('Comment deleted')
    } else {
      toast.error('Failed to delete comment')
    }
  }
  
  if (isLoading || !post) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p>Loading post...</p>
      </div>
    )
  }

  // Convert markdown-ish content to HTML
  // In a real app, you'd use a proper markdown parser like remark or markdown-it
  const contentHtml = post.content
    .replace(/^# (.*?)$/gm, '<h1 class="text-4xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^## (.*?)$/gm, '<h2 class="text-3xl font-bold mt-6 mb-4">$2</h2>')
    .replace(/^### (.*?)$/gm, '<h3 class="text-2xl font-bold mt-6 mb-3">$1</h3>')
    .replace(/\n\n/g, '</p><p class="my-4">')
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded font-mono text-sm">$1</code>')
  
  return (
    <article className="py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12">
          <Link 
            href={`/category/${post.category.slug}`}
            className="text-sm font-medium bg-yellow-500 text-white px-2.5 py-1 rounded-md hover:bg-yellow-600 transition-colors"
          >
            {post.category.name}
          </Link>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <HiCalendar className="h-4 w-4" />
              <time dateTime={post.published_at}>
                {formatDate(post.published_at)}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLikeToggle}
                className={`p-0 h-auto ${liked ? 'text-red-500' : ''}`}
              >
                {liked ? (
                  <HiHeart className="h-5 w-5" />
                ) : (
                  <HiOutlineHeart className="h-5 w-5" />
                )}
                <span className="ml-1">{post.likes} likes</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <HiEye className="h-4 w-4" />
              <span>{post.views} views</span>
            </div>
          </div>
        </header>
        
        {/* Featured image */}
        <div className="relative h-[300px] md:h-[500px] mb-12 overflow-hidden rounded-lg">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Author */}
        <div className="flex items-center gap-4 mb-12 p-4 border rounded-lg">
          <Avatar className="h-12 w-12">
            <AvatarImage src={post.author.image} alt={post.author.name} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {post.author.isAdmin ? 'Admin' : 'Contributor'}
            </p>
          </div>
        </div>
        
        {/* Content */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        
        {/* Comments Section */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-8">Comments ({comments.length})</h2>
          
          {/* Comment Form */}
          {isAuthenticated ? (
            <div className="mb-8">
              <Textarea
                ref={commentRef}
                value={newComment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full h-24 resize-none mb-4"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleCommentSubmit} 
                  disabled={isSubmittingComment || !newComment.trim()}
                  className="bg-yellow-500 hover:bg-yellow-600"
                >
                  {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="mb-8 p-4 bg-muted rounded-lg text-center">
              <p className="mb-2">Please log in to leave a comment</p>
              <Button 
                asChild 
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                <Link href="/auth/login">Log In</Link>
              </Button>
            </div>
          )}
          
          {/* Comments List */}
          {comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map(comment => (
                <Card key={comment.id} className="border">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3 items-center mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.author.image} alt={comment.author.name} />
                          <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">
                            {comment.author.name}
                            {comment.author.isAdmin && (
                              <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1.5 py-0.5 rounded">
                                Admin
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(comment.created_at)}
                          </p>
                        </div>
                      </div>
                      
                      {user && (user.id === comment.author.id || user.isAdmin) && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <HiTrash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      )}
                    </div>
                    
                    <p className="mt-2 text-sm">{comment.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
