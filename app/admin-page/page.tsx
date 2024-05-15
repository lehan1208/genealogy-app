'use client'
import Navbar from "@/app/1-common/1-layout/Navbar";
import GeneralInfo from "@/app/admin-page/generalInfo";
import MemberProvider from "@/app/1-common/3-context/member.context";

export default function AdminPage() {
  return (
    <MemberProvider>
      <Navbar />
      <GeneralInfo />
    </MemberProvider>
  )
}