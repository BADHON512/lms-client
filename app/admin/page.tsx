"use client"
import React from "react";
import Heading from "../utils/Heading";
import AdminSideBar from "../components/admin/sidebar/AdminSideBar";
import AdminProtected from "../hooks/adminProtected";

type Props = {};

const page = (props: Props) => {
  return (
 
    <AdminProtected>
    <Heading
        title="Elearning -Admin"
        description="ELearning is a platform for student  to learn and get help from teachers"
        keyword="Programming mern stack redux machine learning"
      />

      <div className="flex h-[100vh]">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSideBar />
        </div>
      </div>
    </AdminProtected>
    
  );
};

export default page;
