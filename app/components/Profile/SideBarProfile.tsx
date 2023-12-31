import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import avatarDefault from "../../../public/assets/avatar.jpg";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

type Props = {
  user: any;
  active: number;
  avatar: null | string;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  active,
  setActive,
  logOutHandler,
  avatar,
  user,
}) => {
  console.log("avatar2", avatar);
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-[#ddd3d3]" : " bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          height={20}
          width={20}
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          alt="img not fund"
          className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
        />
        <h1 className="pl-2 800px:block hidden dark:text-white text-black font-Poppins">
          My Account
        </h1>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2
            ? "dark:bg-slate-800 bg-[#ddd3d3]"
            : "dark:bg-transparent "
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="text-black dark:text-white" />
        <h1 className="pl-2 800px:block hidden text-black dark:text-white">
          Change Password
        </h1>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3
            ? "dark:bg-slate-800 bg-[#ddd3d3]"
            : "dark:bg-transparent "
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="text-black dark:text-white" />
        <h1 className="pl-2 800px:block hidden text-black dark:text-white">
          Enrolled Courses
        </h1>
      </div>
      {user.role === "admin" && (
        <Link
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 4
              ? "dark:bg-slate-800 bg-[#ddd3d3]"
              : "dark:bg-transparent "
          }`}
          href={'/admin'}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            className="text-black dark:text-white"
          />
          <h1 className="pl-2 800px:block hidden text-black dark:text-white">
            Admin Dashboard
          </h1>
        </Link>
      )}

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 5
            ? "dark:bg-slate-800 bg-[#ddd3d3]"
            : "dark:bg-transparent "
        }`}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout size={20} className="text-black dark:text-white" />
        <h1 className="pl-2 800px:block hidden text-black dark:text-white">
          Log Out
        </h1>
      </div>
    </div>
  );
};

export default SideBarProfile;
