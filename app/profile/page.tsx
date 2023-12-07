"use client"
import React,{useState,FC} from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Protected from '../hooks/useProtected'
import Profile from '../components/Profile/Profile'
import { useSelector } from 'react-redux'

type Props = {
  user:any
}

const page:FC<Props> = () => {
    const [open,setOpen]=useState(false)
 const[activeItem,setActiveItem]=useState(5)
 const [route,setRoute]=useState('Login')
 const {user}=useSelector((state:any)=>state.auth)
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
      <Profile
      user={user}/>
     </Protected>
</div>
  )
}

export default page