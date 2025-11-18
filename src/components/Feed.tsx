import React from "react";
import Post from "./Post";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";

const Feed = async () => {
  const { userId } = await auth();

  if (!userId) return;

  const posts = await prisma.post.findMany({
    include: {
      user: { select: { displayName: true, username: true, img: true } },
      rePost: {
        include: {
          user: { select: { displayName: true, username: true, img: true } },
          _count: { select: { likes: true, comments: true, rePosts: true } },
          likes: { where: { userId: userId }, select: { id: true } },
          rePosts: { where: { userId: userId }, select: { id: true } },
        },
      },
      _count: { select: { likes: true, comments: true, rePosts: true } },
      likes: { where: { userId: userId }, select: { id: true } },
      rePosts: { where: { userId: userId }, select: { id: true } },
    },
  });
  return (
    <div className="mt-5 bg-white rounded-2xl">
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post} user={post.user} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
