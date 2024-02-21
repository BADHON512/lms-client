import React from 'react'
import CoursePlayer from '../admin/createCourse/CoursePlayer'
import { style } from '@/app/styles/styels'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import Loader from '../Loader/Loader'
import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi'

import Avatar from '../../../public/assets/avatar.jpg'
import Image from 'next/image'

type Props = {
    data: any
    id: string
    activeVideo: number,
    setActiveVideo: (activeVideo: number) => void
    userData: any
}

const CourseContentMedia = ({ data, setActiveVideo, activeVideo, id, userData }: Props) => {
    console.log(userData)
    const [activeBar, setActiveBAr] = React.useState(0)
    const [comment, setComment] = React.useState('')
    const { isLoading } = useGetCourseContentQuery(id)

    return (
        <>

            {isLoading ? (<Loader />) : (
                <>

                    <div className='w-[95%]  800px:w-[86%] py-4 m-auto'>

                        <CoursePlayer
                            title={data?.content[activeVideo]?.title}
                            videoUrl={data?.content[activeVideo]?.videoUrl} />
                        <div className="w-full flex items-center justify-between my-3">
                            <div className={`${style.button} !min-h-[40px] py-[unset] ${activeVideo === 0 && '!cursor-no-drop opacity-[.8]'} flex items-center !w-[190px]`}
                                onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}>
                                <AiOutlineArrowLeft className='mr-2' />{' '}
                                Previous Lesson
                            </div>

                            <div className={`${style.button} !min-h-[40px] !w-[190px] py-[unset] ${data?.content.length - 1 === activeVideo && '!cursor-no-drop opacity-[.8]'} flex items-center`}
                                onClick={() => setActiveVideo(data && data?.content?.length - 1 === 0 ? activeVideo : activeVideo + 1)}>
                                Next Lesson {' '}
                                <AiOutlineArrowRight className='mr-2' />
                            </div>
                        </div>

                        <h1 className='pt-2 text-[25px] font-[600] text-black dark:text-white'>{data?.content[activeVideo]?.title}</h1>
                        <br />
                        <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] shadow-inner">
                            {
                                ['Overview', 'Resources', 'Q&A', 'Review'].map((item, index) => (
                                    <h1 key={index} className={`800px:text-[20px] cursor-pointer ${activeBar === index && ' dark:text-red-500  text-black'}`}
                                        onClick={() => setActiveBAr(index)}>{item}</h1>
                                ))
                            }
                        </div>
                        <br />
                        {
                            activeBar === 0 && (
                                <h1 className='font-Poppins font-[400] to-black dark:text-white'>{data.content[activeVideo]?.description}</h1>
                            )
                        }
                        {
                            activeBar === 1 && (
                                <div>
                                    {
                                        data?.content[activeBar]?.link?.map((item: any, index: number) => (
                                            <div key={index} className="mb-5">
                                                <h1 className='800px:text-[28px] 800px:inline-block text-black dark:text-white'>{item?.title && item?.title + ':'}</h1>
                                                <a href={item?.url} className='inline-block text-[#4395c4] 800px:text-[20px] 800px: pl-2'>{item?.url}</a>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }

                        {
                            activeBar === 2 && (
                                <>
                                    <div className="flex w-full mt-3 gap-x-2">
                                        <Image src={userData && userData?.user?.avatar ? userData?.user?.avatar?.url : Avatar} alt='img not found' height={100} width={100}
                                            className='h-[50px] w-[50px] rounded-full object-cover' />

                                        <textarea name="" id="" cols={30} rows={5} value={comment} onChange={(e) => setComment(e.target.value)}
                                            className='outline-none bg-transparent  border border-[#ffffff57] 800px:w-full p-2 rounded  w-[90%] 800px:text-[18px] font-Poppins' placeholder='Write your comment here...'></textarea>


                                    </div>
                                    <div className="w-full flex justify-end">
                                        <div className={`${style.button} !w-[120px] !h-[40px] text-[18px] mt-5`}>
                                            Submit
                                        </div>
                                    </div>

                                    <br />

                                    <div className="w-full h-1 bg-[#ffffff3b]">
                                        <div className="">
                                            {/* comment reply */}
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </>
            )}
        </>
    )
}

export default CourseContentMedia