"use client"
import React from 'react'
import CourseDetailsPage from '../CourseDetailsPage'


const Page = ({params}: any) => {
    
  return (
    <div><CourseDetailsPage id={params.id}/></div>
  )
}

export default Page