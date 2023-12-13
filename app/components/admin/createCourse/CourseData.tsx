import React, { FC } from 'react'

type Props = {
    benefits:{title:string}[]
    setBenefits:(benefits:{title:string}[])=>void

    prerequisites:{title:string}[]
    setPrerequisites:(prerequisites:{title:string}[])=>void
    Active: number;
    setActive: (Active: number) => void;
  };

const CourseData:FC<Props> = ({benefits,setActive,setBenefits,Active}) => {
  return (
    <div>CourseData</div>
  )
}

export default CourseData