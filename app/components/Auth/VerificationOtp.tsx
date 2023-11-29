import { style } from "@/app/styles/styels";
import { useActivationMutation } from "@/redux/features/auth/auth.api";

import React, { FC, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const VerificationOtp: FC<Props> = ({ setRoute }) => {
  const {token}=useSelector((state:any)=>state.auth)
  const [activation,{isSuccess,error}]=useActivationMutation()
  console.log('first', token)

 useEffect(()=>{
  if(isSuccess){
    toast.success('Account activated successfully')
  }
  if(error){
    if('data' in error){
      const errorData=error as any
      toast.error(errorData.data.message)
      setInvalidError(true)

    }else{
      console.log('An error occurrent',error)
    }
  }
 },[isSuccess,error])
  
 
  const [invalidError, setInvalidError] = useState<boolean>();
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const verificationHandler = async () => {
   const verificationNumber= Object.values(verifyNumber).join("")
   console.log('verificationNumber', verificationNumber)
   if(verificationNumber.length !==4){
    setInvalidError(true)
    return
   }
   await activation({
    activation_token:token,
    activation_code:verificationNumber
   })
  };

  const handelInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
  console.log(process.env.NEXT_PUBLIC_SERVER_URI)
  return (
    <div>
      <h1 className={`${style.title}`}>Verify Your Account</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px]  rounded-full bg-[#497DF2] flex items-center justify-center">
        <VscWorkspaceTrusted size={40}/>
        </div>
      </div>
      <br />
      <div className=" m-auto flex items-center justify-around">
      {
      Object.keys(verifyNumber).map((key,index)=>(
      <input type="number" key={key} ref={inputRefs[index]}
      className={`w-[65px] h-[65px] bg-transparent border-[3px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${invalidError?'shake border-red-500':'dark:border-white border-[#0000004a]'}`}
      placeholder=""
      pattern="[0-9]*"
      maxLength={1}
      value={verifyNumber[key as keyof VerifyNumber]}
      onChange={(e)=>handelInputChange(index,e.target.value)}/>))
      }
      </div>
      <br />
      <div className="w-full flex justify-center">
        <button className={`${style.button}`} onClick={verificationHandler}>Verify OTP</button> 
        </div>
        <br />
        <h3 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">Go back to ?
        <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={()=>setRoute('Login')}>sign in</span>
        </h3>
     
    </div>
  );
};

export default VerificationOtp;
