import React, { FC } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { useGetBannerQuery } from "@/redux/features/layout/layout.Api";

type Props = {};

const Hero: FC<Props> = ({}) => {
  const { data, isLoading,refetch } = useGetBannerQuery("Banner",);
  return (
    <div className="w-full min-h-screen p-5 gap-x-10 1000px:flex items-center dark:bg-[#000000] bg-white">
      <div className="flex justify-center ">
        <div className="relative w-[50vh] h-[50vh]">
          <div className=" w-[30vh] h-[30vh] 300px:w-[40vh] 300px:h-[40vh] 400px:w-[30vh]  400px:h-[30vh] 800px:h-[50vh] 800px:w-[50vh] rounded-full hero_animation absolute "></div>

          <Image
            alt="img not found"
            src={data?.layout[0]?.banner?.image?.url}
            width={400}
            height={400}
            className="h-[50vh] w-[50vh] rounded-full   object-contain absolute  "
          />
        </div>
      </div>

      <div className="1000px:w-[55%]  ml-10 flex flex-col items-center ">
        <h2 className=" dark:text-white text-[#000000c7] text-[40px] font-Josefin font-[500] leading-[45px]">
          {data?.layout[0]?.banner?.title}
        </h2>
        <br />
        <p className="dark:text-white text-[#000000c7]  font-Josefin font-[600] ">
        {data?.layout[0]?.banner?.subTitle}
        </p>
        <br />
        <div className="w-full flex items-center relative">
          <input
            type="text"
            placeholder="Search you course..."
            className="w-full p-1 appearance-none outline-none border border-[#232342]  rounded-sm focus:border-blue-700 "
          />
          <button className=" bg-red-500 p-1">
            <FaSearch size={24} />
          </button>
        </div>

        <br />
        <div className="w-full flex items-center gap-x-3">
          <div className=" flex  ">
            <Image
              className="w-[6vh] h-[6vh] rounded-full border-[2px] border-[white]   "
              src={require("../../../public/assets/images (2).jpg")}
              alt="img not found"
            />
            <Image
              className="w-[6vh] h-[6vh] rounded-full border-[2px] border-[white] ml-[-20px]  "
              src={require("../../../public/assets/images.jpg")}
              alt="img not found"
            />
            <Image
              className="w-[6vh] h-[6vh] rounded-full border-[2px] border-[white] ml-[-20px]  "
              src={require("../../../public/assets/images (1).jpg")}
              alt="img not found"
            />
          </div>

          <h1 className="dark:text-white text-[#000000c7] ">
            500K+ People already trusted us{" "}
            <span className="text-[#4bdd4b]">View Courses</span>{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
