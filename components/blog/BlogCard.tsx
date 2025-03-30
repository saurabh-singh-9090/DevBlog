'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BlogPost } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { HiCalendar, HiHeart, HiEye } from 'react-icons/hi'
import { formatDate } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
  variant?: 'default' | 'featured'
}

export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const isFeatured = variant === 'featured'
  const router = useRouter()
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on the category link or title link
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    router.push(`/blog/${post.slug}`);
  };
  
  return (
    <Card 
      className={`overflow-hidden transition-all hover:shadow-md cursor-pointer ${
        isFeatured ? 'lg:flex lg:h-80' : ''
      }`}
      onClick={handleCardClick}
    >
      <div className={`relative ${
        isFeatured 
          ? 'lg:h-full lg:w-1/2' 
          : 'aspect-video w-full'
      }`}>
        <Image
          src={post.cover_image}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <Link
          href={`/category/${post.category.slug}`}
          className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-md hover:bg-yellow-600 transition-colors z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {post.category.name}
        </Link>
      </div>
      
      <div className={isFeatured ? 'lg:w-1/2' : ''}>
        <CardHeader>
          <div className="space-y-1">
            <Link 
              href={`/blog/${post.slug}`} 
              className="inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className={`font-bold transition-colors hover:text-yellow-500 ${
                isFeatured ? 'text-2xl' : 'text-xl'
              }`}>
                {post.title}
              </h3>
            </Link>
            <div className="flex items-center text-xs text-muted-foreground">
              <HiCalendar className="mr-1 h-3 w-3 mb-1" />
              <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-muted-foreground line-clamp-2 md:line-clamp-2">
            {post.excerpt}
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center border-t p-4 mt-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{post.author.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-muted-foreground text-xs">
            <div className="flex items-center">
              <HiHeart className="mr-1 h-4 w-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center">
              <HiEye className="mr-1 h-4 w-4" />
              <span>{post.views}</span>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
