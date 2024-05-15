"use client"
import * as React from "react";
import {Fragment, useState} from "react";
import {Button, Card, CardContent, CardMedia, Paper, Typography} from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import {isEmpty} from "lodash";

interface CardItemProps {
  isSelected: boolean,
  handleExpandClick?: () => void,
  data?: any
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
export default function MemberTree({data}) {
  const [isSelected, setIsSelected] = useState<boolean>(false)

  const handleExpandClick = () => {
    setIsSelected(!isSelected)
  };

  return (
    <CardItem isSelected={isSelected} handleExpandClick={handleExpandClick} data={data}/>
  );
}

export function CardItem({isSelected, handleExpandClick, data}: CardItemProps) {
  return (
    <div className="card-item">
      <nav className="tree">
        <ul>
          <li>
            <a href="#" className="mr-4">
              <img src="images/john-lewis.jpg" alt="john lewis"/>
              <span>John Lewis
                <p className="block">(January 1, 1980 - )</p>
              </span>
            </a>
            <a href="#" className="mr-4">
              <img src="images/john-lewis.jpg" alt="john lewis"/>
              <span>John Lewis
                <p className="block">(January 1, 1980 - )</p>
              </span>
            </a>
            <a href="#" className="mr-4">
              <img src="images/john-lewis.jpg" alt="john lewis"/>
              <span>John Lewis
                <p className="block">(January 1, 1980 - )</p>
              </span>
            </a>
            <ul>
              <li>
                <a href="#">Lab</a>
                <ul>
                  <li>
                    <a href="#">Code</a>
                    <ul>
                      <li>
                        <a href="#">Html</a>
                        <ul>
                          <li>
                            <a href="#">Css</a>
                            <ul>
                              <li>
                                <a href="#">Jquery</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Graph</a>
                    <ul>
                      <li>
                        <a href="#">Image</a>
                        <ul>
                          <li>
                            <a href="#">Design</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Blog</a>
                <ul>
                  <li>
                    <a href="#">Category</a>
                    <ul>
                      <li>
                        <a href="#">Code</a>
                      </li>
                      <li>
                        <a href="#">Graph</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">About</a>
                <ul>
                  <li>
                    <a href="#">Vcard</a>

                  </li>
                  <li>
                    <a href="#">Map</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
    // <div className="member-item">
    //   <ul>
    //     {data.map((item:any) => (
    //       <Fragment key={item.id}>
    //         <Paper elevation={0} className="w-4/5 mx-auto member-item-paper">
    //           <Card sx={{maxWidth: 345}} className="">
    //             <CardMedia
    //               component="img"
    //               height="194"
    //               image={item.image}
    //               alt={item.name}
    //             />
    //             <CardContent
    //               className={`pb-0 flex flex-col justify-center items-center ${isSelected ? "bg-[#d8220c] text-white" : ""}`}>
    //               <Typography variant="h5" paragraph className={`font-bold mx-auto mt-4 ${isSelected}`}>
    //                 {item.name}
    //               </Typography>
    //               <Typography variant="subtitle1" paragraph>
    //                 <span>({item.dob} - {item.dod})</span>
    //               </Typography>
    //               <Button
    //                 aria-label="hierarchy"
    //                 className={`bottom-[-1rem] border border-solid h-[66px] w-[66px] rounded-full
    //             ${isSelected ? "border-[#fff] text-white" : "border-[#d8220c] text-[#d8220c]"}
    //           `}
    //                 onClick={handleExpandClick}
    //               >
    //                 <AccountTreeIcon
    //                   onClick={() => console.log("2")}
    //                   sx={{transform: "scaleX(-1) rotate(90deg)"}}
    //                   className="text-[32px]"
    //                 />
    //               </Button>
    //             </CardContent>
    //           </Card>
    //         </Paper>
    //         {!isEmpty(item.child) && <CardItem isSelected={isSelected} handleExpandClick={handleExpandClick} data={item.child}/>}
    //       </Fragment>
    //       ))}
    //   </ul>
    //
    // </div>
  )
}