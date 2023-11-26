import React, { FC } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";


type Props = {};

const Hero: FC<Props> = ({}) => {
  return (
    <div className="w-full h-screen p-5 gap-x-10 1000px:flex items-center dark:bg-[#000000] bg-white">
      <div className="flex justify-center">
        <div className="relative w-[50vh] h-[50vh]">
          <div className=" 300px:w-[40vh] 300px:h-[40vh] 400px:w-[50vh]  400px:h-[50vh] rounded-full hero_animation absolute ">
     
          </div>

          <Image
            alt="img not found"
            src={require("../../../public/assets/banner1.png")}
            className="h-[auto] w-[50vh] rounded-full   object-contain absolute  "
          />
        </div>
      </div>

      <div className="1000px:w-[55%]  ml-10 flex flex-col items-center ">
        <h2 className=" dark:text-white text-[#000000c7] text-[40px] font-Josefin font-[500] leading-[45px]">
          Improve Your Online Learning Experience Better Instantly
        </h2>
        <br />
        <p className="dark:text-white text-[#000000c7]  font-Josefin font-[600] ">
          We have 40k Online courses & 500k Online registered student. Find your desired Courses from them.
        </p>
        <br />
        <div className="w-full flex items-center relative">
          <input type="text" placeholder="Search you course..." className="w-full p-1 appearance-none outline-none border border-[#232342]  rounded-sm focus:border-blue-700 " />
          <button className=" bg-red-500 p-1"><FaSearch size={24} />
</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
