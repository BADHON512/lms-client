import { style } from "@/app/styles/styels";
import {
  useEditLayoutMutation,
  useGetBannerQuery,
} from "@/redux/features/layout/layout.Api";
import React, { useState, FC, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const HeroCustomize = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, isLoading } = useGetBannerQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation({});

  useEffect(() => {
    if (data) {
      setTitle(data?.layout[0]?.banner?.title);
      setSubTitle(data?.layout[0]?.banner?.subTitle);
      setImage(data?.layout[0]?.banner?.image?.url);
    }
    if (isSuccess) {
      toast.success("Banner updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [data, isLoading, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    editLayout({
      type: "Banner",
      title,
      subTitle,
      image,
    });
  };

  return (
    <div className="mt-[200px]">
      <div className="w-full 1000px:flex items-center">
        <div className="flex justify-center ">
          <div className="relative w-[50vh] h-[50vh] rounded-full border border-[green]">
            <div className=" w-[30vh] h-[30vh] 300px:w-[40vh] 300px:h-[40vh] 400px:w-[30vh]  400px:h-[30vh] 800px:h-[50vh] 800px:w-[50vh] rounded-full hero_animation absolute "></div>

            <img
              alt="img not found"
              src={image}
              className="h-[50vh] w-[50vh] rounded-full   object-contain absolute  "
            />
            <input
              type="file"
              id="banner"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />
            <label
              htmlFor="banner"
              className="cursor-pointer absolute bottom-9 right-12 "
            >
              <AiOutlineCamera
                size={25}
                className="dark:text-white text-base  cursor-pointer"
              />
            </label>
          </div>
        </div>
        <div className="1000px:w-[55%]  ml-10 flex flex-col items-center ">
          <textarea
            className=" dark:text-white text-[#000000c7]  bg-transparent   outline-none focus:border-none text-[40px] font-Josefin font-[500] leading-[45px] resize-none "
            cols={30}
            rows={2}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <textarea
            cols={50}
            rows={3}
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className="dark:text-white text-[#000000c7]  resize-none!border-none bg-transparent font-Josefin font-[600] outline-none "
          />
          <br />

          <div className="h-full w-full ">
            <button onClick={()=>handleSubmit()} className={`${style.button} !w-[150px]`}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCustomize;
