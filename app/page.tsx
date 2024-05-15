"use client"
import {GeneralInfo} from "@/app/components/GeneralInfo";
import {Box} from "@mui/system";
import BioInfo from "@/app/components/BioInfo"
import familyData from "./data/familyData.json";
import Footer from "@/app/components/Footer";
import MemberTree from "@/app/components/MemberTree";
import MemberProvider, {useMemberContext} from "@/app/1-common/3-context/member.context";

export default function Home() {

  return (
    <MemberProvider>
      <Box className="h-screen">
        <GeneralInfo/>
        <BioInfo/>
        <MemberTree />
        <Footer/>
      </Box>
    </MemberProvider>
  );
}
