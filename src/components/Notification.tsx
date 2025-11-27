"use client";
import { useEffect, useState } from "react";
import NextImage from "next/image";
import { socket } from "@/socket";
import { useRouter } from "next/navigation";

type NotificationType = {
  id: string;
  senderUsername: string;
  type: "like" | "comment" | "rePost" | "follow";
  link: string;
};

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data: NotificationType) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, []);

  const router = useRouter();

  const reset = () => {
    setNotifications([]);
    setOpen(false);
  };

  const handleClick = (notification: NotificationType) => {
    const filteredList = notifications.filter((n) => n.id !== notification.id);
    setNotifications(filteredList);
    setOpen(false);
    router.push(notification.link);
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer p-2 rounded-full hover:bg-gray-200 flex items-center gap-4"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="relative">
          <NextImage src="/icons/notification.svg" alt="" width={24} height={24} />
          {notifications.length > 0 && (
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-iconBlue p-2 rounded-full flex items-center justify-center text-sm">
              {notifications.length}
            </div>
          )}
        </div>
        <span className="hidden xxl:inline">Notifications</span>
      </div>
      {open && (
        <div className="absolute left-0 top-full mt-2 z-[60] p-4 rounded-lg bg-white text-black flex flex-col gap-4 w-60 shadow-xl border max-h-96 overflow-y-auto">
          <h1 className="text-xl text-textGray">Notifications</h1>
          {notifications.length > 0 ? (
            <>
              {notifications.map((n) => (
                <div
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
                  key={n.id}
                  onClick={() => handleClick(n)}
                >
                  <b>{n.senderUsername}</b>{" "}
                  {n.type === "like"
                    ? "liked your post"
                    : n.type === "rePost"
                    ? "re-posted your post"
                    : n.type === "comment"
                    ? "replied to your post"
                    : "followed you"}
                </div>
              ))}
              <button
                onClick={reset}
                className="bg-primaryAccent text-white p-2 text-sm rounded-lg hover:bg-[#81b13d] transition-colors"
              >
                Mark as read
              </button>
            </>
          ) : (
            <p className="text-textGray text-center py-4">No notifications</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;