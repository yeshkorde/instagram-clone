import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function PostesSkeleton() {
  return (
    <div className="w-full bg-black shadow-md mb-6 text-white px-40 rounded-xl   py-10 ">
      <div className="flex items-center p-4 ">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="ml-3 flex-grow">
          <Skeleton className="w-24 h-4 mb-1" />
          <Skeleton className="w-32 h-3" />
        </div>
        <Skeleton className="w-16 h-3" />
      </div>
      <div className='flex justify-center items-center'>
        <Skeleton className="w-full h-[600px] rounded-xl" />
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-4 justify-between">
          <div className="flex gap-4">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-6 h-6 rounded-full" />
          </div>
          <div>
            <Skeleton className="w-6 h-6 rounded-full" />
          </div>
        </div>
        <Skeleton className="w-20 h-4 mt-2" />
        <div className="mt-2">
          <Skeleton className="w-48 h-4" />
        </div>
        <Skeleton className="w-36 h-4 mt-2" />
      </div>
      <div className="px-4 pb-2">
        <Skeleton className="w-full h-8" />
      </div>
    </div>
  )
}

export default PostesSkeleton