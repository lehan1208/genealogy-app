import * as React from "react";
import Collapse from "@mui/material/Collapse";
import {TransitionProps} from "@mui/material/transitions";
import {RichTreeView} from "@mui/x-tree-view/RichTreeView";
import {TreeViewBaseItem} from "@mui/x-tree-view/models";
import {useSpring, animated} from "@react-spring/web";
import familyData from "../data/familyData.json";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";

const ITEMS: TreeViewBaseItem[] = [
  {
    id: "1",
    label: "Main",
    children: [
      {id: "2", label: "Hello"},
      {
        id: "3",
        label: "Subtree with children",
        children: [
          {id: "6", label: "Hello"},
          {
            id: "7",
            label: "Sub-subtree with children",
            children: [
              {id: "9", label: "Child 1"},
              {id: "10", label: "Child 2"},
              {id: "11", label: "Child 3"},
            ],
          },
          {id: "8", label: "Hello"},
        ],
      },
      {id: "4", label: "World"},
      {id: "5", label: "Something something"},
    ],
  },
];

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

export default function TreeView({getMemberInfo, familyTree = []}: {getMemberInfo: (data: any) => void, familyTree: any[]}, ) {
  const [lastSelectedItem, setLastSelectedItem] = React.useState<string | null>(null);
  const [treeData, setTreeData] = useState<any[]>([])

  const handleItemSelectionToggle = (
    event: React.SyntheticEvent,
    itemId: string,
    isSelected: boolean,
  ) => {
    if (isSelected) {
      setLastSelectedItem(itemId);
    }
  };
  const newArray = convertArray(familyTree);

  function convertArray(array: any[]) {
    return array.map(item => {
      const newItem = {
        id: item.id.toString(),
        label: item.name || item.label,
        ...(item.image && {image: item.image}),
        ...(item.dob && {dob: item.dob}),
        ...(item.dod && {dod: item.dod}),
        ...(item.pob && {pob: item.pob}),
        ...(item.pod && {pod: item.pod}),
        ...(item.burialPlace && {burialPlace: item.burialPlace}),
        ...(item.bio && {bio: item.bio}),
        ...(item.level && {level: item.level}),
        ...(item.type && {type: item.type}),
      }
      if (item.sub || item.child) {
        newItem.children = [];
        newItem.sub = [];
        if (item.sub) {
          newItem.children = newItem.children.concat(convertArray(item.sub));
          newItem.sub = newItem.sub.concat(convertArray(item.sub));
        }
        if (item.child) {
          newItem.children = newItem.children.concat(convertArray(item.child));
        }
      }
      return newItem;
    });
  }

  function findItemById(id:string | null, array:any[]) {
    if (!id || !array?.length) return null
    for (const item of array) {
      if (item.id == id) {
        return item;
      }
      if (item.children) {
        const foundInChildren:any = findItemById(id, item.children);
        if (foundInChildren) {
          return foundInChildren;
        }
      }
    }
    return null;
  }

  useEffect(() => {
    if (lastSelectedItem) {
      getMemberInfo(findItemById(lastSelectedItem, newArray))
    }
  }, [lastSelectedItem]);


  return (
    <Stack spacing={2}>
      <RichTreeView
        aria-label="customized"
        defaultExpandedItems={["1"]}
        sx={{overflowX: "hidden", minHeight: 270, flexGrow: 1, maxWidth: 300}}
        slotProps={{item: {slots: {groupTransition: TransitionComponent}}}}
        items={newArray}
        onItemSelectionToggle={handleItemSelectionToggle}
        // getItemId={(item) => item.id}
      />
    </Stack>
  );
}