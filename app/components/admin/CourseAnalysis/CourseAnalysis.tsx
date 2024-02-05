import { useGetCourseAnalyticsQuery } from "@/redux/features/analytics/courseAnalytics";
import React from "react";
import {
  Bar,
  BarChart,
  Label,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import Loader from "../../Loader/Loader";
import { style } from "@/app/styles/styels";

type Props = {};

const CourseAnalysis = (props: Props) => {
  const { data, isLoading, error } = useGetCourseAnalyticsQuery({});
  console.log(data);
  const analyticsData:any = [
    // { name: "jun 2023", uv: 3 },
    // { name: "Feb 2023", uv: 6 },
    // { name: "Mar 2023", uv: 4 },
    // { name: "Apr 2023", uv: 2 },
    // { name: "May 2023", uv: 7 },
    // { name: "Jun 2023", uv: 3 },
    // { name: "Jul 2023", uv: 9 },
    // { name: "Aug 2023", uv: 2 },
    // { name: "Sep 2023", uv: 1 },
    // { name: "Oct 2023", uv: 5 },
    // { name: "Nov 2023", uv: 2 },
    // { name: "Dec 2023", uv: 2 },
  ];

  data&& data?.course?.last12Months?.forEach((item:any,index:number)=>(
    analyticsData.push({name:item.month, uv:item.count})
  ))

  const minimumLength = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className={`${style.title} px-5 !text-start`}>
              Courses Analytics
            </h1>
            <p className={`${style.label} px-5`}>
              Last 12 months analytics data
            </p>
          </div>
          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minimumLength, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position={"top"}></LabelList>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalysis;
