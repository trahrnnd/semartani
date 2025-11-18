"use client";

import { useState } from "react";
import { shareAction } from "@/actions";
import NextImage from "next/image";
import Image from "./Image";
import ImageEditor from "./ImageEditor";

const Share = () => {
    const [media, setMedia] = useState<File | null>(null);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [settings, setSettings] = useState <{
        type: "original" | "wide" | "square";
        sensitive: boolean;
    }>({
        type: "original",
        sensitive: false,
    });

    const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setMedia(e.target.files[0]);
        }
    };

    const previewURL = media ? URL.createObjectURL(media) : null;

    return (
        <form
            className="p-5 bg-white rounded-2xl flex gap-4"
            action={(formData) => shareAction(formData, settings)}
        >
            {/* AVATAR */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image 
                    path="default-image.jpg"
                    alt=""
                    w={100}
                    h={100}
                    tr={true}
                />         
            </div>
            {/* POST MESSAGE */}
            <div className="flex-1 flex flex-col gap-4">
                <input 
                    type="text" 
                    name="desc"
                    placeholder="ngepost apa ygy"
                    className="bg-transparent outline-none placeholder:text-gray-300 text-xl"
                />
                {/* POST IMAGE */}
                {media?.type.includes("image") && previewURL && (
                    <div className="relative w-full rounded-xl overflow-hidden">
                        <NextImage 
                            src={previewURL}
                            alt=""
                            width={600}
                            height={600}
                            className={`w-full ${
                                settings.type === "original"
                                ? "h-full object-contain"
                                : settings.type === "square"
                                ? "aspect-square object-cover"
                                : "aspect-video object-cover"
                            }`}
                        />
                        <div
                            className="absolute top-2 left-2 bg-black bg-opacity-50 text-white py-1 px-4 rounded-full font-bold text-sm cursor-pointer"
                            onClick={() => setIsEditorOpen(true)}
                        >
                            Edit
                        </div>
                        <div
                            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-evenly rounded-full cursor-pointer font-bold text-sm"
                            onClick={() => setMedia(null)}
                        >
                            ✕
                        </div>
                    </div>
                )}{
                    media?.type.includes("video") && previewURL && (
                    <div className="relative">
                        <video className="rounded-xl" src={previewURL} controls />
                        <div
                            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer font-bold text-sm" onClick={() => setMedia(null)}>
                            ✕
                        </div>
                    </div>
                )}
                {isEditorOpen && previewURL && (
                    <ImageEditor 
                        onClose={() => setIsEditorOpen(false)}
                        previewURL={previewURL}
                        settings={settings}
                        setSettings={setSettings}
                    />
                )}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex gap-4 flex-wrap">
                        <input
                            type="file"
                            name="file"
                            onChange={handleMediaChange}
                            className="hidden"
                            id="file"
                            accept="image/*,video/*"
                        />
                        <label htmlFor="file">
                            <NextImage
                                src="/icons/image.svg"
                                alt=""
                                width={20}
                                height={20}
                                className="cursor-pointer"
                            />
                        </label>
                        {/* <NextImage
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
                        /> */}
                    </div>
                    <button className="bg-primaryAccent hover:bg-[#81b13d] text-white font-bold rounded-full py-2 px-4">
                        Post
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Share