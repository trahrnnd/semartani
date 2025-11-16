import React from 'react'
import NextImage from 'next/image'

const PopularTags = () => {
  return (
    <div className="p-5 rounded-2xl bg-white flex flex-col gap-4">
        <h1 className="text-xl font-bold text-black">
            Trending Topics
        </h1>
        {/* TREND */}
        {/* <div className="flex gap-4">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                <NextImage 
                    src="/general/event.png"
                    alt="event"
                    width={120}
                    height={120}
                />
            </div>
            <div className="flex-1">
                <h2 className="font-bold text-gray-200">
                    oalah
                </h2>
                <span className="text-sm text-gray-500">Last night</span>
            </div>
        </div> */}
        {/* TOPICS */}
        <div className="">
            <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Technology • Trending</span>
                <NextImage src="/icons/infoMore.svg" alt="info" width={16} height={16} />

            </div>
            <h2 className="text-gray-200 font-bold">open ai</h2>
            <span className="text-gray-500 text-sm">20K posts</span>
        </div>
        {/* TOPICS */}
        <div className="">
            <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Technology • Trending</span>
                <NextImage src="/icons/infoMore.svg" alt="info" width={16} height={16} />

            </div>
            <h2 className="text-gray-200 font-bold">open ai</h2>
            <span className="text-gray-500 text-sm">20K posts</span>
        </div>
        {/* TOPICS */}
        <div className="">
            <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Technology • Trending</span>
                <NextImage src="/icons/infoMore.svg" alt="info" width={16} height={16} />

            </div>
            <h2 className="text-gray-200 font-bold">open ai</h2>
            <span className="text-gray-500 text-sm">20K posts</span>
        </div>
        {/* TOPICS */}
        <div className="">
            <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Technology • Trending</span>
                <NextImage src="/icons/infoMore.svg" alt="info" width={16} height={16} />

            </div>
            <h2 className="text-gray-200 font-bold">open ai</h2>
            <span className="text-gray-500 text-sm">20K posts</span>
        </div>
    </div>
  )
}

export default PopularTags