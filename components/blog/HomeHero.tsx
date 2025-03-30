'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HiArrowDown } from 'react-icons/hi'

// Create a new RotatingText component
function RotatingText() {
  const phrases = ["Ultimate Resource", "One Stop Guide", "Choice"]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      
      // After animation out completes, change the text
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length)
        setIsAnimating(false)
      }, 500) // Half of the transition duration
      
    },2000) // Change text every 2 seconds
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="h-[60px] sm:h-[70px] relative overflow-hidden">
      <span 
        className={`absolute inset-0 block w-full bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent transform transition-transform duration-1000 ${
          isAnimating ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        {phrases[currentIndex]}
      </span>
    </div>
  )
}

export function HomeHero() {
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Add a function to handle smooth scrolling with offset
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const targetId = e.currentTarget.getAttribute('href')?.substring(1)
    if (!targetId) return
    
    const targetElement = document.getElementById(targetId)
    if (!targetElement) return
    
    // Calculate offset (navbar height + additional padding)
    const offset = 80 // Adjust based on your navbar height
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }

  // Parallax effect
  const translateY = scrollY * 0.3

  // Add global scroll padding once on component mount
  useEffect(() => {
    // Add scroll-margin-top to the main content
    document.documentElement.style.scrollPaddingTop = '80px'
    
    return () => {
      // Clean up when component unmounts
      document.documentElement.style.scrollPaddingTop = ''
    }
  }, [])

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-background to-background"
        style={{ 
          transform: `translateY(${translateY}px)`,
          backgroundSize: '400% 400%',
          backgroundPosition: '0% 0%',
        }}
      />
      
      <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">The Developer&apos;s</span>
            <RotatingText />
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the latest in software development, programming languages, frameworks,
            and best practices from industry experts and passionate developers.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              asChild
            >
              <Link href="#latest-articles" onClick={scrollToSection}>
                Explore Articles
              </Link>
            </Button>
            <Button 
              // variant="outline" 
              className="text-white bg-yellow-500 hover:bg-yellow-600"
              size="lg"
              asChild
            >
              <Link href="/category/javascript">
                JavaScript Tutorials
              </Link>
            </Button>
            <Button 
              // variant="outline" 
              size="lg"
              className="text-white bg-yellow-500 hover:bg-yellow-600"
              asChild
            >
              <Link href="/roadmap">
                Frontend Developer Roadmap
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white z-10 mt-20 sm:mt-0">
          <Link 
            href="#latest-articles" 
            className="flex items-center justify-center h-12 w-12 rounded-full shadow-lg bg-yellow-500 hover:bg-yellow-600 transition-colors"
            onClick={scrollToSection}
          >
            <HiArrowDown className="h-6 w-6" />
          </Link>
        </div>
        
        {/* Code decoration */}
        <div className="hidden lg:block absolute -right-24 top-20 text-xs font-mono text-muted-foreground opacity-20 transform rotate-12">
          <pre className="whitespace-pre">
{`function DevBlog() {
  const [knowledge, setKnowledge] = useState([]);
  
  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await getLatestArticles();
      setKnowledge(articles);
    };
    
    fetchArticles();
  }, []);
  
  return (
    <div>
      {knowledge.map(article => (
        <Article key={article.id} {...article} />
      ))}
    </div>
  );
}`}
          </pre>
        </div>
      </div>
    </section>
  )
}
