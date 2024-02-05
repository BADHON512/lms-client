import { useGetOrderAnalyticsQuery } from "@/redux/features/analytics/courseAnalytics";
import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
    DashBoard?: boolean;
  };
const OrderAnalytics = (props: Props) => {
  const analyticsData:any= [
    // { name: "Page A", uv: 590 },
    // { name: "Page B", uv: 868 },
    // { name: "Page C", uv: 1397 },
    // { name: "Page D", uv: 180 },
    // { name: "Page E", uv: 120 },
    // { name: "Page F", uv: 100 },
  ];

  const { data, isLoading, error } = useGetOrderAnalyticsQuery({});


  data &&
    data?.orders?.last12Months?.forEach((item: any, index: number) =>
      analyticsData.push({ name: item.month, uv: item.count })
    );

  return (
    <div className=" ">
      <div>
        <h1 className="text-center text-[28px] my-[20px]">Order analytics</h1>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={analyticsData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderAnalytics;
