'use client';

import {Grid, Box, Paper} from "@mui/material";
import TreeView from "@/app/admin-page/treeView";
import {useEffect, useState} from "react";
import {isNil} from "lodash";
import Form from "@/app/admin-page/form";
import {useMemberContext} from "@/app/1-common/3-context/member.context";

export default function GeneralInfo() {
  const [memberInfo, setMemberInfo] = useState<any>({})
  const {familyDataTree} = useMemberContext()

  const getMemberInfo = (data: any) => {
    if (!isNil(data)) {
      setMemberInfo(data)
    }
  }

  let result:any[] = [];

  const convertArray = (data:any[]) => {
    data?.forEach(item => {
      result.push({
        id: item.id.toString(),
        label: item.name || item.label,
      });
      if (item.sub) {
        convertArray(item.sub);
      }
      if (item.children) {
        convertArray(item.children);
      }
    });
  };

  convertArray(familyDataTree|| []);

  return (
    <Box sx={{ flexGrow: 1 }} marginTop={3}>
      <Grid container spacing={1} className="">
        <Grid item xs={3} className='h-[550px] overflow-auto'>
          <TreeView getMemberInfo={getMemberInfo} familyTree={familyDataTree}/>
        </Grid>
        <Grid item xs={9} className='h-[550px]'>
          <Form memberInfo={memberInfo} list={result} familyTree={familyDataTree}/>
        </Grid>
      </Grid>
    </Box>
  );
}