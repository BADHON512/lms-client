import React, { useState } from 'react'

type Props = {
    data:any,
    activeVideo?:number
    setActiveVideo?:any
}

const CourseContentList = ({data,activeVideo,setActiveVideo}: Props) => {
    const [visibleSections,setVisibleSections]=useState<Set<string>>(
        new Set<string>()
    )
  return (
    <div>CourseContentList</div>
  )
}

export default CourseContentList