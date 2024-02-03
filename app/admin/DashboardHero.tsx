"use client";
import React, { FC, useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import CreateCourse from "../components/admin/createCourse/CreateCourse";
import AllCourse from "../components/admin/createCourse/allCourse/AllCourse";

import ManageTeam from "../components/admin/ManageTeam/ManageTeam";
import GetAllUsers from "../components/admin/users/GetAllUsers";
import EditCourse from "../components/admin/createCourse/EditCourse/EditCourse";
import HeroCustomize from "../components/admin/Hero/HeroCustomize";
import EditFaQ from "../components/admin/Faq/EditFaQ";
import EditCategories from "../components/admin/categorise/EditCategorise";

type Props = {
  select: number;
  setSelect: (select: number) => void;
};

const DashboardHero: FC<Props> = ({ select, setSelect }) => {
  const [EditCourseID, setEditCourseID] = useState<string>("");

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      {select === 2 && <GetAllUsers />}
      {select === 4 && <CreateCourse />}

      {select === 5 && (
        <AllCourse setSelect={setSelect} setEditCourseID={setEditCourseID} />
      )}

      {select === 6 && <HeroCustomize />}
      {select === 7 && <EditFaQ />}
      {select === 8 && <EditCategories />}
      {select === 9 && <ManageTeam />}
      {select === 88 && <EditCourse EditCourseID={EditCourseID} />}
    </div>
  );
};

export default DashboardHero;
