import { Skeleton } from "@/components/ui/Skeleton"

export function FeatureCardsSkeleton() {
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-card rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <Skeleton className="h-6 w-40" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-11/12 mb-2" />
              <Skeleton className="h-4 w-10/12 mb-6" />
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 