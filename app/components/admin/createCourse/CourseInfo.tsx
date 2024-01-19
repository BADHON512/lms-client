
'use client'
import { style } from "@/app/styles/styels";
import React, { FC, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  Active: number;
  setActive: (Active: number) => void;
};

const CourseInfo: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  setActive,
  Active,
}) => {
  const [Dragging, setDragging] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(Active + 1);
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    const fileReader = new FileReader();
    if (file) {
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: fileReader.result });
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
  
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          console.log('fileReader.result', fileReader.result)
          setCourseInfo({ ...courseInfo, thumbnail: fileReader.result });
        }
      };
      fileReader.readAsDataURL(file); // Move this line here
    }
  };
  
  return (
    <div className="w-[80%] m-auto mt-24">
      <form action="" onSubmit={handleSubmit} className={`${style.label}`}>
        <div>
          <label htmlFor="">Course Name</label>

          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN stack lms platforms with next 13  "
            className={style.input}
          />
        </div>
        <br />
        <div className="">
          <label htmlFor="">Course description</label>

          <textarea
            name=""
            required
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            cols={30}
            rows={8}
            placeholder="Write something amazing   "
            className={`${style.input} h-min !py-1`}
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%] ">
            <label htmlFor="">Course Price</label>

            <input
              type="name"
              name=""
              required
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="name"
              placeholder="Course price "
              className={style.input}
            />
          </div>

          <div className="w-[45%]">
            <label htmlFor="">Estimated Price</label>

            <input
              type="name"
              name=""
              required
              value={courseInfo.estimatedPrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="name"
              placeholder="Course price "
              className={style.input}
            />
          </div>
        </div>

        <br />
        <div>
          <label htmlFor="">Course Tags</label>

          <input
            type="name"
            name=""
            required
            value={courseInfo.tags}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            id="name"
            placeholder="MERN stack lms platforms with next 13  "
            className={style.input}
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%] ">
            <label htmlFor="">Course level</label>

            <input
              type="name"
              name=""
              required
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="name"
              placeholder="Course price "
              className={style.input}
            />
          </div>

          <div className="w-[45%]">
            <label htmlFor="">Demo Url</label>

            <input
              type="name"
              name=""
              required
              value={courseInfo.demoUrl}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="name"
              placeholder="Course price "
              className={style.input}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              Dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt="dd"
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input type="submit" value={'Next'} className="w-full 800px:w-[180px] h-[40px] bg-blue-400  text-center text-white mt-8 cursor-pointer"  />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInfo;
