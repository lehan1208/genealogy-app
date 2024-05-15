'use client';

import {Grid, Box, Paper} from "@mui/material";
import TreeView from "@/app/admin-page/treeView";
import {useState} from "react";
import {isNil} from "lodash";
import Form from "@/app/admin-page/form";

export default function GeneralInfo() {
  const [memberInfo, setMemberInfo] = useState<any>({})
  const getMemberInfo = (data: any) => {
    if (!isNil(data)) {
      setMemberInfo(data)
    }
  }
  let familyTree :any = null
  if (typeof window !== 'undefined') {
     familyTree = JSON.parse(localStorage.getItem("familyData") || "[]")
  }


  let result:any[] = [];

  const convertArray = (data:any[]) => {
    data.forEach(item => {
      result.push({
        id: item.id.toString(),
        label: item.name || item.label,
      });
      if (item.sub) {
        convertArray(item.sub);
      }
      if (item.child) {
        convertArray(item.child);
      }
    });
  };

  convertArray(familyTree);

  return (
    <Box sx={{ flexGrow: 1 }} marginTop={3}>
      <Grid container spacing={1} className="">
        <Grid item xs={3} className='h-[550px] overflow-auto'>
          <TreeView getMemberInfo={getMemberInfo} familyTree={familyTree}/>
        </Grid>
        <Grid item xs={9} className='h-[550px]'>
          <Form memberInfo={memberInfo} list={result} familyTree={familyTree}/>
        </Grid>
      </Grid>
    </Box>
  );
}