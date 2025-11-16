import Feed from "@/components/Feed"
import Share from "@/components/Share"
import Link from "next/link"

const Homepage = () => {
  return (
    <div className="">
      <div className='px-4 pt-4 flex justify-between text-gray-300 font-bold border-b-[1px] border-gray'>
        <Link className="pb-3 flex items-center border-b-4 border-blue-500" href="/">For you</Link>
        <Link className="pb-3 flex items-center" href="/">Following</Link>
      </div>
      <Share />
      <Feed />
    </div>
  )
}

export default Homepage