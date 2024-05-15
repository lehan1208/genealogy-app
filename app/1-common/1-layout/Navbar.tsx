'use client'

import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {Box} from "@mui/system";
import {useState} from "react";

const NAV_LINKS = [
  {name: "Home", href: "/"},
  {name: "Family", href: "#"},
  {name: "History", href: "#"},
  {name: "Blog", href: "#"},
  {name: "Galleries", href: "#"},
  {name: "Admin", href: "/admin-page"},
];

export default function Navbar() {
  const [isActiveLink, setIsActiveLink] = useState<string | null>("Home")
  const onClickNav = (name: string) => {
    setIsActiveLink(name)
  }
  return (
    <Box className="flex h-[80px] px-[60px] items-center justify-between border-b border-solid border-b-gray-500">
      <div>
        <Image className="z-[2]" src={Logo} alt="Logo" height={29}/>
      </div>
      <div className="me-5 flex gap-8 z-[2]">
        {NAV_LINKS.map((link) => (
          <Link className={`${isActiveLink === link.name ? "border-b-4 border-solid border-b-[#d8220c]" : ""}`} href={link.href} key={link.name} onClick={() => onClickNav(link.name)}>
            {link.name}
          </Link>
        ))}
        <SearchOutlinedIcon/>
      </div>
    </Box>
  )
}