import { useGetBannerQuery } from '@/redux/features/layout/layout.Api'
import React,{useState,useEffect}from 'react'
import { AiOutlinePause } from 'react-icons/ai'
import { HiMinus, HiPause, HiPlus } from 'react-icons/hi'

type Props = {}

const Faq = (props: Props) => {

    const {data}=useGetBannerQuery('FAQ')
    
  const [FAQ, setFAQ] = useState<any[]>([])
  console.log(FAQ)

  useEffect(() => {
    if (data) {
      setFAQ(data.layout[0].faq)
    }
  },[data] )

  const toggleHandle=(id:any)=>{
  setFAQ((pre)=>pre.map((faq)=>faq._id===id?{...faq,active:!faq.active}:faq))
  }
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
                        <h1  onClick={()=>toggleHandle(faq._id)} className='text-[20px] font-Poppins py-6 cursor-pointer dark:text-white text-black'>{faq.question}</h1>

                      {
                        faq.active&&(
                          <h1 className='text-[20px] font-Poppins py-6 dark:text-white text-black'>{faq.answer}</h1> 
                        )
                      }
                        
                        </div>
                      <div className='flex-shrink-0'>
                      {
                          faq.active?(  < HiMinus size={30} className="h-6 w-6 cursor-pointer dark:text-white text-black"  onClick={()=>toggleHandle(faq._id)} /> ):(
                            < HiPlus size={30} className="h-6 w-6 cursor-pointer dark:text-white text-black"  onClick={()=>toggleHandle(faq._id)} />
                          )
                        }
                      </div>
                    </div>
                </div>
            ))
        }
     
    </div>
  )
}

export default Faq