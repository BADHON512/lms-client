import React, { FC } from "react";
import CoursePlayer from "./CoursePlayer";
import { style } from "@/app/styles/styels";
import Ratings from "@/app/utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  edit?: boolean;
  Active: number;
  setActive: (active: number) => void;
  courseData: any;
  handelCourseCreate: any;
};

const CourseReview: FC<Props> = ({
  edit,
  Active,
  setActive,
  courseData,
  handelCourseCreate,
}) => {

  const discountPercentage=((courseData?.estimatePrice-courseData?.price)/courseData?.estimatePrice)*100

  const discountPercentagePrice=discountPercentage.toFixed(0)

  
  const handelPrev = () => {
    setActive(Active-1);
  };

  const handelNext = () => {
    handelCourseCreate()
  }
  
  return (
    <div className="w-[90%] m-auto py-5 mb-5">
    
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>

        <div className=" flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.pride===0? 'Free' : courseData?.price+ '$'}
          </h1>
          <h1 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {courseData?.estimatePrice} $

          </h1>

            <h4 className="pl-5 pt-4 text-[22px]">
              {discountPercentagePrice} % off
            </h4>
        </div>
        <div className=" flex items-center">
          <div className={`${style.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}>
            Buy Now {courseData.price}

          </div>
        </div>
        <div className="flex items-center">
          <input type="text"
          placeholder="Discount Code ..."
          className={`${style.input} !w-[60%] ml-3 !mt-0 `} />
          <div className={`${style.button} !w-[120px] my-3 ml-4 cursor-pointer font-Poppins `}>
            Apply
          </div>
        </div>
        <p className="pb-1">Source code included</p>
        <p className="pb-1">Full lifetime access</p>
        <p className="pb-1">Certificate of Completion</p>
        <p className="pb-1 800px:pb-1">Premium support</p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600]">{courseData?.name}</h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={5}/>
              <h1>0 Reviews</h1>
            </div>
            <h2>0 Student</h2>
          </div>
          <br />
          <h1 className="text-[25px] font-Poppins font-[600]">
            What you will learn from this course?
          </h1>
        </div>
        {
          courseData?.benefits?.map((item:any,index:number)=>(
            <div key={index} className="w-full flex 800px:items-center py-2">
              <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
              </div>
              <p className="pl-2">{item.title}</p>
            </div>
          ))
        }
        <br />
        <h1 className="text-[25px] font-Poppins font-[600]">
            What are the prerequisites for starting this course ?
          </h1>
          {courseData?.prerequisites.map((item:any,index:number)=>(
               <div key={index} className="w-full flex 800px:items-center py-2">
               <div className="w-[15px] mr-1">
               <IoCheckmarkDoneOutline size={20} />
               </div>
               <p className="pl-2">{item.title}</p>
             </div>
          ))}

        {/* course description */}
        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-[600]">
            Course Details
          </h1>
          {courseData?.description}
        </div>
      </div>
      <br />
      <div className="w-full flex justify-between items-center">
        <div
          className="w-full 800px:w-[100px] flex items-center justify-center h-[40px]  bg-blue-400 text-center text-white
        rounded mt-8 cursor-pointer"
          onClick={() => handelPrev()}
        >
          {" "}
          Prev
        </div>

        <div
          className="w-full 800px:w-[100px] flex items-center justify-center h-[40px]  bg-blue-400 text-center text-white
        rounded mt-8 cursor-pointer"
          onClick={() => handelNext()}
        >
         {edit ? 'Update' : 'Create'}
        </div>
      </div>
    </div>
  );
};
export default CourseReview;
