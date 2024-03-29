"use client"
import { Inter, Josefin_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { FC, useEffect } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";

import socketIO from 'socket.io-client'
const ENDPOINT=process.env.NEXT_PUBLIC_SOCKET_SERVER_URI||''
const socketId=socketIO(ENDPOINT,{transports: ['websocket']})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin_Sans",
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin_sans.variable} !bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300 bg-no-repeat`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
             <Custom> {children}</Custom>
              <Toaster position="bottom-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}


const Custom:FC<{children:React.ReactNode}>=({children})=>{
  useEffect(()=>{
    socketId.on('connection',()=>{
      
    })
  },[])
  const {isLoading}=useLoadUserQuery({})
  return <>
  {
    isLoading?<Loader/>:<>{children}</>
  }</>
}