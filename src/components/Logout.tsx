"use client";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";

const Logout = () => {
  const [open, setOpen] = useState(false);
  const { signOut } = useClerk();

  return (
    <div className="hidden xxl:block relative">
      <div
        className="cursor-pointer font-bold"
        onClick={() => setOpen((prev) => !prev)}
      >
        ...
      </div>
      {open &&
        createPortal(
          <div className="fixed inset-0 left-40 z-50" onClick={() => setOpen(false)}>
            <div
              className="bg-white py-6 px-8 rounded-xl absolute left-4 bottom-20 flex flex-col gap-2 w-max shadow-xl border"
              onClick={(e) => e.stopPropagation()}
            >
              <Link
                href=""
                className="text-gray-500 text-sm hover:text-black"
                onClick={() => setOpen(false)}
              >
                User Profile
              </Link>
              <Link
                href="/profile"
                className="text-textGray text-sm hover:text-black"
                onClick={() => setOpen(false)}
              >
                Saved Posts
              </Link>
              <Link
                href="/profile"
                className="text-textGray text-sm hover:text-black"
                onClick={() => setOpen(false)}
              >
                Settings
              </Link>
              <hr />
              <button
                className="bg-white rounded-full text-red-500 px-2 py-1 hover:bg-gray-100"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
export default Logout;
