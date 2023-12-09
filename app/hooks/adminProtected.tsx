import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

interface Protected {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: Protected) {
  const { user } = useSelector((state: any) => state.auth);
 
  if (user) {
    const isAdmin = user?.role === "admin";
    return isAdmin ? children : redirect("/");
  }
}
