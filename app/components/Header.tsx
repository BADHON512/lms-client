"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItem from "../utils/NavItem";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import VerificationOtp from "./Auth/VerificationOtp";
import { useSelector } from "react-redux";
import avatar from "../../public/assets/avatar.jpg";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useLogOutQuery, useSocialAuthMutation } from "@/redux/features/auth/auth.api";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const { user } = useSelector((state: any) => state.auth);
  const {data}=useSession()
  const [socialAuth,{isSuccess,error}]=useSocialAuthMutation()
  const [logout,setLogOut]=useState(false)
  const {}=useLogOutQuery(undefined,{
    skip:!logout?true:false
  })


useEffect(()=>{
  if(!user){
    if(data){
      socialAuth({
        name:data?.user?.name,
        email:data?.user?.email,
        avatar:data?.user?.image
      })
    }
  }

  if(error){
    toast.error('Something went wrong')
  }
  if(data===null){
    if(isSuccess){
      toast.success("Login successfully")
    }
  }
  // if(data===null&&user){
  //   setLogOut(true)
  // }


},[user,data])
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll ", () => {
      if (window.scrollY > 80) {
        setActive(true);
        console.log(window.scrollY);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };
  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark: to-black fixed top-0 left-0 w-full h-[80px] border-b dark:border-[#ffffff]"
            : "w-full border-b dark: border-[#3b3a3afc] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <Link
              href={"/"}
              className=" text-black dark:text-white font-Poppins font-[500] text-[25px]"
            >
              ELearning
            </Link>

            <div className="flex items-center">
              <NavItem activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />

              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  className="cursor-pointer dark:text-white text-black"
                  size={25}
                  onClick={() => setOpenSidebar(true)}
                />
              </div>

              {user&&user ? (
                <Link href={"/profile"}>
                  <Image
                   src={user.avatar|| avatar?user.avatar.url||avatar:avatarDefault}
                   height={30}
                   width={30}
                    alt="img not found"
                    className="h-[30px] w-[30px] rounded-full cursor-pointer"
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  className="hidden 800px:block cursor-pointer dark:text-white text-black"
                  size={25}
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
        {/* mobile sidebar */}

        {openSidebar && (
          <div
            className=" 800px:hidden fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[99999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItem activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright &copy; 2023 ELearning
              </p>
            </div>
          </div>
        )}
      </div>

      {/* LoginModel */}

      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              // activeItem={activeItem}
              Component={Login}
            />
          )}
        </>
      )}

      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              // activeItem={activeItem}
              Component={SignUp}
            />
          )}
        </>
      )}

      {route === "VerificationOtp" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              // activeItem={activeItem}
              Component={VerificationOtp}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
