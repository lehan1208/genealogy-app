"use client"

import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {Avatar, Link} from "@mui/material";
import {useMemberContext} from "@/app/1-common/3-context/member.context";
import dayjs from "dayjs";
import DateTimeUtils from "@/app/1-common/2-utils/date.util";

export default function BasicInfo(): React.JSX.Element {

  return (
    <div className="flex flex-col items-center justify-center my-12 p-8 text-white ">
      <Breadcrumbs aria-label="breadcrumb" className="text-white"
        sx={{
          "& .MuiBreadcrumbs-separator": {
            fontSize: "26px",
          }
        }}
      >
        <Link underline="hover" color="inherit" href="#">
          <Typography color="inherit" variant="h6">HOME</Typography>
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="#"
        >
          <Typography color="inherit" variant="h6">FAMILY</Typography>
        </Link>
      </Breadcrumbs>
      <MemberInfo/>
    </div>
  )
}

interface MemberProps {
  name: string,
  dob: string,
  dod: string,
  avatarUrl: string
}

export function MemberInfo(): React.JSX.Element {
  const {memberInfo} = useMemberContext()

  const calculateAge = (dob: string, dod: string) => {
    const dateOfBirth = new Date(dob);
    const dateOfDeath = dod ? new Date(dod) : new Date();
    const ageDiff = dateOfDeath.getTime() - dateOfBirth.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="flex flex-row justify-center items-center gap-10 pt-10 z-[2]">
      <div className="avatar">
        <Avatar className="border-solid border-4 border-white"
          alt={memberInfo?.label || memberInfo?.name}
          src={memberInfo.image}
          sx={{width: 200, height: 200}}
        />
      </div>
      <div>
        <Typography variant="h3" gutterBottom>
          {memberInfo.label?.toUpperCase()}
        </Typography>
        <Typography variant="h6" className="tracking-widest">
          {`${DateTimeUtils.formatDate(memberInfo.dob)} - ${DateTimeUtils.formatDate(memberInfo.dod) || "Present"}`}
        </Typography>
        <Typography variant="h6" className="tracking-widest">
          {`(Age ${calculateAge(memberInfo.dob, memberInfo.dod)})`}
        </Typography>
      </div>
    </div>
  )
}