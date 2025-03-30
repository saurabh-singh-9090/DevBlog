'use client'

import { useEffect, useState } from 'react'
import { BlogList } from '@/components/blog/BlogList'
import { getCategoryBySlug, getPostsByCategory } from '@/lib/data/mockData'
import { notFound, useParams } from 'next/navigation'
import { BlogPost, Category } from '@/types'

export default function CategoryPage() {
  const { name } = useParams()
  const [category, setCategory] = useState<Category | null>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Fetch the category and posts data
    const categoryData = getCategoryBySlug(name as string)
    
    if (!categoryData) {
      notFound()
    }
    
    const postsData = getPostsByCategory(name as string)
    
    setCategory(categoryData)
    setPosts(postsData)
    setIsLoading(false)
  }, [name])
  
  if (isLoading || !category) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p>Loading category...</p>
      </div>
    )
  }
  
  return (
    <BlogList 
      posts={posts} 
      title={`${category.name} Articles`} 
      description={category.description}
    />
  )
}
