import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../userAnalytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { CircularProgress, Box } from "@mui/material";
import { PiUsersFourLight } from "react-icons/pi";
import OrderAnalytics from "../orderAnalytics/OrderAnalytics";
import AllInvoices from "../Allinvoices/Allinvoices";
import { useGetOrderAnalyticsQuery, useGetUserAnalyticsQuery } from "@/redux/features/analytics/courseAnalytics";

type Props = {
  value?: number;
  open?: boolean;
};

const CircularProgressWithLabel: FC<Props> = ({ value, open }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 90 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </Box>
  );
};

const Dashboard = ({ open }: Props) => {
  const [comparePercentage, setComparePercentage] = useState()
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>()
  const [userComparePercentage, setUserComparePercentage] = useState<any>()

  const {data,isLoading}=useGetUserAnalyticsQuery({})
  console.log(data,'kk')
  const {data:orderData ,isLoading:orderLoading }=useGetOrderAnalyticsQuery({})

  useEffect(()=>{
    if(isLoading&& orderLoading){
      return
    
    } else{
      if(data&&orderData){
        const userLastTwoMonths=data.users.last12Months.slice(-2)
        const orderLastTwoMonths=orderData.orders.last12Months.slice(-2)
        if(userLastTwoMonths.length===2 && orderLastTwoMonths.length===2){
          const userCurrentMonth=userLastTwoMonths[1].count
          const userPreviousMonth=userLastTwoMonths[0].count
          const orderCurrentMonth=orderLastTwoMonths[1].count
          const orderPreviousMonth=orderLastTwoMonths[0].count
          const userPercentage= userPreviousMonth !==0?((userCurrentMonth-userPreviousMonth)/userPreviousMonth)*100:100
          const orderPercentage= orderPreviousMonth!==0? ((orderCurrentMonth-orderPreviousMonth)/orderPreviousMonth)*100:100

          setUserComparePercentage({
            currentMonth:userCurrentMonth,
            previousMonth:userPreviousMonth,
            percentage:userPercentage
          })


          setOrdersComparePercentage({
            currentMonth:orderCurrentMonth,
            previousMonth:orderPreviousMonth,
            percentage:orderPercentage

          })
        }
      }
    }
  },[isLoading, orderLoading,data ,orderData])

  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UserAnalytics DashBoard={true} />
        </div>

        <div className="pt-[20px] pr-8">
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow p-2">
            <div className="flex items-center justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#45CBA0] text-black text-[30px]" />
                <h1 className="py-2 font-Poppins dark:text-white text-black text-[20px]">
                {ordersComparePercentage?.currentMonth}
                </h1>

                <h1 className=" py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px]">
                  Sales Obtained
                </h1>
              </div>
              <div>
                <CircularProgressWithLabel value={100} open={open} />
                <h1 className="text-center pt-4">{ordersComparePercentage?.percentage>0? '+' + ordersComparePercentage?.percentage.toFixed(2): '-' + ordersComparePercentage?.percentage.toFixed(2)}%</h1>
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-4">
            <div className="flex items-center p-2 justify-between">
              <div className="">
                <PiUsersFourLight className="dark:text-[#45CBA0] text-black text-[30px]" />
                <h1 className="py-2 font-Poppins dark:text-white text-black text-[20px]">
              {userComparePercentage?.currentMonth}
                </h1>
                <h1 className=" py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px]">
                  new Users
                </h1>
              </div>
              <div>
                <CircularProgressWithLabel value={100} open={open} />
                <h1 className="text-center pt-4">{userComparePercentage?.percentage>0? '+' + userComparePercentage?.percentage.toFixed(2): '-' + userComparePercentage?.percentage.toFixed(2)}%</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-[60%,40%]  mt-[10px]">
        <div className="dark:bg-[#111c43] w-[94%] mt-[15px]  min-h-[40vh] shadow m-auto">
             <OrderAnalytics DashBoard={true}/>
        </div>

        <div className="">
            <h3 className="dark:text-white text-black text-[20px] font-Poppins font-[400] pb-3">Recent Transaction</h3>

            <AllInvoices DashBoard={true}/>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
