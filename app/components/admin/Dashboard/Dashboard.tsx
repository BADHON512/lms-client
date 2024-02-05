import React, { FC } from "react";
import UserAnalytics from "../userAnalytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { CircularProgress, Box } from "@mui/material";
import { PiUsersFourLight } from "react-icons/pi";
import OrderAnalytics from "../orderAnalytics/OrderAnalytics";
import AllInvoices from "../Allinvoices/Allinvoices";

type Props = {
  value: number;
  open: boolean;
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
  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UserAnalytics DashBoard={true} />
        </div>

        <div className="pt-[80px] pr-8">
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow p-5">
            <div className="flex items-center justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#45CBA0] text-black text-[30px]" />
                <h1 className="py-2 font-Poppins dark:text-white text-black text-[20px]">
                  120
                </h1>

                <h1 className=" py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px]">
                  Sales Obtained
                </h1>
              </div>
              <div>
                <CircularProgressWithLabel value={100} open={open} />
                <h1 className="text-center pt-4">+120%</h1>
              </div>
            </div>
          </div>

          <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-8">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <PiUsersFourLight className="dark:text-[#45CBA0] text-black text-[30px]" />
                <h1 className="py-2 font-Poppins dark:text-white text-black text-[20px]">
                  450
                </h1>
                <h1 className=" py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px]">
                  new Users
                </h1>
              </div>
              <div>
                <CircularProgressWithLabel value={100} open={open} />
                <h1 className="text-center pt-4">+150%</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-[65%,35%]  mt-[20px]">
        <div className="dark:bg-[#111c43] w-[94%] mt-[30px]  h-[40vh] shadow m-auto">
             <OrderAnalytics DashBoard={true}/>
        </div>

        <div className="p-5">
            <h3 className="dark:text-white text-black text-[20px] font-Poppins font-[400] pb-3">Recent Transaction</h3>

            <AllInvoices DashBoard={true}/>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
