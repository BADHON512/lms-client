import { style } from "@/app/styles/styels";
import React, { FC, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg, BsPencil } from "react-icons/bs";

type Props = {
  Active: number;
  setActive: (Active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handelSubmit: any;
};

const CourseContent: FC<Props> = ({
  Active,
  setActive,
  handelSubmit: handelCourseSubmit,
  setCourseContentData,
  courseContentData,
}) => {
  const [isCollapsed, setCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);
  const handelSubmit = async (e: any) => {
    e.preventDefault();
  };

  const handelCollapseToggle = (index: number) => {
    const updateCollapsed = [...isCollapsed];
    updateCollapsed[index] = !updateCollapsed[index];
    setCollapsed(updateCollapsed);
  };

  const handelRemoveLink = (index: number, linkIndex: number) => {
    const updateData = [...courseContentData];
    updateData[index].link.splice(linkIndex, 1);
    setCourseContentData(updateData);
  };

  const handleAddLink = (index: number) => {
    const updateData = [...courseContentData];
    updateData[index].link.push({ title: "", url: "" });
    setCourseContentData(updateData);
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handelSubmit}>
        {courseContentData.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <>
              <div
                className={`w-full bg-gray-800 p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        placeholder="Untitled Section"
                        className={` text-[20px] ${
                          item.videoSection === "Untitled Section"
                            ? " w-[170px]"
                            : "w-min"
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].videoSection = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                      <BsPencil className=" cursor-pointer dark:text-white text-black" />
                    </div>
                  </>
                )}
                <div className=" flex w-full items-center justify-between my-8">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1},{item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  {/* arrow button for collapse video content */}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updateData = [...courseContentData];
                          updateData.splice(index, 1);
                          setCourseContentData(updateData);
                        }
                      }}
                    />

                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className={`dark:text-white text-black`}
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handelCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-8">
                      <label htmlFor="" className={`${style.label}`}>
                        Video Url
                      </label>
                      <input
                        type="text"
                        className={`${style.input}`}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].videoUrl = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>

                    <div className="my-8">
                      <label htmlFor="" className={`${style.label}`}>
                        Video Title
                      </label>
                      <input
                        type="text"
                        className={`${style.input}`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].videoSection = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>

                    <div className="my-8">
                      <label htmlFor="" className={`${style.label}`}>
                        Video Description
                      </label>
                      <textarea
                        cols={30}
                        rows={8}
                        className={`${style.input}`}
                        value={item.description}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].description = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>
                    {item?.link.map((link: any, linkindex: number) => (
                      <div className=" mb-3 block" key={index}>
                        <div className="w-full flex items-center justify-between">
                          <label htmlFor="" className={`${style.label}`}>
                            Link {linkindex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkindex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            }  text-black dark:text-white`}
                            onClick={() =>
                              linkindex === 0
                                ? null
                                : handelRemoveLink(index, linkindex)
                            }
                            size={20}
                          />
                        </div>
                        <input
                          type="text"
                          className={`${style.input}`}
                          value={link.title}
                          onChange={(e) => {
                            const updateData = [...courseContentData];
                            updateData[index].link[linkindex].title =
                              e.target.value;
                            setCourseContentData(updateData);
                          }}
                        />

                        <input
                          type="text"
                          className={`${style.input}`}
                          value={link.url}
                          onChange={(e) => {
                            const updateData = [...courseContentData];
                            updateData[index].link[linkindex].url =
                              e.target.value;
                            setCourseContentData(updateData);
                          }}
                        />
                      </div>
                    ))}

                    {/* add link button */}
                    <div className=" inline-block mb-4">
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                  
                )}
              </div>
              
            </>
          );
        })}
      </form>
    </div>
  );
};

export default CourseContent;
