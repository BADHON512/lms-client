import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi'
import React,{useState} from 'react'
import Loader from '../Loader/Loader'
import Heading from '@/app/utils/Heading'
import CourseContentMedia from './CourseContentMedia'
import Header from '../Header'
import CourseContentList from '@/app/course/CourseContentList'

type Props = {
    id:string
    data:any
}

const CourseComponent = ({id,data:userData}: Props) => {
    const {data ,error,isLoading}=useGetCourseContentQuery(id)
    const [open, setOpen] = React.useState(false)
    const [route, setRoute] = React.useState('Login')
    console.log(data)
    const [activeVideo, setActiveVideo] = useState<number>(0)
  return (
    <>
    {
      isLoading?(<Loader/>):(
     <> 
        <Header activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
        <div className='w-full grid 800px:grid-cols-10'>
        <Heading title={data?.content[0].title}
        description='course access page'
        keyword={data?.content[0].tags}/>

        <div className="col-span-7">
          <CourseContentMedia
          data={data}
          id={id}
          activeVideo={activeVideo}
          setActiveVideo={setActiveVideo}
          userData={userData}/>
        </div>
        <div className="hidden 800px:block 800px:col-span-3">
          <CourseContentList
          setActiveVideo={setActiveVideo}
          data={data.content}
          activeVideo={activeVideo}/>
        </div>
        </div></>
      ) 
    }
    </>
  )
}

export default CourseComponent