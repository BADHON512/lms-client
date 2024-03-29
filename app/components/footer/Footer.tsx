import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className='w-[95%] m-auto border-t border-[gray]'>
    <br />
    <div className='flex   flex-col 800px:flex-row 800px:justify-evenly  gap-5'>
        <div className=" w-full 800px:w-[190px] flex flex-col gap-y-3 ">
            <h1 className='font-Poppins  font-[400] text-[25px] text-gradient'>About</h1>
            <Link href={'/our-story'} className='font-Poppins font-[400] text-[20px] text-[#8a8686] hover:text-white cursor-pointer transition delay-150 duration-300 ease-in-out '>Our Story</Link>
            <Link href={'/policy'} className='font-Poppins font-[400] text-[20px] text-[#8a8686] hover:text-white cursor-pointer transition delay-150 duration-300 ease-in-out '>Privacy Policy</Link>
            <Link href={'/faq'} className='font-Poppins font-[400] text-[20px] text-[#8a8686] hover:text-white cursor-pointer transition delay-150 duration-300 ease-in-out  '>FAQ</Link>
        </div>

        <div className="w-full 800px:w-[190px] flex flex-col gap-y-3 ">
            <h1 className='font-Poppins font-[400] text-[25px] text-gradient'>Quick Links</h1>
            <Link href={'/courses'} className='font-Poppins font-[400] text-[20px] text-[#8a8686] hover:text-white cursor-pointer transition delay-150 duration-300 ease-in-out '>Courses</Link>
            <Link href={'/my-account'} className='font-Poppins font-[400] text-[20px] text-[#8a8686] hover:text-white cursor-pointer transition delay-150 duration-300 ease-in-out '>my Account</Link>
            <Link href={'/dashboard'} className='font-Poppins font-[400] text-[20px] text-[#8a8686] hover:text-white cursor-pointer transition delay-150 duration-300 ease-in-out '>Course Dashboard</Link>
        </div>
        <div className="w-full 800px:w-[190px] flex flex-col gap-y-3 ">
            <h1 className='font-Poppins font-[400] text-[25px] text-gradient'>Social Links</h1>
            <Link href={'/our-story'} className='font-Poppins font-[400] text-[20px] text-[#8a8686] hover:text-white cursor-pointer transition delay-150 duration-300 ease-in-out '>Youtube</Link>
            <Link href={'/policy'} className='font-Poppins font-[400] text-[20px] text-[#8a8686] hover:text-white cursor-pointer transition delay-150 duration-300 ease-in-out '>Instagram</Link>
            <Link href={'/faq'} className='font-Poppins font-[400] text-[20px] text-[#8a8686] hover:text-white cursor-pointer transition delay-150 duration-300 ease-in-out '>github</Link>
        </div>
        <div className="w-full 800px:w-[220px] ">
        <h1 className='font-Poppins font-[400] text-[25px] text-gradient'>Newsletter</h1>
        <br />
        <p className='text-[20px] font-Poppins text-[#dac8c8] tracking-tight '> stay up to date with everything related to our brad and gain invaluable insights for your programming journey by subscribing to our newsletter.</p>
        </div>
    
    </div>
    </div>
  )
}

export default Footer