"use client"
import React,{useState,FC} from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Protected from '../hooks/useProtected'
import Profile from '../components/Profile/Profile'

type Props = {}

const page:FC<Props> = (props: Props) => {
    const [open,setOpen]=useState(false)
 const[activeItem,setActiveItem]=useState(0)
 const [route,setRoute]=useState('Login')
  return (
    <div>
        
     <Protected>
     <Heading
      title='profile'
      description='ELearning is a platform for student to learn get help from teachers'
      keyword='web development  programming javascript html css tailwind css'
      />
      <Header
      open={open}
      setOpen={setOpen}
      activeItem={activeItem}
      setRoute={setRoute}
      route={route}
      />
      <Profile/>
     </Protected>
</div>
  )
}

export default page