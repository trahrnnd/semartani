import React from 'react'
import Search from './Search'
import PopularTags from './PopularTags'

const RightBar = () => {
  return (
    <div className="pt-4 flex flex-col gap-4 sticky top-0 h-max w-full">
      <Search />
      <PopularTags />
    </div>
  )
}

export default RightBar