import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import Image from "./Image";
import { currentUser } from "@clerk/nextjs/server";
import Notification from "./Notification";
import Logout from "./Logout";

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
    id: 4,
    name: "Marketplace",
    link: "/marketplace",
    icon: "/icons/job.svg",
  },
];

const LeftBar = async () => {
  const user = await currentUser();

  return (
    <div className="h-[calc(100vh-80px)] sticky top-[80px] flex flex-col justify-between pt-4 pb-8">
      {/* LOGO MENU BUTTON */}
      <div className="flex flex-col gap-4 text-lg p-4 items-center xxl:items-start bg-white rounded-2xl">
        {/* MENU LIST */}
        <div className="flex flex-col gap-4">
          {menuList.map((item, i) => (
            <React.Fragment key={item.id}>
              {i === 2 && (
                <div>
                  <Notification />
                </div>
              )}
              <Link
                href={item.link}
                className="p-2 rounded-full hover:bg-gray-200 flex items-center gap-4"
              >
                <NextImage
                  src={item.icon}
                  alt={item.name}
                  width={24}
                  height={24}
                />
                <span className="hidden xxl:inline">{item.name}</span>
              </Link>
            </React.Fragment>
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
          className="hidden xxl:block hover:bg-[#81b13d] bg-primaryAccent text-white rounded-full font-bold py-2 px-20"
        >
          Post
        </Link>
      </div>
      {user && (
        <>
          {/* USER */}
          <div className="flex items-center justify-between bg-white rounded-full p-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 relative rounded-full overflow-hidden">
                <Image src={user?.imageUrl} alt="" w={100} h={100} tr={true} />
              </div>
              <div className="hidden xxl:flex flex-col">
                <span className="font-bold">{user?.username}</span>
                <span className="text-sm text-textGray">@{user?.username}</span>
              </div>
            </div>
            {/* <div className="hidden xxl:block cursor-pointer font-bold">...</div> */}
            {/* ADD LOGOUT */}
            <Logout />
          </div>
        </>
      )}
    </div>
  );
};

export default LeftBar;
