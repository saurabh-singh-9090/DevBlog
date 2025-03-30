'use client'

import { BlogCard } from '@/components/blog/BlogCard'
import { BlogPost } from '@/types'

interface RecentBlogsProps {
  posts: BlogPost[]
}

export function RecentBlogs({ posts }: RecentBlogsProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-12 scroll-mt-24" id="recent-articles-title">
          <h2 className="text-3xl font-bold tracking-tight">Recent Articles</h2>
          <p className="mt-2 text-muted-foreground">
            Stay up to date with the latest coding insights and tutorials
          </p>
        </div>
        
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
