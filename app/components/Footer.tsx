"use client"
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import {Link} from "@mui/material";
import {useState} from "react";

export default function Footer() {
  const [isActive, setIsActive] = useState<number | null>(null)

  let menuNavItems = [
    {id: 1, label: "Members Direction", link: "#"},
    {id: 2, label: "Family Tree", link: "#"},
    {id: 3, label: "Family Timeline", link: "#"},
    {id: 4, label: "Lewis History", link: "#"},
    {id: 5, label: "Family Blog", link: "#"},
    {id: 6, label: "Galleries", link: "#"},
  ];

  const onClickMenu = (e:any, id: number) => {
    e.preventDefault()
    setIsActive(id)
  }

  return (
    // <footer className='p-4 bg-gray-100 text-center'>
    <footer className="footer">
      <Box sx={{ width: '100%' }} className="p-[50px]">
        <Grid container spacing={0.5}>
          <Grid item xs={6}>
            <Box className="px-[50px] text-[#656565]">
              <Typography variant="body1" paragraph >
                Lewis family roots reach back to the late <span className="font-bold">19th century</span> England.
                Founded by <span className="italic">John Lewis</span>, the middle-class entrepreneur,
                who married Mary Wright and together they started a family which now spans over four generations.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {menuNavItems.map((item) => (
                <Grid item xs={6} className="" key={item.id}>
                  <Link href={item.link} className={`no-underline text-black ${isActive === item.id ? "font-bold" : ""}`} onClick={(e) => onClickMenu(e, item.id)}>{item.label}</Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box className="footer-background">
      </Box>
    </footer>
  );
}