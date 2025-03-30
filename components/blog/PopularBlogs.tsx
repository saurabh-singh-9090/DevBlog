'use client'

import { BlogCard } from '@/components/blog/BlogCard'
import { BlogPost } from '@/types'

interface PopularBlogsProps {
  posts: BlogPost[]
}

export function PopularBlogs({ posts }: PopularBlogsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Popular Articles</h2>
          <p className="mt-2 text-muted-foreground">
            Most liked and viewed articles from our community
          </p>
        </div>
        
        {/* All posts in a balanced grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <BlogCard 
              key={post.id} 
              post={post} 
              variant="default"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
