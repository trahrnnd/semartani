import React from 'react'
import Search from './Search'
import PopularTags from './PopularTags'
import Recommendations from './Recommendations'

const RightBar = () => {
  return (
    <div className="pt-4 flex flex-col gap-4 sticky top-[80px] h-[calc(100vh-80px)] w-full">
      {/* <Search /> */}
      <Recommendations />
      <PopularTags />
    </div>
  )
}

export default RightBar