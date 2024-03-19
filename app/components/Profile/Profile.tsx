"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/redux/features/auth/auth.api";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import EnrolledCourse from "./EnrolledCourse";
import { useGetAllCoursesForUsersQuery } from '@/redux/features/courses/coursesApi'

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState<boolean>(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogOut] = useState(false);
  const [courses, setCourses] = useState([]);
  console.log(courses)
  const { } = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const { data, isLoading } = useGetAllCoursesForUsersQuery({})

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  const logOutHandler = async () => {
    setLogOut(true);
    signOut();

  };
  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses.map((userCourse: any) => data?.course.find((course: any) => course._id === userCourse._id))
      setCourses(filteredCourses)
    }
  }, [data])
  return (
    <div className="w-[85%] flex mx-auto min-h-screen">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 dark:border-[3px] border dark:border-[#ffffff1d] rounded-[5px] shadow-sm mt-[80px] mb-[80px] ${scroll ? "top-[120px]" : "top-[30px]"
          } left-[30px] sticky`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>

      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword user={user} />
        </div>
      )}
      {active === 3 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <EnrolledCourse user={user}
            courses={courses}

          />
        </div>
      )}
    </div>
  );
};

export default Profile;
