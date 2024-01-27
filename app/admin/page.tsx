"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import AdminSideBar from "../components/admin/sidebar/AdminSideBar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "./DashboardHero";

type Props = {};

const page = (props: Props) => {
  const [select, setSelect] = useState<number>();
  return (
    <AdminProtected>
      <Heading
        title="Elearning -Admin"
        description="ELearning is a platform for student  to learn and get help from teachers"
        keyword="Programming mern stack redux machine learning"
      />

      <div className="flex min-h-[100vh] ">
        <div className=" w-[20%] 1500px:w-[20%]  mr-1 duration-300">
          <AdminSideBar select={select} setSelect={setSelect} />
        </div>
        <div className="w-[80%]">
          <DashboardHero select={select} setSelect={setSelect} />
        </div>
      </div>
    </AdminProtected>
  );
};

export default page;
