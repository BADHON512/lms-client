import { apiSlice } from "../api/apiSlice";

export const notification=apiSlice.injectEndpoints({
    endpoints:(builder)=>({

        getAllNotification:builder.query({
            query:()=>({
                url: 'get-all-notification',
                method: 'GET',
                credentials: 'include' as const
            }),

        }),
        
        updateNotification:builder.mutation({
            query:(id)=>({
                url: `notification-update/${id}`,
                method: 'PUT',
                credentials: 'include' as const

            })
        })
    })
})

export const {useGetAllNotificationQuery,useUpdateNotificationMutation}=notification;