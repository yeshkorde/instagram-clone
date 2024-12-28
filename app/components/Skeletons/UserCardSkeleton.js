import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function UserCardSkeleton() {
  return (
    <div className="h-16 w-full p-2 flex justify-between items-center">
      <div className="flex gap-4 justify-center items-center">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="flex flex-col">
          <Skeleton className="w-24 h-4 mb-1" />
          <Skeleton className="w-32 h-3" />
        </div>
      </div>
      <Skeleton className="w-20 h-4 rounded-md" />
    </div>
  )
}

export default UserCardSkeleton