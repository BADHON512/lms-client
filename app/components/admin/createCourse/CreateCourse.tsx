"use client";
import React, { useState, FC, useEffect } from "react";
import CourseInfo from "./CourseInfo";
import CourseOption from "./CourseOption";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CourseReview from "./CourseReview";
import { useCreateCourseMutation } from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {};

const CreateCourse: FC<Props> = ({}) => {
  const [Active, setActive] = useState(0);

  const [createCourse,{isLoading,error,isSuccess}]=useCreateCourseMutation()

  useEffect(()=>{
    if(isSuccess){
      toast.success('Course created successfully')
      redirect('/admin/all/course')
    }
    if(error){
      if( 'data' in error){
        const errorMessage=error as any
        toast.error(errorMessage.data.message)
      }
    }
  },[isLoading,error,isSuccess])
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "",
      link: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  const handelSubmit = async () => {
    // Format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    //format course content array
    const formattedCourseContentData = courseContentData.map((content) => ({
      videoUrl: content.videoUrl,
      title: content.title,
      description: content.description,
      videoSection: content.videoSection,
      link: content.link?.map((links) => ({
        title: links.title,
        url: links.url,
      })),
      suggestion: content.suggestion,
    }));
    // prepare our data object

    const data = {
      name: CourseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatePrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      benefits: formattedBenefits,
      totalVideos: courseContentData.length,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };
    setCourseData(data);
  };
  console.log("CourseData", courseData);
  const handelCourseCreate =async (e:any) => { 
     const data=courseData
     if(!isLoading){
      await createCourse(data)
     }
   }

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%] bg ">
        {Active === 0 && (
          <CourseInfo
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            Active={Active}
            setActive={setActive}
          />
        )}

        {Active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            Active={Active}
            setActive={setActive}
          />
        )}

        {Active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            Active={Active}
            setActive={setActive}
            handelSubmit={handelSubmit}
          />
        )}
        
        {Active === 3 && (
          <CourseReview
           courseData={courseData}
            Active={Active}
            setActive={setActive}
            handelCourseCreate={handelCourseCreate}
          />
        )}
      </div>
      <div className="w-[22%] mt-[60px] h-screen fixed z-[1] top-18 right-0 ">
        <CourseOption Active={Active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
