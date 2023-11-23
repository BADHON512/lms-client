"use client"
import React ,{useState}from 'react'

type Props = {
    open:boolean,
    setOpen:(open:boolean)=>void,
    activeItem:number
}

const Header = (props: Props) => {
    const [active,setActive]=useState(false)
    const [openSidebar,setOpenSidebar]=useState(false)

    if(typeof window !=='undefined'){
        if(window.scrollY>80){
            setActive(true)
        }else{
            setActive(false)
        }
    }
  return (
    <div  className='w-full relative'>
      <div className={`${active? 'dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark: to-black fixed top-0 left-0 w-full h-[80px] border-b dark:border-[#ffffff]':'w-full border-b dark: border-[#fffffffc] h-[80px] z-[80] dark:shadow'}`}>

      <div className='w-[95%] 800px:w-[92%] m-auto py-2 h-full'>
        <div className='w-full h-[80px]'>

        </div>

      </div>
      </div>
    </div>
  )
}

export default Header