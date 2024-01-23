"use client";
import React, { FC } from "react";
import DashboardHeader from "./DashboardHeader";
import CreateCourse from "../components/admin/createCourse/CreateCourse";
import AllCourse from "../components/admin/createCourse/allCourse/AllCourse";

import ManageTeam from "../components/admin/ManageTeam/ManageTeam";
import GetAllUsers from "../components/admin/users/GetAllUsers";

type Props = {
  select: number;
  setSelect: (select: number) => void;
};

const DashboardHero: FC<Props> = ({ select, setSelect }) => {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      {select === 2 && <GetAllUsers />}
      {select === 4 && <CreateCourse />}

      {select === 5 && <AllCourse />}

      {select === 9 && <ManageTeam />}
    </div>
  );
};

export default DashboardHero;
