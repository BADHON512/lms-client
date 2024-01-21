"use client";
import React, { FC } from "react";
import DashboardHeader from "./DashboardHeader";
import CreateCourse from "../components/admin/createCourse/CreateCourse";
import AllCourse from "../components/admin/createCourse/allCourse/AllCourse";

type Props = {
  select: number;
  setSelect: (select: number) => void;
};

const DashboardHero: FC<Props> = ({ select, setSelect }) => {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      {select === 4 && <CreateCourse />}

      {select === 5 && 
      <AllCourse/>}
    </div>
  );
};

export default DashboardHero;
