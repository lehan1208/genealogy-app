"use client"
import React, {useEffect, useState} from "react";
import {Paper, Grid, TextField, ImageList, ImageListItem, Button} from "@mui/material";
import {isNil} from "lodash"
import Typography from "@mui/material/Typography";
import {UnfoldLess, UnfoldMore} from "@mui/icons-material";

export default function BioInfo(props: any): React.JSX.Element {
  const [renderImgList, setRenderImgList] = useState<any[]>([])
  const [isShowBio, setIsShowBio] = useState<boolean>(false)
  useEffect(() => {
    if (!isNil(props.data)) {
      const data = props.data[0]
      let arr: any[] = []
      data.sub.forEach((member: any) => {
        return arr.push({
          name: member.name,
          image: member.image,
        })
      })
      data.child.forEach((member: any) => {
        return arr.push({
          name: member.name,
          image: member.image,
        })
      })
      setRenderImgList(arr)
    }

  }, [props.data])

  const renderBioContent = () => {
    if (!isNil(props.data)) {
      // console.log("CHECK props.data :=>>>>>>) ", props.data);
      return (
        <div className="p-4 mb-[36px]">
          {props.data[0].bio.map((p: string, i: number) => (
            <Typography variant="body2" className="mt-3 text-lg" key={i}>{p}</Typography>
          ))}
        </div>
      )
    }
  }

  return (
    <div className="bio-info">
      <Button className="show-bio-button h-[56px] w-[160px] text-white rounded-3xl bg-[#d8220c]" variant="contained" onClick={() => setIsShowBio(!isShowBio)}
        sx={{
          "&:hover":{backgroundColor: "#ea5947"}
        }}
      >
        <span className="mr-2 rotate-45">
          {isShowBio ? <UnfoldLess/> : <UnfoldMore/>}
        </span>
        <Typography className="mr-1">
          {isShowBio ? "HIDE BIO" : "SHOW BIO"}</Typography>
      </Button>
      {isShowBio && (
        <Paper elevation={0} className="w-3/4 mx-auto mt-[40px] transition ease-in-out duration-700">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="place-of-birth-input"
                label="PLACE OF BIRTH"
                defaultValue="New York, US"
                variant="filled"
                className="w-full"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="place-of--input"
                label="PLACE OF DEATH"
                defaultValue="New York, US"
                variant="filled"
                className="w-full"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-read-only-input"
                label="PLACE OF BIRTH"
                defaultValue="New York, US"
                variant="filled"
                className="w-full"
              />
            </Grid>
          </Grid>

          <ImageList sx={{marginTop: "50px"}} gap={10} rowHeight={161} cols={10} className="h-[180px] items-center">
            {renderImgList.map((item) => (
              <ImageListItem key={item.image} sx={{width: "161px"}}>
                <img
                  srcSet={`${item.image}?w=161&h=161&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.image}?w=161&h=161&fit=crop&auto=format`}
                  alt={item.name}
                  loading="lazy"
                  width={161}
                  className="rounded object-cover transition-transform transform hover:scale-110 duration-500 ease-in-out"
                />
              </ImageListItem>
            ))}
          </ImageList>
          {renderBioContent()}
        </Paper>
      )}
    </div>
  )
}

