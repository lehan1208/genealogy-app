"use client"

import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {Avatar, Link} from "@mui/material";

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

  const members: MemberProps = {
    name: "John Lewis",
    dob: "January 1, 1980",
    dod: "",
    avatarUrl: "images/john-lewis.jpg",
  }

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
          alt={members.name}
          src={members.avatarUrl}
          sx={{width: 200, height: 200}}
        />
      </div>
      <div>
        <Typography variant="h2" gutterBottom>
          {members.name.toUpperCase()}
        </Typography>
        <Typography variant="h5" className="tracking-widest">
          {`${members.dob} - ${members.dod || "Present"}`}
        </Typography>
        <Typography variant="h5" className="tracking-widest">
          {`Age ${calculateAge(members.dob, members.dod)}`}
        </Typography>
      </div>
    </div>
  )
}