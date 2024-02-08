import { apiSlice } from "../api/apiSlice";

const ordersApi= apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getOrders:builder.query({
            query:()=>({
                url:'get-all-orders',
                methods:'GET',
                credentials: 'include' as const 

            })
        
         
        })
    })
})

export const {useGetOrdersQuery}= ordersApi