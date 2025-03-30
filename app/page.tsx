'use client'

import { useEffect, useState } from 'react'
import { HomeHero } from '@/components/blog/HomeHero'
import { HomeHeroSkeleton } from '@/components/blog/HomeHeroSkeleton'
import { FeatureCardsSkeleton } from '@/components/blog/FeatureCardsSkeleton'
import { RecentArticlesSkeleton } from '@/components/blog/RecentArticlesSkeleton'
import { RecentBlogs } from '@/components/blog/RecentBlogs'
import { PopularBlogs } from '@/components/blog/PopularBlogs'
import { PremiumServicesCarousel } from '@/components/blog/PremiumServicesCarousel'
import { getAllPosts, getPopularPosts, triggerDataRefresh } from '@/lib/data/mockData'
import { BlogPost } from '@/types'

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(Date.now())
  
  // Function to fetch the latest posts
  const fetchPosts = () => {
    console.log("Fetching homepage posts at", new Date().toISOString())
    
    // Force a data refresh to ensure we're getting the latest data
    triggerDataRefresh()
    
    // Get the latest posts from data source
    const latestPosts = getAllPosts()
    const latestPopularPosts = getPopularPosts()
    
    console.log(`Found ${latestPosts.length} approved posts:`, 
      latestPosts.map(p => p.title).join(', '))
    
    setRecentPosts(latestPosts.slice(0, 6))
    setPopularPosts(latestPopularPosts.slice(0, 4))
    setIsLoading(false)
    setLastRefresh(Date.now())
  }
  
  useEffect(() => {
    // Fetch posts immediately on mount
    fetchPosts()
    
    // Set up a polling mechanism to check for updates every 3 seconds
    const intervalId = setInterval(() => {
      console.log("Checking for updates...")
      fetchPosts()
    }, 3000)
    
    // Cleanup
    return () => {
      clearInterval(intervalId)
    }
  }, []) // Empty dependency array means this only runs on mount/unmount
  
  // Render loading state if needed
  if (isLoading) {
    return (
      <main>
        <HomeHeroSkeleton />
        <FeatureCardsSkeleton />
        <RecentArticlesSkeleton />
      </main>
    )
  }
  
  // No posts available
  if (recentPosts.length === 0) {
    return (
      <>
        <HomeHero />
        <PremiumServicesCarousel />
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-4 text-center">No published posts available</h2>
          <p className="text-center text-muted-foreground">
            There are currently no published posts. Please check back later.
          </p>
        </div>
      </>
    )
  }
  
  return (
    <>
      <HomeHero />
      
      <PremiumServicesCarousel />
      
      <div id="latest-articles" className="scroll-mt-32">
        <RecentBlogs posts={recentPosts} />
      </div>
      
      <PopularBlogs posts={popularPosts} />

      {/* Add a hidden refresh trigger that includes the lastRefresh timestamp */}
      <div className="hidden" data-last-refresh={lastRefresh}>
        {recentPosts.length + popularPosts.length} posts available
      </div>
    </>
  )
}
