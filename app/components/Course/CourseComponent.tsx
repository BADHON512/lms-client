import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi'
import React from 'react'

type Props = {
    id:string
}

const CourseComponent = ({id}: Props) => {
    const {data ,error}=useGetCourseContentQuery(id)
    console.log(data)
  return (
    <div>CourseComponent</div>
  )
}

export default CourseComponent