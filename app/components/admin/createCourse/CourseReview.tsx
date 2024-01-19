import React, { FC } from "react";
import CoursePlayer from "./CoursePlayer";
import { style } from "@/app/styles/styels";

type Props = {
  Active: number;
  setActive: (active: number) => void;
  courseData: any;
  handelCourseCreate: any;
};

const CourseReview: FC<Props> = ({
  Active,
  setActive,
  courseData,
  handelCourseCreate,
}) => {

  const discountPercentage=((courseData?.estimatedPrice-courseData?.price)/courseData?.estimatedPrice)*100

  const discountPercentagePrice=discountPercentage.toFixed(0)

  
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
            {courseData?.estimatedPrice} $

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
      </div>
    </div>
  );
};
export default CourseReview;
