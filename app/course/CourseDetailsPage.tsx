
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi'
import React,{useState} from 'react'
import Loader from '../components/Loader/Loader'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Footer from '../components/footer/Footer'
import CourseDetails from './CourseDetails'

type Props = {
    id:string
}

const CourseDetailsPage = ({id}: Props) => {
    const [route, setRoute] = useState('Login')
    const [open, setOpen] = useState(false)

    const { data,isLoading,error}=useGetCourseDetailsQuery(id)
    console.log(data)
  return (
    <>
    {
        isLoading? (<Loader/>):(
            <div>
                <Heading
                title={data.course.name + '- Elearning'}
                description='Elearning is programming community which is developed by badhon for helping programmers'
                keyword={data?.course?.tags}
                />
                <Header
                
                route={route}
                setRoute={setRoute}
                open={open}
                setOpen={setOpen}
                activeItem={1}/>
                <CourseDetails data={data.course}/>

                <Footer/>
            </div>
        )
    }
    </>
  )
}

export default CourseDetailsPage