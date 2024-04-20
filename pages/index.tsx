import Image from "next/image";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { BsBell, BsEnvelope, BsTwitter } from "react-icons/bs";
import React, { useCallback } from "react";
import { BiHash, BiHomeHeart, BiMoney } from "react-icons/bi";
import { PiBookmarkSimple } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import FeedCard from "@/components/Feedcard";
import toast from "react-hot-toast";
import {graphqlClient} from "@/clients/api";


import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { RiH1 } from "react-icons/ri";

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

  const { user } = useCurrentUser();
  const queryClient = useQueryClient()

  console.log(user);

  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential
    if(!googleToken) return toast.error(`Google Token not found`);

    const { verifyGoogleToken } = await graphqlClient.request(
      verifyUserGoogleTokenQuery, {token: googleToken}
      
      );

      toast.success('Verified Success');
      console.log(verifyGoogleToken);

      if(verifyGoogleToken) window.localStorage.setItem("__twitter_token", verifyGoogleToken);

      await queryClient.invalidateQueries(["curent-user"]);


  }, [queryClient])
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-1 ml-8 relative">
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

        {
          user && (
            <div className="absolute bottom-5, flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
          {user && user.profileImageURL && (
          <Image
          className="rounded-full"
          src={user?.profileImageURL}
          alt="user-image"
          height={50}
          width={50}
          />
          )}
          <div>
          <h3 className="text-xl">{user.firstName}</h3>
          <h3 className="text-xl">{user.lastName}</h3>
          </div>
        </div>
          )}
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] border border-gray-600">
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
          <FeedCard/>
        </div>
        <div className="col-span-3 p-5">
          {!user && (<div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-2xl">New To Twitter?</h1>
       <GoogleLogin onSuccess={handleLoginWithGoogle}/>

       </div>)}

        </div>
      </div>
    </div>
  );
}
