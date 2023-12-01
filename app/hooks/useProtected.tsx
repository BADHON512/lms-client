import { redirect } from "next/navigation";
import UserAuth from "./userAuth";
import React from "react";
 
type TYPE={
    children:React.ReactNode
}

export default function Protected({children}:TYPE){
    const isAuthenticated=UserAuth()
    return isAuthenticated? children: redirect('/')
}