'use client'

import { useState, useEffect, Suspense } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BlogCard } from '@/components/blog/BlogCard'
import { getAllPosts } from '@/lib/data/mockData'
import { BlogPost } from '@/types'
import { HiSearch } from 'react-icons/hi'
import { useSearchParams, useRouter } from 'next/navigation'

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') || ''
  
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState<BlogPost[]>([])
  const [isSearching, setIsSearching] = useState(false)
  
  // Perform search whenever the URL query parameter changes
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])
  
  const performSearch = async (query: string) => {
    setIsSearching(true)
    
    try {
      // In a real app, we would make an API call to search posts
      // For now, we'll do a simple client-side search
      const allPosts = getAllPosts()
      const queryLower = query.toLowerCase()
      
      const results = allPosts.filter(post => 
        post.title.toLowerCase().includes(queryLower) ||
        post.excerpt.toLowerCase().includes(queryLower) ||
        post.content.toLowerCase().includes(queryLower) ||
        post.category.name.toLowerCase().includes(queryLower) ||
        post.author.name.toLowerCase().includes(queryLower)
      )
      
      setSearchResults(results)
    } catch (error) {
      console.error('Error searching posts:', error)
    } finally {
      setIsSearching(false)
    }
  }
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) return
    
    // Update URL with search query
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    performSearch(searchQuery)
  }
  
  return (
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl font-bold mb-8">Search Articles</h1>
        
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                type="search" 
                placeholder="Search for articles, topics, or keywords" 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="bg-yellow-500 hover:bg-yellow-600"
              disabled={isSearching}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </form>
        
        {initialQuery && (
          <h2 className="text-xl font-medium mb-6">
            Search results for: <span className="text-yellow-500">&quot;{initialQuery}&quot;</span>
          </h2>
        )}
        
        {isSearching ? (
          <div className="py-12 text-center">
            <p>Searching...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : initialQuery ? (
          <div className="py-12 text-center">
            <p className="text-lg mb-2">No results found for &quot;{initialQuery}&quot;</p>
            <p className="text-muted-foreground">
              Try using different keywords or checking for typos
            </p>
          </div>
        ) : null}
      </div>
  )
}

export default function SearchPage() {
  return (  
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent/>
    </Suspense>
  )
}