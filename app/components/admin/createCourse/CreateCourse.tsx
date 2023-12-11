import React,{useState} from 'react'
import CourseInfo from './CourseInfo'
import CourseOption from './CourseOption'

type Props = {}

const CreateCourse = (props: Props) => {
    const [Active, setActive] = useState(0)
    const [courseInfo,setCourseInfo]=useState({
        name:'',
        description:'',
        estimatedPrice:'',
        tags:'',
        level:'',
        demoUrl:'',
        thumbnail:''
    })

    const [benefits,setBenefits]=useState({title:''})
    const [prerequisites,setPrerequisites]=useState([{title:''}])
    const [courseContentData,setCourseContentData]=useState([{
        videoUrl:'',
        title:'',
        description:'',
        videoSection:'',
        link:[
            {
                title:'',
                url:'',
            }
        ],
        suggestion:'',
    }])
    const [courseData, setCourseData] = useState()
  return (
    <div className='w-full flex min-h-screen'>
        <div className='w-[80%] bg '>
            {
                Active===0&&(
                    <CourseInfo
                    courseInfo={courseInfo}
                    setCourseInfo={setCourseInfo}
                    Active={Active}
                    setActive={setActive}/>
                )
            }
        </div>
        <div className='w-[22%] mt-[60px] h-screen fixed z-[1] top-18 right-0 ' >
            <CourseOption Active={Active} setActive={setActive}/>
        </div>
    </div>
  )
}

export default CreateCourse