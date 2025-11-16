import React from 'react'
import Post from './Post'
import { prisma } from '@/prisma'

const Feed = async () => {
  const posts = await prisma.post.findMany();
  return (
    <div className="mt-5 bg-white rounded-2xl">
      {posts.map((post) => (
        <div key={post.id}>
          <Post />
        </div>
      ))}
    </div>
  )
}

export default Feed