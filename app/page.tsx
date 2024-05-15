"use client"
import {GeneralInfo} from "@/app/components/GeneralInfo";
import {Box} from "@mui/system";
import BioInfo from "@/app/components/BioInfo"
import familyData from "./data/familyData.json";
import Footer from "@/app/components/Footer";
import MemberTree from "@/app/components/MemberTree";
import MemberProvider, {useMemberContext} from "@/app/1-common/3-context/member.context";

export default function Home() {
  const {memberInfo, setMemberInfo} = useMemberContext()
  const familyMembers = JSON.parse(JSON.stringify(familyData));
  const familyTreeData = JSON.parse(localStorage.getItem("familyData") || "[]")
  setMemberInfo(familyTreeData)

  return (
    <MemberProvider>
      <Box className="h-screen">
        <GeneralInfo/>
        <BioInfo data={familyMembers}/>
        <MemberTree data={familyTreeData}/>
        <Footer/>
      </Box>
    </MemberProvider>
  );
}
