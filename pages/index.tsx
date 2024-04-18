import Image from "next/image";

import { BsBell, BsEnvelope, BsTwitter } from "react-icons/bs";
import React from "react";
import { BiHash, BiHomeHeart, BiMoney } from "react-icons/bi";
import { PiBookmarkSimple } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import FeedCard from "@/components/Feedcard";

// const inter = Inter({ subsets: ["latin"] });

interface TwitterSideBarButton{
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSideBarButton[] = [
  {
    title: 'Home',
    icon: <BiHomeHeart />
  },
  {
    title: 'Explore',
    icon: <BiHash />
  },
  {
    title: 'Notifications',
    icon: <BsBell /> 
  },
  {
    title: 'Messages',
    icon: <BsEnvelope />
  },
  {
    title: 'Bookmarks',
    icon: <PiBookmarkSimple />
  },
  {
    title: 'Profile',
    icon: <AiOutlineUser />
  },
  {
    title: 'Twitter Blue',
    icon: <BiMoney />
  },
  {
    title: 'More Options',
    icon: <SlOptions />
  },

]

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 justify-start pt-8 px-4">
          <div className="text-3xl h-fit w-fit hover:bg-gray-800 rounded-full p-2 cursor-pointer transition-all">
        <BsTwitter/>
        </div>
        <div className= "mt-1 text-2xl font-semibold pr-4">
            <ul>
              {sidebarMenuItems.map((item) => (
              <li
              className ="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2 " 
             key={item.title}
            >
            <span className="text-3xl">{item.icon}</span>
            <span>{item.title}</span>
            </li>
            ))}
            </ul>
            <div className="mt-5 px-3">
               <button className="bg-[#1d9bf0] font font-semibold text-lg py-2 px-4 rounded-full w-full mt-4 mx-4">Tweet</button>
            </div>
        </div>
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] border border-gray-600">
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
