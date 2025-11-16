import React from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import Image from './Image';

const menuList = [
  {
    id: 1,
    name: "Homepage",
    link: "/",
    icon: "/icons/home.svg",
  },
  {
    id: 2,
    name: "Explore",
    link: "/explore",
    icon: "/icons/explore.svg",
  },
  {
    id: 3,
    name: "Marketplace",
    link: "/marketplace",
    icon: "/icons/job.svg"
  },
]

const LeftBar = () => {
  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between pt-2 pb-8">
      {/* LOGO MENU BUTTON */}
      <div className="flex flex-col gap-4 text-lg items-center xxl:items-start">
        {/* LOGO */}
        <Link href="/" className="p-2 rounded-full hover:bg-[#181818] ">
          <Image path="icons/logo.svg" alt="logo" w={24} h={24} />
        </Link>
        {/* MENU LIST */}
        <div className="flex flex-col gap-4">
          {menuList.map((item) => (
            <Link
              href={item.link}
              className="p-2 rounded-full hover:bg-gray-200 flex items-center gap-4"
              key={item.id}
            >
              <NextImage
                src={item.icon}
                alt={item.name}
                width={24}
                height={24}
              />
              <span className="hidden xxl:inline">{item.name}</span>
            </Link>
          ))}
        </div>
        {/* BUTTON */}
        <Link
          href="/compose/post"
          className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center xxl:hidden"
        >
          <Image path="icons/post.svg" alt="new post" w={24} h={24} />
        </Link>
        <Link
          href="/compose/post"
          className="hidden xxl:block bg-green-600 text-white rounded-full font-bold py-2 px-20"
        >
          Post
        </Link>
      </div>
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <Image path="default-image.jpg" alt="gwe" w={100} h={100} tr={true} />
          </div>
          <div className="hidden xxl:flex flex-col">
            <span className="font-bold">gwe</span>
            <span className="text-sm text-textGray">@yttaygy</span>
          </div>
        </div>
        <div className="hidden xxl:block cursor-pointer font-bold">...</div>
      </div>
    </div>
  )
}

export default LeftBar