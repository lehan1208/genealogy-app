"use client"
import {Box} from "@mui/system";
import BasicInfo from "@/app/components/BasicInfo";
import Navbar from "@/app/1-common/1-layout/Navbar";

export function GeneralInfo() {

  return (
    <div className="navbar">
      <Box className="w-full py-[16px] lg:mx-auto background-container text-white">
        <Navbar/>
        <BasicInfo/>
      </Box>
    </div>
  )
}