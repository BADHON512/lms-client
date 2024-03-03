'use client'
import React,{useState} from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Footer from '../components/footer/Footer'

type Props = {}

const Page = (props: Props) => {
    
    const [route, setRoute] = useState('Login')
    const [open, setOpen] = useState(false)
    return (
        <div className='min-h-screen'>
            <Heading
                title='About'
                description='Elearning is programming community'
                keyword='Programming community coding skills expert insights collaborating growth' />
            <Header
                route={route}
                setRoute={setRoute}
                open={open}
                setOpen={setOpen}
                activeItem={2} />

                <div className="w-full mb-8">
                    <h1 className='font-Poppins text-center text-[50px] mt-10 text-black dark:text-white'>What is <span className='text-gradient'>Programming</span></h1>

                 <div className="w-[95%] 800px:w-[90%] p-1 m-auto">

                 <p className='font-Poppins text-start text-[20px] mt-10 text-black dark:text-white'>Programming is the art of creating programs that can be run on a computer. Programming involves writing code, which is a set of instructions that tell a computer what to do. Programming can be done in many different languages, including C++, Java, Python, and JavaScript.</p>
<br />
            
                 <p className='font-Poppins text-start text-[20px] mt-10 text-black dark:text-white'>Programming involves writing code, which is a set of instructions that tell a computer what to do. Programming can be done in many different languages, including C++, Java, Python, and JavaScript.</p>

                 <p className='font-Poppins text-start text-[20px] mt-10 text-black dark:text-white'>Our YouTube channel is a treasure trove of informative videos on everything from programming basics to advanced techniques. But that's just the beginning. Our affordable courses are designed to give you the high-quality education you need to succeed in the industry, without breaking the bank.</p>

                 <p className='font-Poppins text-start text-[20px] mt-10 text-black dark:text-white'> we're a family. Our supportive community of like-minded individuals is here to help you every step of the way, whether you're just starting out or looking to take your skills to the next level.</p>
                 <p className='font-Poppins text-start text-[20px] mt-10 text-black dark:text-white'>Our courses and community will provide you with the guidance, support, and motivation you need to unleash your full potential and become a skilled programmer.</p>
                 <p className='font-Poppins text-start text-[20px] mt-10 text-black dark:text-white'>Are you ready to take your programming skills to the next level? Look no further than  the premier programming community dedicated to helping new programmers achieve their goals and reach their full potential.</p>
      


                 </div>

                 


                </div>
         <Footer/>
        </div>
    )
}

export default Page