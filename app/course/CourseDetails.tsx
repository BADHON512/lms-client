import React from "react";
import { useSelector } from "react-redux";
import Ratings from "../utils/Ratings";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { format } from "timeago.js";
import CoursePlayer from "../components/admin/createCourse/CoursePlayer";
import Link from "next/link";
import { style } from "../styles/styels";
import CourseContentList from "./CourseContentList";

type Props = {
  data: any;
};

const CourseDetails = ({ data }: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const disCountPercentage =
    ((data?.estimatePrice - data?.price) / data?.estimatePrice) * 100;
  const disCountPercentagePrice = disCountPercentage.toFixed(2);
  console.log(disCountPercentagePrice);
  const isPurchased = user?.courses?.find(
    (course: any) => course._id === data?._id
  );

  const handleOrder = (e: any) => {
    e.preventDefault();
    if (isPurchased) {
      alert("You have already purchased this course");
    } else {
      alert("You have to login first");
    }
  };
  return (
    <div>
      <div className="w-[90%]  m-auto py-5">
        <div className="w-full flex  flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[60% ] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data?.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data?.ratings} />
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length} Reviews
                </h5>
              </div>
              <h1 className="text-black dark:text-white">
                {data.purchased} Students
              </h1>
            </div>

            <br />
            <br />
            <h1 className="text-black dark:text-white">
              What you will learn from this course ?
            </h1>
            <br />
            <div>
              {data?.benefits?.map((benefit: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15%] mr-1">
                    <IoCheckmarkCircleOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white ">
                    {benefit.title}
                  </p>
                </div>
              ))}
              <br />
              <br />

              <h1 className="text-black dark:text-white">
                What are the prerequisites?
              </h1>
              <br />
              <div>
                {data?.prerequisites?.map((benefit: any, index: number) => (
                  <div
                    className="w-full flex 800px:items-center py-2"
                    key={index}
                  >
                    <div className="w-[15%] mr-1">
                      <IoCheckmarkCircleOutline
                        size={20}
                        className="text-black dark:text-white"
                      />
                    </div>
                    <p className="pl-2 text-black dark:text-white ">
                      {benefit.title}
                    </p>
                  </div>
                ))}
                <br />
                <br />
                <div>
                  <h1 className="pl-2 text-black dark:text-white ">
                    Course Overview
                  </h1>

          <CourseContentList data={data.course}/>
                </div>

                <br />
                <br />
                <div className="w-full">
                  <h1 className="pl-2 text-black dark:text-white text-[25px] font-[600] font-Poppins">
                    Course Details
                  </h1>
                  <h1 className="mt-[20px] text-black dark:text-white text-[18px] whitespace-pre-line w-full overflow-hidden font-[600] font-Poppins">
                    {data?.description}
                  </h1>
                </div>
                <br />
                <br />
                <div className="w-full">
                  <div className="800px:flex items-center">
                    <Ratings rating={data?.rating} />
                    <div className="mb-2 800px:mb-[unset]">
                      <h1 className="text-[25px] font-Poppins text-black dark:text-white">
                        {Number.isInteger(data?.ratings)
                          ? data?.ratings.toFixed(1)
                          : data?.ratings.toFixed(2)}{' '}
                         Course Rating {data?.reviews?.length} Reviews
                      </h1>
                    </div>
                    <br />
                    {(data?.review&& [...data.reviews].reverse())?.map((item:any,index:number)=>(
                        <div className="w-full pb-4" key={index}>
                            <div className="flex">
                                <div className="w-[50px] h-[50px]">
                                    <div className="w-[50px] h-[50px]  bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                                        <h1 className="uppercase text-[18px] text-black dark:text-white">
                                            {item?.user?.name.slice(0,2)}
                                        </h1>
                                    </div>
                                </div>
                                <div className="hidden 800px:block pl-2">
                                    <div className="flex items-center">
                                        <h1 className="text-[18px] pr-2 text-black dark:text-white">{item.user.name}</h1>
                                        <Ratings rating={item.ratings}/>
                                    </div>
                                    <p className="text-[18px] text-black dark:text-white">{item.comment}</p>
                                    <small className=" text-[#000000d1] dark:text-white">
                                        {format(item.createdAt)}
                                    </small>
                                </div>
                                <div className="800px:hidden pl-2 flex items-center">
                                    <h1 className="text-[18px] pr-2 text-black dark:text-white">{item.user.name}</h1>
                                    <Ratings rating={item.ratings}/>
                                </div>
                            </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full 800px:w-[45%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
                < CoursePlayer videoUrl={data?.demoUrl} title={data?.title}/>
                <div className="flex items-center">
                  <h1 className="pt-5 text-[25px]  dark:text-white text-black">
                    {data.price ===0 ?'Free': data.price + '$'}
                  </h1>
                  <h2 className="pl-3 text-[20px] mt-2 line-through opacity-80 dark:text-white text-black">{data.estimatePrice}</h2>
                  <h2 className="pl-3 text-[20px] mt-2 dark:text-white text-black">{disCountPercentagePrice}% off</h2>
                </div>
                <div className="flex items-center">
                  {isPurchased?(
                    <Link href={`/course-access/${data._id}`} className={`${style.button} !w-[180px] my-3 font-Poppins !bg-[crimson]`}>Enter to Course</Link>
                  ):(        <div onClick={handleOrder} className={`${style.button} !w-[180px] my-3 font-Poppins !bg-[crimson]`}> Buy Now {data.price + '$'}</div>)}
                </div>
                <br />
                <p className=" pb-1 text-black dark:text-white">Source code included</p>
                <p className=" pb-1 text-black dark:text-white">Full lifetime access</p>
                <p className=" pb-1 text-black dark:text-white">Certificate of completion</p>
                <p className=" pb-3 800px:pb-1 text-black dark:text-white ">Premium Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
