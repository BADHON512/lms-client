'use client'
import React,{FC,useState} from 'react'
import SideBarProfile from './SideBarProfile'
import { useLogOutQuery } from '@/redux/features/auth/auth.api'
import {signOut} from 'next-auth/react'
import { redirect } from "next/navigation";
type Props = {
  user:any
}

const Profile:FC<Props> = ({user}) => {
  const [scroll,setScroll]=useState<boolean>(false)
  const [avatar,setAvatar]=useState(null)
  const [active,setActive]=useState(1)
  const [logout,setLogOut]=useState(false)
  const {}=useLogOutQuery(undefined,{
    skip:!logout?true:false
  })

  if(typeof window !=='undefined'){
    window.addEventListener('scroll',()=>{
      if(window.scrollY>85){
        setScroll(true)
      }else{
        setScroll(false)
      }
    })
  }

 const logOutHandler=async()=>{
  setLogOut(true)
   await signOut()

  redirect('/')
 


 }
  return (
    <div className='w-[85%] flex mx-auto'>
      <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 dark:border-[3px] border dark:border-[#ffffff1d] rounded-[5px] shadow-sm mt-[80px ] mb-[80px] ${scroll?'top-[120px]':'top-[30px]'} left-[30px] sticky`}>

        <SideBarProfile
        user={user}
        active={active}
        avatar={avatar}
        setActive={setActive}
        logOutHandler={logOutHandler}/>
      </div>
    </div>
  )
}

export default Profile