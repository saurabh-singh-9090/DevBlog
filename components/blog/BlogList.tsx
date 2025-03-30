'use client'

import { BlogCard } from '@/components/blog/BlogCard'
import { BlogPost } from '@/types'
import { Button } from '@/components/ui/button'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

interface BlogListProps {
  posts: BlogPost[]
  currentPage?: number
  totalPages?: number
  title?: string
  description?: string
}

export function BlogList({ 
  posts, 
  currentPage = 1, 
  totalPages = 1,
  title,
  description
}: BlogListProps) {
  return (
    <section className="py-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="mb-8">
            {title && <h2 className="text-3xl font-bold tracking-tight">{title}</h2>}
            {description && <p className="mt-2 text-muted-foreground">{description}</p>}
          </div>
        )}
        
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium">No posts found</h3>
            <p className="mt-2 text-muted-foreground">
              Check back later for new content or try a different category.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    disabled={currentPage <= 1}
                  >
                    <HiChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous Page</span>
                  </Button>
                  
                  <div className="flex items-center justify-center text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    disabled={currentPage >= totalPages}
                  >
                    <HiChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next Page</span>
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
