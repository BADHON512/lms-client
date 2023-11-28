import { style } from "@/app/styles/styels";
import { type } from "os";
import React, { FC, useRef, useState } from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";

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
    console.log("first");
  };

  const handelInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index > 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
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
      <div className="w-[70%] m-auto flex items-center justify-around">
      {
      Object.keys(verifyNumber).map((key,index)=>(
      <input type="number" key={key} ref={inputRefs[index]}
      className={`w-[65px] h-[65px] bg-transparent border-[3px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${invalidError?'shake border-red-500':'dark:border-white border-[#0000004a]'}`}
      placeholder=""
      maxLength={1}
      value={verifyNumber[key as keyof VerifyNumber]}
      onChange={(e)=>handelInputChange(index,e.target.value)}/>))
      }
      </div>
    </div>
  );
};

export default VerificationOtp;
