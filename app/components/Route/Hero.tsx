import React ,{FC}from 'react'
import Image from 'next/image'

type Props = {}

const Hero:FC<Props> = ({}) => {
  return (
    <div className='w-full 1000px:flex items-center'>
<div className='absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px]  1100px:w-[600px] h-[50vh] w-[50vh] hero_animation'>
    <div className='1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10'>
        <Image src={require('../../../public/assets/banner.jpg')} alt='img not found'/>

    </div>
</div>

    </div>
  )
}

export default Hero