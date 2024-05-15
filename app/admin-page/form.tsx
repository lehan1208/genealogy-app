"use client"
import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import Box from "@mui/material/Box";
import {Avatar, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import Toastify from "toastify-js";
import NumberUtils from "@/app/1-common/2-utils/number.util";
import {isNil} from "lodash";

interface MemberInfoProps {
  id: string;
  image: string;
  label: string;
  type: string;
  dob: string;
  dod: string;
  pob: string;
  pod: string;
  burialPlace: string;
  bio: string[];
  level?: number;
  child?: MemberInfoProps[];
  sub?: MemberInfoProps[];
}

interface RelatedListProps {
  id: string;
  label: string;

}

export default function Form({memberInfo, list, familyTree}: {
  memberInfo: MemberInfoProps,
  list: RelatedListProps[],
  familyTree: MemberInfoProps[]
}) {
  const {register, getValues, reset, setValue, handleSubmit, control} = useForm();
  const [isNew, setIsNew] = useState(false)
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    if (!isNil(memberInfo)) {
      setIsNew(false)
    }
  }, [JSON.stringify(memberInfo)]);

  useEffect(() => {
    setValue("name", memberInfo.label)
    setValue("type", memberInfo.type)
    setValue("dob", memberInfo.dob ? dayjs(memberInfo.dob).toDate() : null)
    setValue("dod", memberInfo.dod ? dayjs(memberInfo.dod).toDate() : null)
    setValue("pob", memberInfo.pob)
    setValue("pod", memberInfo.pod)
    setValue("burialPlace", memberInfo.burialPlace)
    setValue("bio", memberInfo.bio?.join())
    setValue("image", memberInfo.image)
    setAvatar(memberInfo.image)
  }, [memberInfo])


  const onSubmit = (data: any) => {
    console.log(data);
    const payload = {
      ...data,
      label: data.name,
      dob: data.dob ? dayjs(data.dob).format("MM/DD/YYYY") : null,
      dod: data.dod ? dayjs(data.dod).format("MM/DD/YYYY") : null,
      bio: data.bio.split(". "),
      id: isNew ? NumberUtils.uuid() : memberInfo.id,
      sub: data?.sub || [],
      child: data?.child || [],
    }
    console.log("CHECK payload :=>>>>>>) ", payload);
    updateLocalStorageData(payload, familyTree)

    Toastify({
      text: `${isNew ? "New member has been added" : "Member has been updated"}`,
      duration: 3000,
      gravity: "bottom",
      position: "right",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  };

  const updateLocalStorageData = (data: any, familyTree:MemberInfoProps[]) => {
    const updateMemberInfo = (node:MemberInfoProps) => {
      if (isNew && node.id == data.relateTo) {
        if (["Wife", "Ex-Wife", "Husband"].includes(data.type)) {
          node.sub = node.sub ? [...node.sub, data] : [data];
        } else {
          node.child = node.child ? [...node.child, data] : [data];
        }
      } else if (node.id == memberInfo.id) {
        return {...node, ...data}
      }

      if (node.child && node.child.length > 0) {
        node.child = node.child.map((child) => updateMemberInfo(child))
      }

      if (node.sub && node.sub.length > 0) {
        node.sub = node.sub.map((sub) => updateMemberInfo(sub))
      }
      return node
    }

    const updatedFamilyTree = familyTree.map(updateMemberInfo)
    console.log("CHECK updatedFamilyTree :=>>>>>>) ", updatedFamilyTree);
    localStorage.setItem("familyData", JSON.stringify(updatedFamilyTree))
    setIsNew(false)
    setAvatar(null)
    reset()
  }

  const handleAvatarChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
      const imagePath = `images/${file.name}`
      setValue("image", imagePath)
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{padding: "16px", mx: "auto"}}
         className="form-management">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Controller
            name="name"
            control={control}
            defaultValue={memberInfo.label || ""}
            render={({field}) => (
              <TextField
                label="Name"
                fullWidth
                variant="standard"
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={3}>
          <Controller
            name="type"
            control={control}
            defaultValue={memberInfo.type || ""}
            render={({field}) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel>Type</InputLabel>
                <Select
                  {...field}
                  variant="standard"
                  label="Type"
                >
                  {["Wife", "Ex-Wife", "Husband", "Son", "Daughter"].map((item: string) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={3}>
          <Controller
            name="dob"
            control={control}
            defaultValue={null}
            render={({field}) => (
              <DatePicker
                className="w-full"
                maxDate={new Date()}
                placeholderText="Date of birth"
                selected={field.value}
                onChange={(date) => {
                  field.onChange(date)
                }}
                dateFormat="dd/MM/yyyy"
                customInput={<TextField label="Date of birth" fullWidth variant="standard"/>}
              />
            )}
          />
        </Grid>

        <Grid item xs={3}>
          <Controller
            name="dod"
            control={control}
            defaultValue={null}
            render={({field}) => (
              <DatePicker
                maxDate={new Date()}
                placeholderText="Date of death"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
                customInput={<TextField label="Date of death" fullWidth variant="standard"/>}
              />
            )}
          />
        </Grid>

        <Grid item xs={4}>
          <Controller
            name="pob"
            control={control}
            defaultValue={memberInfo.pob || ""}
            render={({field}) => (
              <TextField
                label="Place of Birth"
                fullWidth
                variant="standard"
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={4}>
          <Controller
            name="pod"
            control={control}
            defaultValue={memberInfo.pob || ""}
            render={({field}) => (
              <TextField
                label="Place of death"
                fullWidth
                variant="standard"
                {...field}
              />
            )}
          />
        </Grid>

        {isNew && <Grid item xs={4}>
          <Controller
            name="relateTo"
            control={control}
            defaultValue={""}
            render={({field}) => isNew && (
              <FormControl fullWidth variant="outlined">
                <InputLabel>Relate To</InputLabel>
                <Select
                  {...field}
                  variant="standard"
                  label="Relate To"
                >
                  {list.map((item: any) => (
                    <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>}

        <Grid item xs={12}>
          <Controller
            name="burialPlace"
            control={control}
            defaultValue={memberInfo.burialPlace || ""}
            render={({field}) => (
              <TextField
                label="Burial Place"
                fullWidth
                variant="standard"
                {...field}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="bio"
            control={control}
            defaultValue={memberInfo.bio?.join() || ""}
            render={(ctrl) =>
              <TextField
                label="Bio"
                fullWidth
                variant="standard"
                multiline
                rows={4}
                defaultValue={""}
                {...ctrl.field}
              />
            }
          />
        </Grid>

        <Grid item xs={12} sx={{marginTop: "60px", marginBottom: "24px"}}>
          <Controller
            name="image"
            defaultValue={memberInfo?.image || ""}
            control={control}
            render={(field) => (<>
              {(avatar || memberInfo?.image) && (
                <Avatar
                  src={avatar || getValues("image")}
                  alt="Avatar"
                  sx={{width: 100, height: 100, mb: 2}}
                />
              )}
              <input
                accept="image/*"
                id="avatar-upload"
                type="file"
                style={{display: "none"}}
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-upload">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  Upload Avatar
                </Button>
              </label></>)}/>


        </Grid>

        <Grid item xs={6}>
          <Box className="flex gap-4">
            <Button
              type="button"
              fullWidth
              disabled={isNew}
              variant="outlined"
              color="primary"
              className="w-[150px]"
              onClick={() => {
                setIsNew(true)
                reset({
                  name: "",
                  type: "",
                  dob: null,
                  dod: null,
                  burialPlace: "",
                  bio: "",
                  image: "",
                })
                setAvatar(null)
              }}
            >
              Create New
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="w-[150px]"
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
    ;
}


