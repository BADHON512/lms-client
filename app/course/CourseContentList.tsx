import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList = ({
  data,
  activeVideo,
  setActiveVideo,
  isDemo,
}: Props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );
  console.log(visibleSections);
  const videoSections: string[] = [
    ...new Set(data?.map((item: any) => item.videoSection)),
  ];

  let totalCount: number = 0;
  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };
  return <div className={`mt-[15px] w-full ${!isDemo&& 'ml-[-30px] min-h-screen sticky top-24 left-0 z-30'}`}>
  {videoSections.map((section:string,sectionIndex:number)=>{
  const isSectionVisible = visibleSections.has(section);
  //Filter the data based on the section
  const sectionVideos:any []=data.filter((item:any )=>item.videoSection===section)
  const videoCount = sectionVideos.length;
  const sectionVideoLength=sectionVideos.reduce((totalLength:number,item:any)=>totalLength+item.videoLength,0)
  const sectionStartIndex:number=totalCount; //start index of videos within the current section
  totalCount+=videoCount; //increment the total count
  const sectionCoutentHours:number=sectionVideoLength/60
  return (<div key={sectionIndex} className={`w-full ${!isDemo&& 'border-b border-[#ffffff8e] pb-2'}`}>

  <div className="w-full flex">
   {/* Render video section */}
   <div className="w-full flex justify-between items-center">
   <h1 className="text-[22px] text-black dark:text-white">{section}</h1>
    <button className='mr-4 cursor-pointer text-black dark:text-white'
    onClick={()=>toggleSection(section)}>
    {isSectionVisible?(<BsChevronUp size={20}/>):(<BsChevronDown size={20}/>)}</button>
   </div>
  </div>

  </div>
  )
  })}</div>
};

export default CourseContentList;
