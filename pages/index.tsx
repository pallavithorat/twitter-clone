import Image from "next/image";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { BsBell, BsEnvelope, BsTwitter } from "react-icons/bs";
import React, { useCallback, useState } from "react";
import { BiHash, BiHomeHeart, BiMoney } from "react-icons/bi";
import { PiBookmarkSimple } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import FeedCard from "@/components/Feedcard";
import toast from "react-hot-toast";
import {graphqlClient} from "@/clients/api";
import { BiImageAlt } from "react-icons/bi";

import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { RiH1 } from "react-icons/ri";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import Twitterlayout from "@/components/Feedcard/Layout/TwitterLayout";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { GetServerSideProps } from "next";

// const inter = Inter({ subsets: ["latin"] });

interface HomeProps{
  tweets?: Tweet[];
}

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

export default function Home(props:HomeProps) {

  const { user } = useCurrentUser();
  
  const queryClient = useQueryClient();
  const { mutate } = useCreateTweet();

  const [ content, setContent] = useState("");

  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

  },[]);

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,

    });
 
  },[content, mutate]);

  console.log(user);

  return (
    <div>
    
      <Twitterlayout>
           <div>

           <div className="border border-l-0 border-b-0 border-r-0 border-gray-600 p-5  hover:bg-gray-800 transition-all cursor-pointer">
           <div className="grid grid-cols-12 gap-3">
           <div className="col-span-1">
                {user?.profileImageURL &&
                 (<Image className="rounded-full"
                  src={user?.profileImageURL} 
                  alt="user-image" 
                  height={50} 
                  width={50}
                  />
                  )}
            </div>

            <div className="col-span-11">
              <textarea
              value={content}
              onChange = {e => setContent(e.target.value)}
              className=" w-full bg-transparent text-xl px-3 border-b border-slate-700" 
              placeholder="What's Happening?" 
              rows={3}>
              </textarea>
              <div className="mt-2 flex justify-between items-center">
              <BiImageAlt onClick={handleSelectImage} />
              <button onClick={handleCreateTweet} className="bg-[#1d9bf0] font font-semibold text-sm py-2 px-4 rounded-full ">Tweet</button>
              </div>


            </div>
           </div>

           </div>

          </div>

          

          
          {
            props.tweets?.map(tweet => tweet ? <FeedCard key = { tweet?.id } data= {tweet as Tweet} />: null)
          }  

          </Twitterlayout>

         </div>

  )};

  export const getServerSideProps: GetServerSideProps<HomeProps> = async(context) => {
    const allTweets = await graphqlClient.request(getAllTweetsQuery);
    return{
      props:{
        tweets: allTweets.getAllTweets as Tweet[],
      } 

    }
  }