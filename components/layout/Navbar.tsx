'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { useAuth } from '@/context/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { HiSearch, HiMenu, HiX, HiHome, HiInformationCircle } from 'react-icons/hi'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'
import { IoGridOutline } from 'react-icons/io5'
import { BsPencilSquare } from 'react-icons/bs'
import { LogoutConfirmation } from './LogoutConfirmation'

// Mock categories for dropdown
const CATEGORIES = [
  { id: '1', name: 'React', slug: 'react' },
  { id: '2', name: 'JavaScript', slug: 'javascript' },
  { id: '3', name: 'TypeScript', slug: 'typescript' },
  { id: '4', name: 'Node.js', slug: 'nodejs' },
  { id: '5', name: 'Next.js', slug: 'nextjs' },
]

export function Navbar() {
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)
  
  // Detect scroll for sticky navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get first name and truncate if needed
  const firstName = user?.name?.split(' ')[0]?.substring(0, 6) || ''
  const userIsAdmin = user ? user.isAdmin : false

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true)
  }

  const handleConfirmLogout = () => {
    logout()
    setShowLogoutConfirmation(false)
  }

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false)
  }

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Prevent body scrolling when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      // Restore scrolling when menu is closed
      document.body.style.overflow = 'visible'
    }
    
    return () => {
      // Restore scrolling on unmount
      document.body.style.overflow = 'visible'
    }
  }, [isMenuOpen])

  return (
    <header className={`sticky top-0 z-[100] w-full border-b ${
      isScrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-background'
    } transition-all duration-200`}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 relative z-[200]">
          <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
            DevBlog
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5 ${
              pathname === '/' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <HiHome className="h-4 w-4" />
            Home
          </Link>
          
          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="link" 
                className={`text-sm font-medium transition-colors hover:text-primary p-0 flex items-center gap-1.5 ${
                  pathname?.includes('/category') ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <IoGridOutline className="h-4 w-4" />
                Categories
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {CATEGORIES.map(category => (
                <DropdownMenuItem key={category.id} asChild>
                  <Link 
                    href={`/category/${category.slug}`}
                    className="w-full cursor-pointer"
                  >
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link 
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5 ${
              pathname === '/about' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <HiInformationCircle className="h-4 w-4" />
            About
          </Link>
          
          <Link 
            href="/contact"
            className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5 ${
              pathname === '/contact' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <HiChatBubbleLeftRight className="h-4 w-4" />
            Contact
          </Link>

          {/* Contribute button (only shown when authenticated and not admin) */}
          {isAuthenticated && !userIsAdmin && (
            <Button 
              variant="default"
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-600 shadow-md"
              asChild
            >
              <Link href="/contribute" className="flex items-center gap-1.5">
                <BsPencilSquare className="h-4 w-4" />
                Contribute
              </Link>
            </Button>
          )}
        </nav>

        {/* Right side with search, login, profile */}
        <div className="flex items-center space-x-4 relative z-[200]">
          {/* Search */}
          <Link href="/search">
            <Button variant="ghost" size="icon" aria-label="Search">
              <HiSearch className="h-5 w-5" />
            </Button>
          </Link>
          
          {/* Theme toggle */}
          <ThemeToggle />
          
          {/* Admin new post button */}
          {userIsAdmin && (
            <Link href="/admin/new">
              <Button 
                variant="outline" 
                size="sm"
                className="hidden md:flex"
              >
                New Post
              </Button>
            </Link>
          )}
          
          {/* User menu or Login button */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image} alt={user?.name || "User"} />
                    <AvatarFallback>{firstName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">
                  {firstName}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {userIsAdmin && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/review">Review Submissions</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogoutClick}
                  className="text-red-500 cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="default" 
              size="sm"
              className="hidden md:flex bg-yellow-500 hover:bg-yellow-600"
              asChild
            >
              <Link href="/auth/login">Login / Signup</Link>
            </Button>
          )}
          
          {/* Mobile menu button */}
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden relative z-[200] border-gray-300 dark:border-gray-700" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden fixed inset-0 z-[999] transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
        
        {/* Drawer */}
        <div className={`absolute top-0 left-0 right-0 bg-background shadow-xl overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[90vh] opacity-100' : 'max-h-0 opacity-0'} border-b border-gray-200 dark:border-gray-800 rounded-b-xl`}>
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-bold bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
              DevBlog
            </span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <HiX className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-4 flex flex-col gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 py-2 text-base font-medium border-b border-gray-100 dark:border-gray-800 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <HiHome className="h-5 w-5" />
              Home
            </Link>
            
            <div className="border-b border-gray-100 dark:border-gray-800 pb-2">
              <div className="font-medium mb-2 flex items-center gap-2">
                <IoGridOutline className="h-5 w-5" />
                Categories
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-2 pl-7">
                {CATEGORIES.map(category => (
                  <Link 
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="py-1 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link 
              href="/about"
              className="flex items-center gap-2 py-2 text-base font-medium border-b border-gray-100 dark:border-gray-800 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <HiInformationCircle className="h-5 w-5" />
              About
            </Link>
            
            <Link 
              href="/contact"
              className="flex items-center gap-2 py-2 text-base font-medium border-b border-gray-100 dark:border-gray-800 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <HiChatBubbleLeftRight className="h-5 w-5" />
              Contact
            </Link>
            
            <div className="mt-4 space-y-3">
              {/* Contribute in mobile menu (only shown when authenticated and not admin) */}
              {isAuthenticated && !userIsAdmin && (
                <Button 
                  variant="default"
                  size="sm"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 shadow-md"
                  onClick={() => setIsMenuOpen(false)}
                  asChild
                >
                  <Link href="/contribute" className="flex items-center justify-center gap-2">
                    <BsPencilSquare className="h-4 w-4" />
                    Contribute
                  </Link>
                </Button>
              )}
              
              {userIsAdmin && (
                <div className="space-y-2 border-t border-gray-100 dark:border-gray-800 pt-3">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Admin</div>
                  <Link 
                    href="/admin/new" 
                    className="flex items-center gap-2 py-1 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BsPencilSquare className="h-4 w-4" />
                    New Post
                  </Link>
                  <Link 
                    href="/admin/review" 
                    className="flex items-center gap-2 py-1 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Review Submissions
                  </Link>
                  <Link 
                    href="/admin" 
                    className="flex items-center gap-2 py-1 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </div>
              )}
              
              {!isAuthenticated && (
                <Button 
                  variant="default" 
                  size="sm"
                  className="w-full bg-yellow-500 hover:bg-yellow-600"
                  onClick={() => setIsMenuOpen(false)}
                  asChild
                >
                  <Link href="/auth/login">Login / Signup</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Logout confirmation dialog */}
      <LogoutConfirmation 
        isOpen={showLogoutConfirmation}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </header>
  )
}