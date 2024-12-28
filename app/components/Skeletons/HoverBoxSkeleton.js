"use client"
import React from 'react'
import {Skeleton} from '@/components/ui/skeleton'
function HoverBoxSkeleton() {
  return (
    <div className='w-[400px] h-[350px]'>
    <div className='w-full flex  p-4'>
   <div className='flex items-center justify-center'>
   <Skeleton className='w-16 h-16 rounded-full overflow-hidden flex items-center justify-center'/>
   </div>
     <div className='flex flex-col ml-6 gap-2 items-start justify-center'>
     <Skeleton className='w-20 h-4 rounded-sm'/>
      <Skeleton className='w-52 h-4 rounded-sm'/>
     </div>
    </div>
    <div className='w-full px-14 mt-2 flex justify-between'>
<div className='flex items-center flex-col gap-1'>
  <Skeleton className='w-10 h-4 rounded-sm'/>
  <Skeleton className='w-16 h-4 rounded-sm'/>
</div>
<div className='flex items-center flex-col gap-1'>
  <Skeleton className='w-10 h-4 rounded-sm'/>
  <Skeleton className='w-16 h-4 rounded-sm'/>
</div>
<div className='flex items-center flex-col gap-1'>
  <Skeleton className='w-10 h-4 rounded-sm'/>
  <Skeleton className='w-16 h-4 rounded-sm'/>
</div>
     </div>
     <div className='w-full  px-2 mt-4 flex gap-1 '>
      <Skeleton className='w-[125px] h-[180px] rounded-md object-cover'/>
      <Skeleton className='w-[125px] h-[180px] rounded-md object-cover'/>
      <Skeleton className='w-[125px] h-[180px] rounded-md object-cover'/>
     </div>
  </div>
  )
}

export default HoverBoxSkeleton