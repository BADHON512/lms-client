import React, { FC, use, useEffect, useState } from "react";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from 'socket.io-client'
import { useGetAllNotificationQuery, useUpdateNotificationMutation } from "@/redux/features/notification/notificationApi";
const ENDPOINT=process.env.NEXT_PUBLIC_SOCKET_SERVER_URI||''
const socketId=socketIO(ENDPOINT,{transports: ['websocket']})
import {format} from 'timeago.js'

type Props = {};

const DashboardHeader: FC<Props> = ({}) => {

  const {data,refetch}=useGetAllNotificationQuery(undefined,{refetchOnMountOrArgChange:true})
  const [updateNotification,{isSuccess}]=useUpdateNotificationMutation()
  const [notification, setNotification] = useState<any>([])
  const [audio]=useState(
    new Audio('https://res.cloudinary.com/djo5r2a5z/video/upload/v1709189141/course/lms%20notification%20audio/error-2-126514_ajiluu.mp3')
  )

  const playerNotificationSound=( )=>{
    audio.play()
  }
  useEffect(( )=>{
    if(data){
      setNotification(data.notification.filter((item:any)=>item.status==='unread'))
    }
    if(isSuccess){
      refetch()
    }
    audio.load()
  },[data,isSuccess])

  useEffect(()=>{
    socketId.on('newNotification',(data:any)=>{
    refetch()
      playerNotificationSound()
    })
  },[])
  const handleNotificationStatusChange= async(id:string)=>{
    await updateNotification(id)
  }
    const [Open, setOpen] = useState(false);
  return (
    <div className="min-h-[10vh]">
      <div className="w-full flex items-center justify-end p-6 fixed z-[999999] top-0 right-0 ">
        <ThemeSwitcher />
        <div
          onClick={() => setOpen(!Open)}
          className="relative cursor-pointer m-2 "
        >
          <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
          <span className="absolute -top-2 -right-2 bg-blue-300 rounded-full w-[20px] text-[12px] flex items-center justify-center dark:text-white text-black">
           {notification?.length}
          </span>
        </div>
        {Open && (
          <div className="w-[350px] min-h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16  rounded p-5">
            <h1 className="text-center text-[20px] font-Poppins text-black dark:text-white">
              Notification
            </h1>

             {
              notification?.map((item:any,index:any)=>(
                <div key={index} className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#fffffff4] border-b-[#0000000f] mt-1">
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black dark:text-white">
                    {item.title}
                  </p>
  
                  <p className="text-black dark:text-white cursor-pointer"
                  onClick={()=>handleNotificationStatusChange(item._id)}>
                    Mark as read
                  </p>
                </div>
                <p className="px-2 text-black dark:text-white">
                {item.message}
                </p>
                <p className="px-2 text-black dark:text-white">{format(item.createdAt)}</p>
              </div>
              ))

             }

      

        
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
