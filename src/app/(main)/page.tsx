import Feed from "@/components/Feed"
import Share from "@/components/Share"
import Link from "next/link"

const Homepage = () => {
  return (
    <div className="pt-5">
      <Share />
      <div className='px-4 pt-4 my-5 flex bg-white rounded-2xl justify-between text-gray-300 font-bold'>
        <div className="pb-3 flex items-center cursor-pointer w-1/2 justify-center border-b-4 border-secondaryAccent">
          <Link href="/">For you</Link>
        </div>
        <div className="pb-3 flex items-center cursor-pointer h-full justify-center w-1/2">
          <Link href="/">Following</Link>
        </div>
      </div>
      <Feed />
    </div>
  )
}

export default Homepage