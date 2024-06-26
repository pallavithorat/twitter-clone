import { useCurrentUser } from '@/hooks/user';
import React, { useCallback, useMemo } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BiHash, BiHomeHeart, BiMoney } from 'react-icons/bi';
import { BsBell, BsEnvelope, BsTwitter } from 'react-icons/bs';
import { PiBookmarkSimple } from 'react-icons/pi';
import { SlOptions } from 'react-icons/sl';
import Image from "next/image";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from 'react-hot-toast';
import { graphqlClient } from '@/clients/api';
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { DiVim } from 'react-icons/di';

interface TwitterSideBarButton{
    title: string;
    icon: React.ReactNode;
    link: string
  }
  


interface TwitterlayoutProps {
    children: React.ReactNode
}
const Twitterlayout: React.FC<TwitterlayoutProps> = (props) => {
    const { user } = useCurrentUser();
    const queryClient = useQueryClient();

  const sidebarMenuItems: TwitterSideBarButton[] = useMemo(() =>  [
    {
      title: 'Home',
      icon: <BiHomeHeart />,
      link: '/'
    },
    {
      title: 'Explore',
      icon: <BiHash />,
      link: '/'
    },
    {
      title: 'Notifications',
      icon: <BsBell />,
      link: '/' 
    },
    {
      title: 'Messages',
      icon: <BsEnvelope />,
      link: '/'
    },
    {
      title: 'Bookmarks',
      icon: <PiBookmarkSimple />,
      link: '/'
    },
    {
      title: 'Profile',
      icon: <AiOutlineUser />,
      //link: '/${user?.id'
      link:`/${user?.id}`
    },
    {
      title: 'Twitter Blue',
      icon: <BiMoney />,
      link: '/'
    },
    {
      title: 'More Options',
      icon: <SlOptions />,
      link: '/'
    },
  
  ],
  [user?.id]
  );


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
    
    
      }, [queryClient]);
      
    return (
        <div>
        <div className="grid grid-cols-12 h-screen w-screen sm:px-56">
        <div className="col-span-2 sm:col-span-3 span  pt-1 flex sm:justify-end pr-4 relative">
        <div>
        <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-2 cursor-pointer transition-all">
        <BsTwitter/>
        </div>
        <div className= "mt-1 text-xl pr-4">
            <ul>
              {sidebarMenuItems.map((item) => (
              <li
             
            >
           <Link  className ="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2 " 
             key={item.title} href={item.link}>
           <span className="text-3xl">{item.icon}</span>
            <span className='hidden sm:inline '>{item.title}</span>
           </Link>
            </li>
            ))}
            </ul>
            <div className="mt-5 px-3">
               <button className="hidden sm:block bg-[#1d9bf0] font font-semibold text-lg py-2 px-4 rounded-full w-full">Tweet</button>
            </div>
            {/* <div className="mt-5 px-3">
               <button className="block sm:hidden bg-[#1d9bf0] font font-semibold text-lg py-2 px-4 rounded-full w-full"><BsTwitter/></button>
            </div> */}
        </div>
        </div>

        {
          user && (
          <div className="absolute bottom-5"> 
          <div className="flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
          {user && user.profileImageURL && (
          <Image
          src={user?.profileImageURL}
          alt="user-image"
          height={50}
          width={50}
          className="lg:w-14 lg:h-14 rounded-full"
          />
          )}
          <div className='hidden sm:block'>
          
          <div className="text-lg">
                  {user.firstName} {user.lastName}
            </div>

          </div>
          </div>
        </div>
          )}

        </div>

        <div className="col-span-10 sm:col-span-5 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">

            {props.children}
          
           
        </div>
        <div className="col-span-0 sm:col-span-3 p-5">
          {!user ? (<div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-2xl">New To Twitter?</h1>
       <GoogleLogin onSuccess={handleLoginWithGoogle}/>

       </div>
       ):  
       <div className="px-4 py-3 bg-slate-800 rounded-lg">
        <h1 className="my-2 text-2xl mb-5">Users you may know</h1>
        { user?.recommendedUsers.map((el) => (
        <div className="flex items-center gap-3 mt-2" key={el?.id}>
           { el?.profileImageURL && (
            
            <Image 
            src={el?.profileImageURL}
            alt='user-image'
            className='rounded-full'
            width={60}
            height={60}
            />
            
        )}
          <div>

          <div className='text-lg' >
             {el?.firstName} {el?.lastName}
         </div>
         <Link href={`/${el?.id}`} className='bg-white text-black text-sm px-5 py-1 rounded-lg w-full'>View</Link>

          </div>
    
         </div>
        
        ))}
        
        </div>}

       

       

        </div>
      </div>
    </div>
    );
    

};

export default Twitterlayout;


