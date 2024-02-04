import { apiSlice } from "../api/apiSlice";

   

   const courseAnalytics= apiSlice.injectEndpoints({
       endpoints:(builder)=>({
        getCourseAnalytics:builder.query({
            query:()=>({
                url:'get-course-analytics',
                method:'GET',
                credentials: 'include' as const
            })
        })
       })
   })

  export const {useGetCourseAnalyticsQuery}=courseAnalytics