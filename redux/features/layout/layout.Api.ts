import { apiSlice } from "../api/apiSlice";

const layOutApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getBanner:builder.query({
            query:()=>({
                url:"/banner",
                method:"GET",
                credentials:"include" as const
        })
        })
    })
})


export const {useGetBannerQuery}=layOutApi;

