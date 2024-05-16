"use client"
import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import Box from "@mui/material/Box";
import {
  Avatar,
  Button, Checkbox,
  FormControl, FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import Toastify from "toastify-js";
import NumberUtils from "@/app/1-common/2-utils/number.util";
import {isEmpty} from "lodash";
import {useMemberContext} from "@/app/1-common/3-context/member.context";

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
  children?: MemberInfoProps[];
  sub?: MemberInfoProps[];
}

interface RelatedListProps {
  id: string;
  label: string;

}

// @ts-ignore
export default function Form({memberInfo, list, familyTree, setMemberInfo}: {
  memberInfo: MemberInfoProps,
  list: RelatedListProps[],
  familyTree: MemberInfoProps[],
  setMemberInfo: (data: any) => void
}) {
  const {getValues, reset, setValue, handleSubmit, control, formState: {errors}} = useForm();
  const [isEdit, setIsEdit] = useState(false)
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
  const [onlyYear, setOnlyYear] = useState(false)

  const {setFamilyDataTree} = useMemberContext()
  useEffect(() => {
    if (!isEmpty(memberInfo)) {
      setOnlyYear(!memberInfo?.dod?.includes("/"))
      setIsEdit(true)
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

  const unSave = (data: any) => {
    console.log("UNSAVE", data)
  }

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      label: data.name,
      dob: data.dob ? dayjs(data.dob).format("MM/DD/YYYY") : null,
      dod: data.dod ? onlyYear ? data.dod?.toString() : dayjs(data.dod).format("MM/DD/YYYY") : null,
      bio: data.bio?.split(". "),
      id: !isEdit ? NumberUtils.uuid() : memberInfo.id,
      sub: !isEdit ? [] : memberInfo?.sub,
      children: !isEdit ? [] : memberInfo?.children,
    }
    console.log("CHECK payload :=>>>>>>) ", payload);
    updateLocalStorageData(payload, familyTree)

    Toastify({
      text: `${!isEdit ? "New member has been added" : "Member has been updated"}`,
      duration: 3000,
      gravity: "bottom",
      position: "right",
      style: {
        borderRadius: "4px",
        fontFamily: "'Arial', sans-serif",
        fontSize: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        background: "white",
        borderLeft: "10px solid #96c93d",
        color: "#000",
      },
    }).showToast();
  };

  const updateLocalStorageData = (data: any, familyTree: MemberInfoProps[]) => {
    const updateMemberInfo = (node: MemberInfoProps) => {
      if (!isEdit && node.id == data.relateTo) {
        if (["Wife", "Ex-Wife", "Husband"].includes(data.type)) {
          node.sub = node.sub ? [...node.sub, data] : [data];
        } else {
          node.children = node.children ? [...node.children, data] : [data];
        }
      } else if (isEdit && node.id == memberInfo.id) {
        return {...node, ...data}
      }

      if (node.children && node.children?.length > 0) {
        node.children = node.children.map((child) => updateMemberInfo(child))
      }

      if (node.sub && node.sub?.length > 0) {
        node.sub = node.sub.map((sub) => updateMemberInfo(sub))
      }
      return node
    }

    const updatedFamilyTree = familyTree.map(updateMemberInfo)
    console.log("CHECK save to localStorage :=>>>>>>) ", updatedFamilyTree);
    localStorage.setItem("familyData", JSON.stringify(updatedFamilyTree))
    setFamilyDataTree(updatedFamilyTree)
    // setIsEdit(false)
    setAvatar(null)
    reset()
    setOnlyYear(false)
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
    <Box component="form" onSubmit={handleSubmit(onSubmit, unSave)} sx={{padding: "16px", mx: "auto"}}
         className="form-management">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Controller
            name="name"
            control={control}
            defaultValue={memberInfo.label || ""}
            rules={{required: "Name is required"}}
            render={({field}) => (
              <TextField
                error={!!errors?.name}
                label="Name"
                fullWidth
                helperText={errors?.name?.message as string || ""}
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
            rules={isEdit ? {} : {required: "Type is required"}}
            render={({field}) => (
              <FormControl fullWidth variant="outlined" error={!!errors?.type}>
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
                <FormHelperText>{(errors?.type?.message) as string || ""}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={3}>
          <Controller
            name="dob"
            control={control}
            defaultValue={null}
            rules={{required: "Date of Birth is required"}}
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
                customInput={
                  <TextField
                    label="Date of birth"
                    fullWidth
                    variant="standard"
                    error={!!errors?.dob}
                    helperText={errors?.dob?.message as string || ""}
                  />
                }
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
                onChange={(date) => {
                  if (onlyYear) {
                    const year = date ? date.getFullYear() : null;
                    // field.onChange(year ? new Date(year, 0, 1) : null);
                    field.onChange(year)
                  } else {
                    field.onChange(date);
                  }
                }}
                dateFormat={onlyYear ? "yyyy" : "dd/MM/yyyy"}
                showYearPicker={onlyYear}
                customInput={
                  <TextField
                    label="Date of death"
                    fullWidth
                    variant="standard"
                    sx={{marginBottom: "8px"}}
                    InputProps={{
                      startAdornment: (
                        <FormControlLabel
                          sx={{width: "inherit"}}
                          control={
                            <Checkbox
                              sx={{padding: "0 4px 0 12px"}}
                              checked={onlyYear}
                              onChange={(e) => setOnlyYear(e.target.checked)}
                            />
                          }
                          label="Year only"
                        />
                      ),
                    }}
                  />
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={4}>
          <Controller
            name="pob"
            control={control}
            defaultValue={memberInfo.pob || ""}
            rules={{required: "Place of Birth is required"}}
            render={({field}) => (
              <TextField
                error={!!errors?.pob}
                label="Place of Birth"
                helperText={errors?.pob?.message as string || ""}
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

        {!isEdit && <Grid item xs={4}>
          <Controller
            name="relateTo"
            control={control}
            defaultValue={""}
            rules={!isEdit ? {required: "Please choose related person"} : {}}
            render={({field}) => !isEdit && (
              <FormControl fullWidth variant="outlined" error={!!errors?.relateTo}>
                <InputLabel id="relateTo">Relate To</InputLabel>
                <Select
                  {...field}
                  variant="standard"
                  label="Relate To"
                  labelId="relateTo"
                >
                  {list.map((item: any) => (
                    <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{(errors?.relateTo?.message) as string || ""}</FormHelperText>
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
            rules={{required: "Bio is required"}}
            render={(ctrl) =>
              <TextField
                label="Bio"
                error={!!errors?.bio}
                fullWidth
                variant="standard"
                multiline
                rows={4}
                helperText={errors?.bio?.message as string || ""}
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
            render={() => (<>
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

        <Grid item xs={12}>
          <Box className="flex gap-10">
            <Button
              type="button"
              fullWidth
              disabled={!isEdit}
              variant="outlined"
              color="primary"
              className="w-[150px]"
              onClick={() => {
                // setIsNew(true)
                setIsEdit(false)
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
                setMemberInfo({})
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
              disabled={(!isEdit && !isEmpty(errors))}
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


