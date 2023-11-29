"use client";
import { style } from "../../../app/styles/styels";
import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import {
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route:string)=>void
};

const SignUp: FC<Props> = ({ setRoute }) => {

  const[register,{isError,data,error,isSuccess}] =useRegisterMutation()

  useEffect(()=>{
    if(isSuccess){
      const message=data?.message ||"Registration successful"
      toast.success(message)
      setRoute('VerificationOtp')
    }

     if(error){
      if('data' in error){
        const errorData=error as any
        toast.error(errorData.data.message)
      }
     }
  },[isSuccess,error])

  const [show, setShow] = useState<boolean>();
  const schema = Yup.object().shape({
    name: Yup.string().required("Enter your name please"),
    email: Yup.string()
      .email("Invalid email")
      .required("please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {

      const data={name, email, password }
      await register(data)
      setRoute('VerificationOtp')
    },
  });
  const { values, errors, touched, handleChange, handleSubmit } = formik;
  return (
    <div>
      <h1 className={`${style.title}`}>Join to ELearning</h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <label htmlFor="name" className={`${style.label}`}>
            Enter your name
          </label>
          <input
            type="text"
            name='name'
            value={values.name}
            onChange={handleChange}
            placeholder="badhon"
            className={`${style.input} ${
              errors.name && touched.name && "border-red-500"
            }`}
          />
        </div>
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}

        <div className="mt-3">
          <label htmlFor="email" className={`${style.label}`}>
            Enter your email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="sample@gmail.com"
            className={`${style.input} ${
              errors.email && touched.email && "border-red-500"
            }`}
          />
        </div>
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
              className="absolute bottom-3 z-1 cursor-pointer right-2"
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
          <input type="submit" value="Sign Up" className={`${style.button}`} />
        </div>
 
        <h5 className="text-center  pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer ml-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2 text-black dark:text-white " />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Already have an account ?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Login
          </span>
        </h5>
      </form>
    </div>
  );
};

export default SignUp;
