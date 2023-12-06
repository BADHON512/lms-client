import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import avatarDefault from "../../../public/assets/avatar.jpg";
import { AiOutlineCamera } from "react-icons/ai";
import { style } from "@/app/styles/styels";
import { useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  avatar: any;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  console.log("user", user);
  const [name, setName] = useState(user && user.name);

  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
  const imageHandler = (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;

        updateAvatar(avatar);
      }
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  const handleSubmit = (e: any) => {};
  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={user.avatar|| avatar?user.avatar.url||avatar:avatarDefault}
            height={120}
            width={120}
            alt="img not found"
            className="w-[120px] h-[120px] rounded-full border-[3px] border-[#37a39a] "
          />

          <input
            type="file"
            name="avatar"
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />

          <label htmlFor="avatar">
            <AiOutlineCamera
              size={20}
              className="absolute bottom-3 right-2 cursor-pointer bg-black rounded-full p-[1px]"
            />
          </label>
        </div>
      </div>

      <div className="w-full pl-6 800px:pl-10">
        <form action="" onSubmit={handleSubmit}>
          <div className=" m-auto block pb-4">
            <div className="w-[100%]">
              <label htmlFor="" className="block pb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${style.input} !w-[95%] mb-4 800px:mb-0`}
              />
            </div>
          </div>

          <div className="m-auto block pb-4">
            <div className="w-[100%]">
              <label htmlFor="" className="block pb-2">
                Full Name
              </label>
              <input
                type="email"
                required
                value={user?.email}
                onChange={(e) => setName(e.target.value)}
                className={`${style.input} !w-[95%] mb-4 800px:mb-0`}
              />
            </div>
          </div>

          <div className="m-auto block pb-4">
            <div className="w-[100%]">
              <label htmlFor="" className="block pb-2">
                Full Name
              </label>
              <input
                type="submit"
                required
                value="Update"
                className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-white text-black rounded-sm cursor-pointer `}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
