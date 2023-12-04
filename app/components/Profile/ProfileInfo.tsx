import React,{FC,useState ,useEffect} from 'react'
import Image from 'next/image'
import avatarDefault from "../../../public/assets/avatar.jpg";
import { AiFillCamera, AiOutlineCamera } from 'react-icons/ai';
import { style } from '@/app/styles/styels';

type Props = {
    avatar:any
    user:any
}

const ProfileInfo:FC<Props>= ({avatar,user}) => {
    const [name,setName]=useState(user&&user.name)

    const imageHandler=(e:any)=>{
        console.log('first')}

        const handleSubmit=(e:any)=>{
            console.log('first')
        }
  return (
    <div>
        <div className='w-full flex justify-center'>

            <div className='relative'>
                <Image src={user.avatar||avatar? user.avatar|| avatar:avatarDefault} alt='img not found' className='w-[120px] h-[120px] rounded-full border-[3px] border-[#37a39a] '/>

                <input type="file" name="" id="avatar"
                className='hidden'
                onChange={imageHandler}
                accept='' />

                <label htmlFor="avatar">
                <AiOutlineCamera size={20}  className='absolute bottom-3 right-2 cursor-pointer bg-black rounded-full p-[1px]'/>
                </label>
            </div>
        </div>

        <div className='w-full pl-6 800px:pl-10'>

            <form action="" onSubmit={handleSubmit}>
                <div className='800px:w-[50%] m-auto block pb-4'>
                    <div className='w-[100%]'>
                        <label htmlFor="" className='block pb-2'>Full Name</label>
                        <input type="text"
                        required
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className={`${style.input} !w-[95%] mb-4 800px:mb-0`} />
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ProfileInfo