import { useEditLayoutMutation, useGetBannerQuery } from '@/redux/features/layout/layout.Api'
import React, { useEffect, useState } from 'react'
import Loader from '../../Loader/Loader'
import { style } from '@/app/styles/styels'

type Props = {}

const EditCategories = (props: Props) => {
    const {data,isLoading}=useGetBannerQuery('Categories',{refetchOnMountOrArgChange:true})
    const [editLayout,{isSuccess,error}]=useEditLayoutMutation()
    const [categories, setCategories] = useState<any[]>()


    useEffect(( )=>{

    },[])
  return (
    <>
    {
        isLoading?(<Loader/>):<div className='mt-[120px] text-center'>

            <h1 className={`${style.title}`}>All Categories</h1>

        </div>
    }
    </>
  )
}

export default EditCategories