"use client"
import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import {Button, Card, CardContent, CardMedia, Paper, Typography} from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import {isEmpty, isNil} from "lodash";
import {useMemberContext} from "@/app/1-common/3-context/member.context";
import DateTimeUtils from "@/app/1-common/2-utils/date.util";
import Box from "@mui/material/Box";
import MemberTreeDialog from "@/app/components/Dialog";

interface CardItemProps {
  handleExpandClick?: (item: any) => void,
  data?: any;
  key?: string | number;
  handleShowItemChild?: (item: any) => void;
  visibleChildMap?: { [key: string]: boolean };
}

interface MemberInfoProps {
  id: number;
  level: number;
  name: string;
  type: string;
  image: string;
  dob: string;
  dod: string;
  pob: string;
  pod: string;
  burialPlace: string;
  bio: [];
  child: [];
  sub: [];
  data?: any;
}

// @ts-ignore
export default function MemberTree({data, key}: {data?:any ,key?: number | string }) {

  const [memberSelected, setMemberSelected] = useState<any>({})
  const [isShowDialog, setIsShowDialog] = useState(false)
  const [visibleChildMap, setVisibleChildMap] = useState<{ [key: string]: boolean }>({});
  const [dataTree, setDataTree] = useState([])
  const {familyDataTree} = useMemberContext()

  useEffect(() => {
    if (!isNil(data)) {
      setDataTree(data)
    } else {
      setDataTree(familyDataTree)
    }
  }, [JSON.stringify(data), JSON.stringify(familyDataTree)]);

  const handleExpandClick = (item: any) => {
    // setMemberSelected(item)

  };

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
              visibleChildMap={visibleChildMap} handleExpandClick={handleExpandClick} data={dataTree} key={key}/>
            {/*render children*/}
            {
              dataTree?.map((item: any, index: number) => {
                return (
                  <ul key={index}>
                    <li>
                      <TreeNode
                        handleShowItemChild={handleShowItemChild}
                        visibleChildMap={visibleChildMap} handleExpandClick={handleExpandClick}
                        data={item.child} key={index}/>
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
                           handleExpandClick,
                           handleShowItemChild,
                           visibleChildMap,
                           data,
                           key,
                         }: CardItemProps) {
  const [isChildVisible, setIsChildVisible] = useState(false)
  const {memberInfo, setMemberInfo} = useMemberContext()
  const handleOnClickMember = (e: any, item: any) => {
    e.preventDefault()
    setMemberInfo(item)
  }

  const renderNodeItem = (item: any, index: string | number) => {
    return (
      <Fragment>
        <a key={index} href={"#"} className="mr-4" onClick={(e) => handleOnClickMember(e, item)}>
          <img src={item.image} alt={item.label}/>
          <span>
          <span>{item.label}</span>
          <p className="block mb-2">{`(${DateTimeUtils.formatDate(item.dob)} - ${item.dod ? DateTimeUtils.formatDate(item.dod) : "Present"})`}</p>
          <Box display="flex" gap={10}>
            <button
              aria-label="hierarchy"
              className={`border border-solid h-[40px] w-[40px] rounded-full mx-auto border-[#d8220c] text-[#d8220c]
                ${!isEmpty(item.child) ? "" : "hidden"}
              `}
              onClick={() => {
                handleExpandClick ? handleExpandClick(item) : null
                setIsChildVisible(!isChildVisible)
                if (handleShowItemChild && item.child?.length > 0) {
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
            visibleChildMap={visibleChildMap} handleExpandClick={handleExpandClick} data={item.sub}
            key={index}
          />
        }
        {!(visibleChildMap) || visibleChildMap[item.id] && item.child && item.child?.length > 0 && (
          <ul>
            {item.child?.map((childItem: any) => {
              return (
                <li key={childItem.id}>
                  <TreeNode
                    handleExpandClick={handleExpandClick}
                    handleShowItemChild={handleShowItemChild} visibleChildMap={visibleChildMap}
                    data={childItem} key={childItem.id}/>
                </li>
              )
            })}
          </ul>
        )}
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