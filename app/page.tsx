"use client"
import {GeneralInfo} from "@/app/components/GeneralInfo";
import {Box} from "@mui/system";
import BioInfo from "@/app/components/BioInfo"
import familyData from "./data/familyData.json";
import Footer from "@/app/components/Footer";
import MemberTree from "@/app/components/MemberTree";

export default function Home() {
  const familyMembers = JSON.parse(JSON.stringify(familyData));
  if (typeof window !== "undefined") {
    localStorage.setItem("familyData", JSON.stringify(familyMembers))
  }

  return (
    <Box className="h-screen">
      <GeneralInfo/>
      <BioInfo data={familyMembers}/>
      <MemberTree data={familyMembers}/>
      <Footer/>
    </Box>
  );
}
