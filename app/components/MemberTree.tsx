"use client"
import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import {Button} from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import {isEmpty, isNil} from "lodash";
import {useMemberContext} from "@/app/1-common/3-context/member.context";
import DateTimeUtils from "@/app/1-common/2-utils/date.util";
import Box from "@mui/material/Box";
import MemberTreeDialog from "@/app/components/Dialog";

interface CardItemProps {
  data?: any;
  key?: string | number;
  handleShowItemChild?: (item: any) => void;
}

// @ts-ignore
export default function MemberTree({data, key}: {data?:any ,key?: number | string }) {

  const [memberSelected, setMemberSelected] = useState<any>({})
  const [isShowDialog, setIsShowDialog] = useState(false)
  const [dataTree, setDataTree] = useState([])
  const {familyDataTree} = useMemberContext()

  useEffect(() => {
    if (!isNil(data)) {
      setDataTree(data)
    } else {
      setDataTree(familyDataTree)
    }
  }, [JSON.stringify(data), JSON.stringify(familyDataTree)]);

  const handleShowItemChild = (item: string) => {
    setMemberSelected(item)
    setIsShowDialog(true)
  };

  return (
    <div className="card-item">
      <nav className="tree">
        <ul>
          <li>
            <TreeNode
              handleShowItemChild={handleShowItemChild}
              data={dataTree} key={key}
            />
            {
              dataTree?.map((item: any, index: number) => {
                return (
                  <ul key={index}>
                    <li>
                      <TreeNode
                        handleShowItemChild={handleShowItemChild}
                        data={item.children} key={index}/>
                    </li>
                    <MemberTreeDialog
                      isOpen={isShowDialog}
                      setOpen={(e) => {
                        setIsShowDialog(e)
                      }}
                      data={memberSelected}
                    />
                  </ul>
                )
              })
            }
          </li>
        </ul>
      </nav>

    </div>
  );
}

export function TreeNode({
                           handleShowItemChild,
                           data,
                         }: CardItemProps) {
  const [isChildVisible, setIsChildVisible] = useState(false)
  const {setMemberInfo} = useMemberContext()
  const handleOnClickMember = (e: any, item: any) => {
    e.preventDefault()
    setMemberInfo(item)
  }

  const renderNodeItem = (item: any, index: string | number) => {
    return (
      <Fragment>
        <a key={index} href={"#"} className="mr-4" onClick={(e) => handleOnClickMember(e, item)}>
          <img src={item?.image || "images/no-avatar.png"} alt={item.label}/>
          <span>
          <span>{item.label}</span>
          <p className="block mb-2">{`(${DateTimeUtils.formatDate(item.dob)} - ${item.dod ? DateTimeUtils.formatDate(item.dod) : "Present"})`}</p>
          <Box display="flex" gap={10}>
            <button
              aria-label="hierarchy"
              className={`border border-solid h-[40px] w-[40px] rounded-full mx-auto border-[#d8220c] text-[#d8220c]
                ${!isEmpty(item.children) ? "" : "hidden"}
              `}
              onClick={() => {
                setIsChildVisible(!isChildVisible)
                if (handleShowItemChild && item.children?.length > 0) {
                  handleShowItemChild(item)
                }
              }}
            >
            <AccountTreeIcon
              sx={{transform: "scaleX(-1) rotate(90deg)"}}
              className={`text-[20px] `}
            />
          </button>
            {item.type !== "Root" && <Button sx={{marginLeft: "auto"}} variant="outlined" color="primary">
              {item.type}
            </Button>}
          </Box>
        </span>
        </a>
        {item.sub?.length > 0 &&
          <TreeNode
            handleShowItemChild={handleShowItemChild}
            data={item.sub}
            key={index}
          />
        }
      </Fragment>
    )
  }

  return (
    <>
      {data?.length > 0 && data?.map((item: any, index: number) => {
        return (
          <>
            {renderNodeItem(item, index)}
          </>
        )
      })}
    </>
  )
}