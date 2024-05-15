import React, {useEffect, useState} from "react";
import {storeData} from "@/app/1-common/2-utils/localStorage.util";
import familyData from "@/app/data/familyData.json";

const MemberContext = React.createContext<any>({
  memberInfo: {},
  setMemberInfo: () => {
  },

});

const MemberProvider = ({children}: { children: React.ReactNode }) => {
  const [memberInfo, setMemberInfo] = useState<any>({
    "id": "1",
    burialPlace: "Bayside Cemetery, New York, US",
    sub: [],
    child: [],
    dob: "08/07/1878",
    dod: "04/09/1923",
    image: "images/john-lewis.jpg",
    label: "John Lewis",
    level: 0,
    pob: "New York, US",
    pod: "New York, US",
  })
  const familyMembers = JSON.parse(JSON.stringify(familyData));

  useEffect(() => {
    storeData(familyData)
  }, []);

  return (
    <MemberContext.Provider value={{memberInfo, setMemberInfo}}>
      {children}
    </MemberContext.Provider>
  )
}
export default MemberProvider;

export function useMemberContext() {
  return React.useContext(MemberContext);
}