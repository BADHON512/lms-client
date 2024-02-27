'use client'
import { useGetAllCoursesForUsersQuery } from '@/redux/features/courses/coursesApi'
import { useGetBannerQuery } from '@/redux/features/layout/layout.Api'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import Header from '../components/Header'
import Heading from '../utils/Heading'
import { style } from '../styles/styels'
import CourseCart from '../components/Course/CourseCart'

type Props = {}

const Page = (props: Props) => {
    const searchParams = useSearchParams()
    const search = searchParams?.get('title')
    const { data, isLoading: L, refetch } = useGetBannerQuery("Category", {
        refetchOnMountOrArgChange: true,
    });
    console.log(data)


    const { data: coursesData, isLoading } = useGetAllCoursesForUsersQuery({})

    const [route, setRoute] = useState('Login')
    const [open, setOpen] = useState(false)
    const [courses, setCourses] = useState([])
    const [category, setCategory] = useState('All')

    useEffect(() => {
        if (category === 'All') {
            setCourses(coursesData?.course)

        }
        if (category !== 'All') {
            setCourses(
                coursesData?.course?.filter((course: any) => course.categories === category)
            )
        }
        if (search) {
            setCourses(coursesData?.course?.filter((course: any) => course.name.toLowerCase().includes(search.toLowerCase())))

        }
    }, [search, coursesData, category])

    const handelC = (value: string) => {

        setCategory(value)

    }
    return (
        <div>

            {
                isLoading ? (<Loader />) : (
                    <>

                        <Header
                            route={route}
                            setRoute={setRoute}
                            open={open}
                            setOpen={setOpen}
                            activeItem={1} />

                        <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
                            <Heading
                                title='All course Elearning'
                                description='Elearning is programming community'
                                keyword='Programming community coding skills expert insights collaborating growth' />
                            <br />
                            <div className="w-full flex items-center flex-wrap">
                                <div className={`${category === 'All' ? 'bg-[crimson]' : 'bg-[#5050cb]'} h-[35px] m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                                    onClick={() => handelC('All')}>
                                    All
                                </div>
                                {data?.layout[0]?.categories.map((item: any, index: number) => (
                                    <div key={index} className={`h-[35px] ${category === item.title ? 'bg-[crimson]' : 'bg-[#5050cb]'}  m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`} onClick={() => handelC(item.title)}>
                                        {item.title}
                                    </div>
                                ))}
                            </div>

                            {courses && courses.length === 0 && (
                                <p className={`${style.label} flex justify-center items-center min-h-[50vh] `}>
                                    {search ? 'No courses found' : 'No Courses found in this category. Please try another one!'}
                                </p>
                            )}
                            <br />
                            {
                                <div className="grid  grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[30px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">

                                    {
                                        courses && courses.map((item, index) =>
                                            <CourseCart key={index} course={item} />


                                        )
                                    }
                                </div>
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Page