import { Skeleton } from "@/components/ui/Skeleton"

export function RecentArticlesSkeleton() {
  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-10 w-28" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="rounded-lg overflow-hidden shadow-sm border">
              {/* Image placeholder */}
              <Skeleton className="w-full aspect-video" />
              
              <div className="p-5">
                {/* Title */}
                <Skeleton className="h-6 w-5/6 mb-2" />
                <Skeleton className="h-6 w-3/4 mb-4" />
                
                {/* Excerpt */}
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                
                {/* Footer */}
                <div className="flex justify-between items-center">
                  <Skeleton className="h-10 w-20" />
                  <Skeleton className="h-10 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 