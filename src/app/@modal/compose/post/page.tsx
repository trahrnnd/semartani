"use client";

import { shareAction } from "@/actions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import NextImage from "next/image";
import Image from "@/components/Image";
import ImageEditor from "@/components/ImageEditor";

const PostModal = () => {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="absolute w-screen h-screen top-0 left-0 z-20 bg-[#293139a6] flex justify-center">
      <div className="py-4 px-8 rounded-xl bg-white w-[600px] h-max mt-12">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <div
            className="cursor-pointer rounded-full hover:bg-gray-300"
            onClick={closeModal}
          >
            ✕
          </div>
          <div className="text-blue-400 font-bold">Drafts</div>
        </div>
        {/* CENTER */}
        <div className="py-8 flex gap-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image path="default-image.jpg" alt="" w={100} h={100} tr={true} />
          </div>
          <input
            className="flex-1 bg-transparent outline-none text-lg"
            type="text"
            placeholder="review apa ygy"
          />
        </div>
        {/* BOTTOM */}
        <div className="flex items-center justify-between gap-4 flex-wrap border-t border-gray-400 pt-4">
          <div className="flex gap-4 flex-wrap">
            <NextImage
              src="icons/image.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <NextImage
              src="/icons/gif.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <NextImage
              src="/icons/poll.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <NextImage
              src="/icons/emoji.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <NextImage
              src="/icons/schedule.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <NextImage
              src="/icons/location.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
          <button className="py-2 px-5 text-white bg-green-600 rounded-full font-bold">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
