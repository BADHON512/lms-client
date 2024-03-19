import React from 'react'
import CourseCart from '../Course/CourseCart'

type Props = {
  courses: any
}

const EnrolledCourse = ({ courses }: Props) => {
  console.log(courses)

  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1 className='text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl dark:text-white text-black 800px:leading-[60px] font-[700] tracking-tight'>Expand Your Career
          <span className='text-gradient'> Opportunity</span><br /> Opportunity With Our Courses</h1>
        <br />
        <div className="grid  grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[30px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">

          {
            courses && courses.map((item:any, index:number) =>
              <CourseCart key={index} course={item} isProfile={true} />


            )
          }
        </div>
      </div>
    </div>
  )
}

export default EnrolledCourse