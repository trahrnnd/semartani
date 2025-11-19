import Comments from "@/components/Comments";
import NextImage from "next/image";
import Post from "@/components/Post";
import Link from "next/link";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";

const StatusPage = async ({
  params,
}: {
  params: Promise<{ username: string; postId: string }>;
}) => {
  const { userId } = await auth();
  const postId = (await params).postId;

  const post = await prisma.post.findFirst({
    where: { id: Number(postId) },
    include: {
      user: { select: { displayName: true, username: true, img: true } },
      _count: { select: { likes: true, comments: true, rePosts: true } },
      likes: userId
        ? { where: { userId: userId }, select: { id: true } }
        : false,
      rePosts: userId
        ? { where: { userId: userId }, select: { id: true } }
        : false,
      saves: userId
        ? { where: { userId: userId }, select: { id: true } }
        : false,
      comments: {
        include: {
          user: { select: { displayName: true, username: true, img: true } },
          _count: { select: { likes: true, comments: true, rePosts: true } },
          likes: userId
            ? { where: { userId: userId }, select: { id: true } }
            : false,
          rePosts: userId
            ? { where: { userId: userId }, select: { id: true } }
            : false,
          saves: userId
            ? { where: { userId: userId }, select: { id: true } }
            : false,
        },
      },
    },
  });

  if (!post) return;
  return (
    <div className="">
      <div className="flex items-center gap-8 sticky top-[80px] backdrop-blur-lg mt-4 p-4 z-40 bg-[#FFFFFFcc]">
        <Link href="/">
          <NextImage src="/icons/back.svg" alt="back" width={24} height={24} />
        </Link>
        <h1 className="font-bold text-lg text-black">Post</h1>
      </div>
      <Post type="status" post={post} />
      <Comments comments={post.comments} postId={post.id} username={post.user.username}/>
    </div>
  );
};

export default StatusPage;
