'use client'

import React, {FC, useState } from 'react'
import Heading from './utils/Heading'
import Header from './components/Header'
import Hero from './components/Route/Hero'


interface Props {}
const Page :FC<Props> = () => { 
 const [open,setOpen]=useState(false)
 const[activeItem,setActiveItem]=useState(0)
  return (
    <div>
      <Heading
      title='ELearning'
      description='ELearning is a platform for student to learn get help from teachers'
      keyword='web development  programming javascript html css tailwind css'
      />
      <Header
      open={open}
      setOpen={setOpen}
      activeItem={activeItem}
      />

      <Hero/>
    </div>
  )

}


export default Page