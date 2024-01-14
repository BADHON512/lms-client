import React ,{FC}from 'react'

type Props = {
    Active:number;
    setActive:(active:number)=>void;
    courseData:any
    handelCourseCreate:any
}

const CourseReview:FC<Props> = ({
    Active,
    setActive,
    courseData,
    handelCourseCreate  
}) => {
  return (
    <div className='w-[90%] m-auto py-5 mb-5'>
        <div className='w-full relative'>
            <div className='w-full mt-10'>
                <CoursePlayer
                
                videoUrl={courseData?.demoUrl}
                title={courseData?.title}/>
            </div>
        </div>
    </div>
  )
}

export default CourseReview