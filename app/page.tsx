"use client";

import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Course from "./components/Course/Course";
import ReviewPeople from "./components/Review/ReviewPeople";
import Faq from "./components/Faq/Faq";

interface Props {}
const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="ELearning"
        description="ELearning is a platform for student to learn get help from teachers"
        keyword="web development  programming javascript html css tailwind css"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />

      <Hero />

      <Course />
      <ReviewPeople />
      <br />
      <Faq/>
    </div>
  );
};

export default Page;
