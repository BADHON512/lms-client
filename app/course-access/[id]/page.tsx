'use client'
import CourseComponent from '@/app/components/Course/CourseComponent'
import Loader from '@/app/components/Loader/Loader'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
    params: any
}

const Page = ({ params }: Props) => {

    const id = params.id

    const { isLoading, error, data } = useLoadUserQuery(undefined, {})
    console.log(data)
    useEffect(() => {
        if (data) {
            const isPurchased = data?.user?.courses?.find((item: any) => item._id === id)
            if (!isPurchased) {
                redirect('/')
            }
        }
        if (error) {

            redirect('/')
        }
    }, [data, error])
    Loader

    return (
 <>
 {
    isLoading ? <Loader/> : (
        <div>
            <CourseComponent id={id}/>
        </div>
    )
}

 </>

  )
}

export default Page