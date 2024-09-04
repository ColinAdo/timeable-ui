"use client";

import { useVerify } from "@/hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SetUp() {
  useVerify();
  return <ToastContainer />;
}
