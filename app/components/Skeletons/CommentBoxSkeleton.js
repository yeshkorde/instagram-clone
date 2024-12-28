"use client"
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
function CommentBoxSkeleton() {
  return (
    <div className="fixed inset-0 z-[1000000000] flex items-center justify-center ">
      <div
        className="flex rounded-xl shadow-xl overflow-hidden bg-black px-32"
        style={{
          width: "90vw",
          height: "90vh",
          maxWidth: "95vw",
          maxHeight: "90vh",
        }}
      >
        <div className="relative flex-shrink-0" style={{ width: "50%" }}>
          <div className="h-full flex items-center justify-center bg-black">
            <Skeleton className="w-full h-full" />
          </div>
        </div>

        <div className="w-[600px] flex flex-col">
          <div className="p-4 border-b border-[#1c1c1c] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-[1px]">
                <Skeleton className="w-full h-full rounded-full p-[2px]" />
              </div>
              <Skeleton className="text-white font-medium rounded-full w-24 h-6" />
            </div>
            <div className="text-gray-400 hover:text-white transition-colors">
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {[...Array(3)].map((_, index) => (
              <div className="flex gap-3 justify-between" key={index}>
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full p-[1px]">
                    <Skeleton className="w-full h-full rounded-full p-[2px]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="text-white font-semibold rounded-full w-24 h-6" />
                      <Skeleton className="text-white text-sm ml-4 rounded-full w-48 h-6" />
                    </div>
                    <Skeleton className="text-gray-400 text-xs rounded-full w-16 h-4" />
                  </div>
                </div>
                <Skeleton className="rounded-full w-8 h-8" />
              </div>
            ))}
          </div>

          <div className="border-t border-[#1c1c1c] p-4">
            <div className="flex justify-between w-full">
              <div className="flex gap-4 mb-3">
                <Skeleton className="text-white rounded-full w-8 h-8" />
                <Skeleton className="text-white rounded-full w-8 h-8" />
                <Skeleton className="text-white rounded-full w-8 h-8" />
              </div>
              <Skeleton className="rounded-full w-6 h-6" />
            </div>
            <Skeleton className="text-white font-medium mb-2 rounded-full w-24 h-6" />
            <hr className="border-[#1c1c1c]" />
            <div className="flex items-center gap-3 mt-4">
              <Skeleton className="w-full outline-none bg-transparent text-white text-sm rounded-full h-10" />
              <Skeleton className="rounded-full w-16 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentBoxSkeleton