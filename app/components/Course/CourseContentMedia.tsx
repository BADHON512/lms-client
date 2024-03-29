import React, { useEffect, useState } from 'react'
import CoursePlayer from '../admin/createCourse/CoursePlayer'
import { style } from '@/app/styles/styels'
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai'
import Loader from '../Loader/Loader'
import { useAddNewQuestionMutation, useAddReviewsMutation, useGetCourseContentQuery, useGetCourseDetailsQuery, useQuestionReplyMutation, useReviewsReplyMutation } from '@/redux/features/courses/coursesApi'

import Avatar from '../../../public/assets/avatar.jpg'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { format } from 'timeago.js'
import { BiMessage } from 'react-icons/bi'
import Ratings from '@/app/utils/Ratings'
import socketIO from 'socket.io-client'
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || ''
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] })

type Props = {
    data: any
    id: string
    activeVideo: number,
    setActiveVideo: (activeVideo: number) => void
    userData: any
    refetch: any
}

const CourseContentMedia = ({ data, setActiveVideo, activeVideo, id, userData, refetch }: Props) => {


    const [activeBar, setActiveBAr] = React.useState(0)
    const [comment, setComment] = React.useState('')
    const { isLoading } = useGetCourseContentQuery(id)
    const [rating, setRating] = useState<number>()
    const [review, setReview] = useState('')

    const [addNewQuestion, { error: addQuestionError, isSuccess: addQuestionSuccess, isLoading: QuestionLoading }] = useAddNewQuestionMutation()
    const [questionReply, { error: questionReplyError, isSuccess: questionReplySuccess }] = useQuestionReplyMutation()
    const [answer, setAnswer] = useState('')
    const [questionId, setQuestionId] = useState('')
    const [reviewReplyId, setReviewReplyId] = useState('')
    const [FX, setFX] = useState('')



    const [addReviews, { isSuccess: reviewsSuccess, error: reviewsError }] = useAddReviewsMutation()
    const { data: courseData, error: courseError, isSuccess: courseSuccess, refetch: courseRefetch } = useGetCourseDetailsQuery(id, { refetchOnMountOrArgChange: true })
    const [ReviewsReply, { isSuccess: ReviewsReplySuccess, error: ReviewsReplyError }] = useReviewsReplyMutation()
    const userRatingsIsExist = courseData?.course?.reviews?.find((item: any) => item.user._id === userData.user._id)



    const handelCommentSubmit = () => {

        if (comment.length === 0) {
            toast.error("Question can't empty")
        } else {
            addNewQuestion({ courseId: id, contentId: data.content[activeVideo]._id, question: comment })
        }
    }


    useEffect(() => {
        if (addQuestionSuccess) {
            setComment(' ')
            refetch()
            toast.success('Question added successfully')
            socketId.emit('notification', {
                title: 'New Question Received',
                message: ` you have a new question in ${data.content[activeVideo].title}`,
                user: userData.user._id


            })
        }


        if (addQuestionError) {
            if ('data' in addQuestionError) {
                const eme = addQuestionError as any
                toast.error(eme.data.message)
            }
        }

    }, [addQuestionSuccess, addQuestionError])

    useEffect(() => {
        if (questionReplySuccess) {
            setAnswer('')

            refetch()
            toast.success('answer added successfully')
            if (userData.user.role !== 'admin') {
                socketId.emit('notification', {
                    title: 'New new Received',
                    message: ` you have a new question reply in ${data.content[activeVideo].title}`,
                    user: userData.user._id

                })
            }
        }

        if (questionReplyError) {
            if ('data' in questionReplyError) {
                const eme = questionReplyError as any
                toast.error(eme.data.message)

            }
        }
    }, [questionReplySuccess, questionReplyError])

    useEffect(() => {
        if (reviewsSuccess) {
            setReview(' ')
            courseRefetch()
            toast.success('your review added successfully')
            socketId.emit('notification', {
                title: 'New Review Received',
                message: ` you have a new Review in ${data.content[activeVideo].title}`,
                user: userData.user._id

            })
        }



        if (reviewsError) {
            if ('data' in reviewsError) {
                const eme = reviewsError as any
                toast.error(eme.data.message)
            }
        }
    }, [reviewsSuccess, reviewsError])


    useEffect(() => {
        if (ReviewsReplySuccess) {

            setFX('')
            courseRefetch()
            toast.success('Review reply added successfully')
        }



        if (ReviewsReplyError) {
            if ('data' in ReviewsReplyError) {
                const eme = ReviewsReplyError as any
                toast.error(eme.data.message)
            }
        }
    }, [ReviewsReplySuccess, ReviewsReplyError])


    const handelAnswerSubmit = async () => {
        await questionReply({ answer, questionId, courseId: id, contentId: data.content[activeVideo]._id })
    }

    const userRatings = courseData && [...courseData?.course?.reviews].reverse()
    const handelReviewsSubmit = () => {

        if (review === '') {
            toast.error("Review can't be empty")
        } else {
            addReviews({ id, review, rating })

        }




    }

    const handelReplyReviewSubmit = () => {

        if (FX === '') {
            toast.error("Reply can't be empty")
        } else {
            ReviewsReply({ comment: FX, courseId: id, reviewId: reviewReplyId })
        }
    }
    return (
        <>

            {isLoading ? (<Loader />) : (
                <>

                    <div className='w-[95%]  800px:w-[86%] py-4 m-auto min-h-screen'>

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
                                        data?.content[activeVideo]?.link?.map((item: any, index: number) => (
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
                                            className='outline-none bg-transparent  border border-[#000000d8] 800px:w-full p-2 rounded dark:border-[#ffffff57]  w-[90%] 800px:text-[18px] font-Poppins' placeholder='Write your comment here...'></textarea>


                                    </div>
                                    <div className="w-full flex justify-end">
                                        <div className={`${style.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${QuestionLoading && 'cursor-no-drop'}`} aria-disabled={comment === ''} onClick={() => handelCommentSubmit()}>
                                            Submit
                                        </div>
                                    </div>

                                    <br />

                                    <div className="w-full ">
                                        <div className="">
                                            <CommentReply
                                                data={data}
                                                activeVideo={activeVideo}
                                                answer={answer}
                                                handelAnswerSubmit={handelAnswerSubmit}
                                                user={userData.user}
                                                setAnswer={setAnswer}
                                                setQuestionId={setQuestionId} />
                                        </div>
                                    </div>


                                </>
                            )
                        }
                        {
                            activeBar === 3 && (
                                <div className="w-full">
                                    {userRatingsIsExist ? (
                                        <h1 className='text-black dark:text-white w-full text-center font-Poppins text-[20px]'>Your rating has been submitted</h1>
                                    ) : (
                                        <div className="flex w-full">
                                            <Image src={userData && userData?.user?.avatar ? userData?.user?.avatar?.url : Avatar} alt='img not found' height={100} width={100}
                                                className='h-[50px] w-[50px] rounded-full object-cover' />
                                            <div className="w-full">
                                                <h1 className='pl-3 text-[20px] font-[500] dark:text-white text-black'> Give a Rating <span className='text-red-600'>*</span></h1>

                                                <div className="flex w-full ml-2 pb-3">
                                                    {[1, 2, 3, 4, 5].map((i) => (
                                                        rating >= i ? (
                                                            <AiFillStar key={i} className='mr-1 cursor-pointer'
                                                                color='rgb(246,186,0)'
                                                                size={25}
                                                                onClick={() => setRating(i)} />
                                                        ) : (<AiOutlineStar key={i} className='mr-1 cursor-pointer'
                                                            color='rgb(246,186,0)'
                                                            size={25}
                                                            onClick={() => setRating(i)} />)
                                                    ))

                                                    }
                                                </div>
                                                <textarea name="" id="" cols={30} rows={5} value={review} onChange={(e) => setReview(e.target.value)}
                                                    className='outline-none bg-transparent  border border-[#ffffff57] dark:border-[#ffffff57] 800px:w-full p-2 rounded  w-[90%] 800px:text-[18px] font-Poppins' placeholder='Write your comment here...'></textarea>
                                                <div className="w-full flex justify-end">
                                                    <div onClick={handelReviewsSubmit} className={`${style.button}  !w-[120px] !h-[40px] text-[18px] mt-5`}>
                                                        Submit
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {
                                        userRatings.map((item: any, index: number) => (
                                            <Review key={index} item={item} index={index} setReviewReplyId={setReviewReplyId} handelReplyReviewSubmit={handelReplyReviewSubmit}
                                                setFX={setFX}
                                                FX={FX} />
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </>
            )}
        </>
    )
}

const Review = ({ item, index, setReviewReplyId, FX, setFX, handelReplyReviewSubmit }: any) => {
    const [replyRatingOf, serReplyRatingOf] = useState(false)
    const [RelyReview, setReplyReview] = useState()

    useEffect(() => {
        setFX(RelyReview)
    }, [RelyReview])

    return (
        <div className="w-full" key={index}>
            <div className="w-full flex gap-x-5">
                <Image src={item ? item?.user?.avatar?.url : Avatar} alt='img not found' height={100} width={100}
                    className='h-[50px] w-[50px] rounded-full object-cover' />

                <div className="w-full">
                    <h1 className='800px:text-[20px] text-black dark:text-white'>{item?.user?.name}</h1>

                    <Ratings rating={item.rating} />
                    <p className='800px:text-[15px] text-black dark:text-white'>{item?.comment}</p>
                    <small className=' text-black dark:text-white' > {format(item.createdAt ? item.createdAt : ' 0 day')}</small>
                    <p onClick={() => {
                        serReplyRatingOf(!replyRatingOf)
                        setReviewReplyId(item._id)
                    }} className='800px:text-[15px] w-min cursor-pointer text-black dark:text-white'>{replyRatingOf ? 'Hide' : 'Reply'}</p>
                </div>

            </div>
            <br />

            {
                replyRatingOf && (
                    <>
                        {
                            item.commentReplies.map((reply: any, index: number) => (
                                <div key={index} className='flex gap-x-2 ml-10 mt-5 '>
                                    <Image src={reply ? reply.user.avatar.url : Avatar} alt='img not found' height={100} width={100}
                                        className='h-[50px] w-[50px] rounded-full object-cover' />

                                    <div>
                                        <h1 className='  text-black dark:text-[#c9f06f] font-Poppins'>{reply.user.name}</h1>
                                        <p className=' text-[17px] text-black dark:text-white font-Poppins'>{reply.comment}</p>
                                    </div>
                                </div>
                            ))
                        }
                        <br />
                        <div className="w-full flex relative">
                            <input type="text"
                                placeholder='Enter your reply...'
                                value={RelyReview}
                                onChange={(e: any) => setReplyReview(e.target.value)}
                                className='block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:border-white  text-black dark:text-white w-[90%]' />
                            <button type="submit" className='absolute right-20 bottom-1  text-black dark:text-white' onClick={handelReplyReviewSubmit} >Submit</button>

                        </div></>



                )

            }
            <br />

        </div>
    )
}


const CommentReply = ({ answer, setQuestionId, activeVideo, data, setAnswer, handelAnswerSubmit, }: any) => {
    return (
        <>
            <div className="w-full h-full">
                {data?.content[activeVideo]?.questions.map((item: any, index: number) => (
                    <CommentItem

                        key={index}
                        item={item}
                        answer={answer}
                        setQuestionId={setQuestionId}
                        setAnswer={setAnswer}
                        handelAnswerSubmit={handelAnswerSubmit}
                        activeVideo={activeVideo}
                        data={data}

                    />
                ))}
            </div>
        </>
    )
}

const CommentItem = ({ answer, setQuestionId, activeVideo, data, setAnswer, handelAnswerSubmit, item }: any) => {
    const [replyActive, setReplyActive] = useState(false)

    return (
        <>
            <div className="my-4">
                <div className="flex mb-2">
                    <Image src={item.user.avatar ? item.user.avatar.url : Avatar} alt='img not found' height={100} width={100}
                        className='h-[50px] w-[50px] rounded-full object-cover' />
                    <div className="pl-3">
                        <h1 className='text-[20px]  text-black dark:text-white '>{item?.user?.name}</h1>
                        <p className='text-black dark:text-white'>{item.question}</p>
                        <small className=' text-black dark:text-white' > {format(item.createdAt ? item.createdAt : ' 0 day')}</small>
                    </div>
                </div>

                <div className="w-full flex">
                    <span className='800px:pl-16  text-black dark:text-white cursor-pointer mr-2' onClick={() => {
                        setReplyActive(!replyActive)
                        setQuestionId(item._id)
                    }}>{!replyActive ? item?.questionReplies?.length !== 0 ? 'All Reply' : 'Add Reply' : 'Hide Reply'}</span>
                    <BiMessage size={20} className='cursor-pointer text-black dark:text-white' />
                    <span className='pl-1 mt-[-4px] cursor-pointer text-black dark:text-white' >{item.questionReplies.length}</span>
                </div>

                {
                    replyActive && (
                        <>
                            {
                                item.questionReplies.map((reply: any) => (
                                    <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white" key={reply._id}>
                                        <div className="">
                                            <Image src={reply.user.avatar ? reply.user.avatar.url : Avatar} alt='img not found' height={100} width={100}
                                                className='h-[50px] w-[50px] rounded-full object-cover' />
                                        </div>
                                        <div className="pl-3">
                                            <h1 className='text-[20px]  text-black dark:text-white '>{reply?.user?.name}</h1>
                                            <p className='text-black dark:text-white'>{reply.answer}</p>
                                            <small className='text-[#ffffff83] text-black dark:text-white' > {format(reply.createdAt ? reply.createdAt : ' 0 day')}</small>
                                        </div>


                                    </div>
                                ))
                            }

                            <div className="wf-full flex relative">
                                <input type="text"
                                    placeholder='Enter your reply...'
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    className='block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:border-white  text-black dark:text-white w-[90%]' />
                                <button type="submit" className='absolute right-10 bottom-1  text-black dark:text-white' onClick={handelAnswerSubmit} disabled={answer === ""}>Submit</button>
                            </div>
                            <br />
                        </>
                    )
                }
            </div>
        </>
    )
}
export default CourseContentMedia