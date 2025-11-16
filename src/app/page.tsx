import Feed from "@/components/Feed"
import Share from "@/components/Share"
import Link from "next/link"

const Homepage = () => {
  return (
    <div className="pt-4">
      <Share />
      <div className='px-4 pt-4 my-5 flex bg-white rounded-2xl justify-between text-gray-300 font-bold'>
        <Link className="pb-3 flex items-center border-b-4 border-blue-500" href="/">For you</Link>
        <Link className="pb-3 flex items-center justify-center" href="/">Following</Link>
      </div>
      <Feed />
    </div>
  )
}

export default Homepage