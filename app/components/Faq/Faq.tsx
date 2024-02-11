import { useGetBannerQuery } from '@/redux/features/layout/layout.Api'
import React,{useState,useEffect}from 'react'
import { AiOutlinePause } from 'react-icons/ai'
import { HiPause, HiPlus } from 'react-icons/hi'

type Props = {}

const Faq = (props: Props) => {

    const {data}=useGetBannerQuery('FAQ')
    
  const [FAQ, setFAQ] = useState<any[]>([])

  useEffect(() => {
    if (data) {
      setFAQ(data.layout[0].faq)
    }
  },[data] )
  return (
    <div className='w-[90%] m-auto'>
        <br />
        <br />
        <h1 className='text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl dark:text-white text-black 800px:leading-[60px] font-[700] tracking-tight'>Frequently Asked Questions</h1>
        <br />

        {
            FAQ.map((faq,index)=>(
                <div key={index} 
                className={`${index}  border-[gray] border-t w-full`}>
                    <div className=" w-full flex gap-x-2 items-center justify-between">
                        <div>
                        <h1 className='text-[20px] font-Poppins py-6'>{faq.question}</h1>

                        <h1 className='text-[20px] font-Poppins py-6'>answer {faq.answer}</h1> 
                        
                        </div>
                         < HiPlus size={30}/>
                    </div>
                </div>
            ))
        }
     
    </div>
  )
}

export default Faq