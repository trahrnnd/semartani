import Feed from "@/components/Feed";
import FollowButton from "@/components/FollowButton";
import Image from "@/components/Image";
import { prisma } from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import NextImage from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const UserPage = async ({ params }: { params: { username: string } }) => {
  const { userId } = await auth();
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: {
      _count: { select: { followers: true, followings: true } },
      followings: userId ? { where: { followerId: userId } } : undefined,
    },
  });

  if (!user) return notFound();
  return (
    <div className="">
      {/* PROFILE TITLE */}
      <div className="flex items-center gap-8 sticky top-[70px] backdrop-blur-lg mt-4 p-4 z-40 bg-[#FFFFFFcc]">
        <Link href="/">
          <NextImage src="/icons/back.svg" alt="back" width={24} height={24} />
        </Link>
        <h1 className="font-bold text-lg">{user.displayName}</h1>
      </div>
      {/* INFO */}
      <div className="bg-white rounded-2xl h-full">
        {/* COVER & AVATAR CONTAINER */}
        <div className="relative w-full">
          {/* COVER */}
          <div className="w-full border-none aspect-[3/1] relative">
            <Image
              path={user.cover || "general/noCover"}
              alt=""
              w={600}
              h={200}
              tr={true}
            />
          </div>
          {/* AVATAR */}
          <div className="w-1/5 aspect-square rounded-full overflow-hidden border-4 border-black bg-gray-300 absolute left-4 -translate-y-1/2">
            <Image
              path={user.cover || "general/noAvatar.png"}
              alt=""
              w={100}
              h={100}
              tr={true}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-2 p-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <NextImage
              src="/icons/more.svg"
              alt="more"
              width={20}
              height={20}
            />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <NextImage
              src="/icons/explore.svg"
              alt="more"
              width={20}
              height={20}
            />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <NextImage
              src="/icons/message.svg"
              alt="more"
              width={20}
              height={20}
            />
          </div>
          {userId && (
            <FollowButton
              userId={user.id}
              isFollowed={!!user.followings.length}
            />
          )}
        </div>
        {/* USER DETAILS */}
        <div className="p-4 flex flex-col gap-2">
          {/* USERNAME & HANDLE */}
          <div className="">
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <span className="text-textGray text-sm">@{user.username}</span>
          </div>
          {user.bio && <p>{user.bio}</p>}
          {/* JOB & LOCATION & DATE */}
          <div className="flex gap-4 text-textGray text-[15px]">
            {user.location && (
              <div className="flex items-center gap-2">
                <NextImage
                  src="icons/userLocation.svg"
                  alt="location"
                  width={20}
                  height={20}
                />
                <span>{user.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <NextImage
                src="icons/date.svg"
                alt="date"
                width={20}
                height={20}
              />
              <span>
                Joined{" "}
                {new Date(user.createdAt.toString()).toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          {/* FOLLOWINGS & FOLLOWERS */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">{user._count.followers}</span>
              <span className="text-gray-500 text-[15px]">Followers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{user._count.followings}</span>
              <span className="text-gray-500 text-[15px]">Followings</span>
            </div>
          </div>
        </div>
      </div>
      {/* FEED */}
      <Feed />
    </div>
  );
};

export default UserPage;
