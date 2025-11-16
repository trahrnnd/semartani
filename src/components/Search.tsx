import Image from "next/image"


const Search = () => {
  return (
    <div className="bg-gray-100 py-2 px-4 flex items-center gap-4 rounded-full w-full">
        <Image 
            src="/icons/explore.svg"
            width={16}
            height={16}
            alt="search"
        />
        <input type="text" placeholder="Search" className="bg-transparent outline-none placeholder:text-gray-500 w-full" />
    </div>
  )
}

export default Search