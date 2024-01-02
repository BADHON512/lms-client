import { style } from "@/app/styles/styels";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import toast from "react-hot-toast";

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

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.link[0].title === "" ||
      item.link[0].url === ""
    ) {
      toast.error("Please fill all the fields first");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;
        // use the last videoSection if available else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        link: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      (courseContentData[courseContentData.length - 1].title =
        "" ||
        courseContentData[courseContentData.length - 1].description === "" ||
        courseContentData[courseContentData.length - 1].videoUrl === "" ||
        courseContentData[courseContentData.length - 1].link[0].title === "" ||
        courseContentData[courseContentData.length - 1].link[0].url === "")
    ) {
      toast.error("Please fill all fields first");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        link: [{ title: "", url: "" }],
      };
      setCourseContentData([courseContentData, newContent]);
    }
  };

  const handelPrev = () => {
    setActive(Active--);
  };

  const handelNext = () => {
    if (
      (courseContentData[courseContentData.length - 1].title =
        "" ||
        courseContentData[courseContentData.length - 1].description === "" ||
        courseContentData[courseContentData.length - 1].videoUrl === "" ||
        courseContentData[courseContentData.length - 1].link[0].title === "" ||
        courseContentData[courseContentData.length - 1].link[0].url === "")
    ) {
      toast.error("Please fill all fields first");
    } else {
      setActive(Active++);
      handelCourseSubmit();
    }
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
                    <div> 🎃🎊</div>
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
                        value={item.title}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].title = e.target.value;
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
                    {item?.link?.map((link: any, linkindex: number) => (
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
                {/* add new content */}
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className=" flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={(e) => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}

        <br />
        <div>
          <p
            className=" flex items-center text-[18px] dark:text-white text-black cursor-pointer"
            onClick={() => addNewSection()}
          >
            <AiOutlinePlusCircle className="mr-2" /> Add New Content
          </p>
        </div>
      </form>
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
          {" "}
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
