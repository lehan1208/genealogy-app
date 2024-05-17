"use client"
import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import {useMemberContext} from "@/app/1-common/3-context/member.context";
import DateTimeUtils from "@/app/1-common/2-utils/date.util";
import {isEmpty} from "lodash";
import {AccountTree} from "@mui/icons-material"

export default function MemberTree() {
  const {familyDataTree} = useMemberContext()
  const [treeData, setTreeData] = useState<any>([])

  useEffect(() => {
    if (!isEmpty(familyDataTree)) {
      setTreeData(familyDataTree)
    }
  }, [JSON.stringify(familyDataTree)]);

  return (
    <div className="family-component w-full overflow-x-auto">
      <form id="form1">
        <div className="tree" id="FamilyTreeDiv">
          <ul>
            {treeData.map((item: any) => (
              <TreeNode
                key={item.id}
                node={item}
              />
            ))}
          </ul>
        </div>
      </form>
    </div>
  )
}

function TreeNode({node}: { node: any }) {
  const {setMemberInfo} = useMemberContext()
  const handleOnClickMember = (e: any, item: any) => {
    e.preventDefault()
    setMemberInfo(item)
  }

  return (
    <li key={node.id}>
      <div>
        <span className={node.gender} onClick={(e) => handleOnClickMember(e, node)}>
          <img src={node?.image || "images/no-avatar.png"} alt={node.label} width={100} height={100}/>
          <p className="item-info">
             <span className="uppercase font-[700] text-[#444]">{node.label}
               {node.children.length > 0 && <AccountTree
                 sx={{transform: "scaleX(-1) rotate(90deg)"}}
                 className={`text-[20px] text-[red] ml-5`}
               />}
             </span>
            <p className="block mb-2 text-[#999] mt-2">
              {`(${DateTimeUtils.formatDate(node.dob)} - ${node.dod ? DateTimeUtils.formatDate(node.dod) : "Present"})`}
            </p>
          </p>
        </span>
        {node?.sub?.map((subItem: any) => (
          <Fragment key={subItem.id}>
            <span className="spacer"></span>
            <span className={subItem.gender} onClick={(e) => handleOnClickMember(e, subItem)}>
              <img src={subItem?.image || "images/no-avatar.png"} alt={subItem.label} width={100} height={100}/>
              <p className="item-info">
                <span className="uppercase font-[700] text-[#444]">{subItem.label}</span>
                <span className="block mb-2 text-[#999] mt-2">
                  {`(${DateTimeUtils.formatDate(subItem.dob)} - ${subItem.dod ? DateTimeUtils.formatDate(subItem.dod) : "Present"})`}
                </span>
              </p>
            </span>
          </Fragment>
        ))}
      </div>
      {
        node?.children && (
          <ul>
            {node?.children?.map((child: any) => (
              <TreeNode
                key={child.id}
                node={child}
              />
            ))}
          </ul>
        )
      }
    </li>
  );
}