import { Skeleton } from "@/components/ui/Skeleton"

export function HomeHeroSkeleton() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title skeletons */}
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-10 w-3/4 sm:h-12 md:h-14" />
            <Skeleton className="h-10 w-1/2 sm:h-12 md:h-14" />
          </div>
          
          {/* Paragraph skeleton */}
          <div className="mt-6 space-y-3">
            <Skeleton className="h-5 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-5 w-5/6 max-w-2xl mx-auto" />
            <Skeleton className="h-5 w-4/6 max-w-2xl mx-auto" />
          </div>
          
          {/* Button skeletons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Skeleton className="h-12 w-full sm:w-44" />
            <Skeleton className="h-12 w-full sm:w-44" />
            <Skeleton className="h-12 w-full sm:w-60" />
          </div>
        </div>
        
        {/* Scroll indicator skeleton */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 mt-20 sm:mt-0">
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>
    </section>
  )
} 