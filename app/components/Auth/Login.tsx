"use client";
import { style } from "../../../app/styles/styels";
import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { AiOutlineEyeInvisible, AiOutlineEye, AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";



type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(6),
});

const Login: FC<Props> = ({setRoute,setOpen}) => {
  const [login,{isSuccess,error,data}]=useLoginMutation()

 useEffect(()=>{
  if(isSuccess){
    toast.success(data.message||"Login successfully")
    setOpen(false)
  }
  if(error){
    if("data" in error){
      const errorData= error as any
      toast.error(errorData.data.message)
    }
  }
 },[error])

  const [show, setShow] = useState<boolean>();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
       login({email,password})
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div>
      <h1 className={`${style.title}`}>Login with ELearning</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className={`${style.label}`}>
          Enter your Email
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="sample@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            style.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}

        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${style.label}`}>
            Enter your password
          </label>
          <input
            type={show ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password!@%"
            id="password"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${style.input}`}
          />

          {show ? (
            <AiOutlineEye
              className="fixed bottom-3 z-1 cursor-pointer right-2"
              size={20}
              onClick={() => setShow(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 z-1 cursor-pointer right-2"
              size={20}
              onClick={() => setShow(true)}
            />
          )}
        
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}

        <div className="w-full mt-5">
            <input type="submit" value="Login" 
            className={`${style.button}`}/>
        </div>


        <h5 className="text-center  pt-4 font-Poppins text-[14px] text-black dark:text-white">
            Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
            <FcGoogle size={30} className='cursor-pointer ml-2' onClick={()=>signIn('google')}/>
                <AiFillGithub size={30} className='cursor-pointer ml-2 text-black dark:text-white'onClick={()=>signIn('github')} />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]">Not have any account ? <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={()=>setRoute('Sign-Up')}>Sign up</span></h5>
      </form>
    </div>
  );
};

export default Login;
