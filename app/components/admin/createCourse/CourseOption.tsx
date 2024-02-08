'use client'
import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  Active: number;
  setActive: (Active: number) => void;
};

const CourseOption: FC<Props> = ({ Active, setActive }) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];
  return (
    <div>
      {options.map((v: any, i: number) => (
        <div key={i} className="w-full flex py-5">
          <div
            className={`' w-[35px] h-[35px] rounded-full flex items-center justify-center' ${
              Active + 1 > i ? "bg-blue-500" : "bg-[#384766]"
            } relative -z-10`}
          >
            <IoMdCheckmark className="text-[25px] ml-1 " />
            {i !== options.length-1  && (
              <div
                className={`absolute h-[40px] w-1 ${
                  Active + 1 > i ? "bg-blue-500" : "bg-[#384766]"
                } bottom-[-115%] -z-10 left-[40%]`}
              />
            )}
          </div>
          <h1
            className={`pl-3 ${
              Active === i
                ? "dark:text-white text-black"
                : "dark:text-white text-black"
            } text-[20px]`}
          >
            {v}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default CourseOption;
