import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getAllCourses: builder.query({
      query: () => ({
        url: "get-all-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getAllCoursesForUsers: builder.query({
      query: () => ({
        url: "get-all-course",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourseById: builder.mutation({
      query: (id) => ({
        url: `course-delete/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    courseUpdateById: builder.mutation({  
      query: ({id,data}) => ({
        url: `course-edit/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,

      })
    })
  }),
});

export const { useCreateCourseMutation, useGetAllCoursesQuery,useDeleteCourseByIdMutation,useCourseUpdateByIdMutation,useGetAllCoursesForUsersQuery } = courseApi;
