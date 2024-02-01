import React,{useState,FC, useEffect} from 'react'
import { AiOutlineCamera } from 'react-icons/ai'

type Props = {}

const HeroCustomize = (props: Props) => {
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    
//  useEffect(()=>{
//     if(data){
//         setTitle(data?.layout?.banner?.title)
//         setSubTitle(data?.layout?.banner?.subTitle)
//         setImage(data?.layout?.banner?.image?.url)
//     }
//  },[data])
 const handleUpdate = (e:any) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
        setImage(reader.result as string)
    }
 }
  return (
    <div className='mt-[200px]'>
        <div className='w-full 1000px:flex items-center'>
            <div className="absolute  1000px:top-[unset] 1500px:w-[700px]  1100px:h-[500px] 1100px:w-[500px] w-[50vh] h-[50vh] hero_animation rounded-[50%] 1100px:left-[18rem] 1500px:left-[21rem]">
                <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0px] z-[10]">
                <div className="relative flex items-center justify-end">
                
                <img src={image} alt="image not found"
                className='object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]' />
                <input type="file" 
                id='banner'
                accept='image/*'
                onChange={handleUpdate}
                className='hidden'/>
                <label htmlFor="banner" className='cursor-pointer absolute bottom-0 right-0 z-20'>
                <AiOutlineCamera className='dark:text-white text-base text-[18px] cursor-pointer'/>
                </label>

                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroCustomize