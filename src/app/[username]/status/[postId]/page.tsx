import Comments from "@/components/Comments";
import NextImage from "next/image";
import Post from "@/components/Post";
import Link from "next/link";

const StatusPage = () => {
    return (
        <div className="">
            <div className="flex items-center gap-8 sticky top-0 backdrop-blur-lg p-4 z-10 bg-[#FFFFFF84]">
                <Link href="/">
                    <NextImage src="/icons/back.svg" alt="back" width={24} height={24} />
                </Link>
                <h1 className="font-bold text-lg text-black">Post</h1>
            </div>
            <Post type="status"/>
            <Comments/>
        </div>
    );
};

export default StatusPage;