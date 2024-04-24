import Twitterlayout from "@/components/Feedcard/Layout/TwitterLayout";
import next from "next";
import type {GetServerSideProps, NextPage} from "next";
import { BsArrowLeft } from "react-icons/bs";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
import FeedCard from "@/components/Feedcard";
import { Tweet, User } from "@/gql/graphql";
import { useRouter } from "next/router";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useCallback, useMemo } from "react";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { followUserMutation, unfollowUserMutation } from "@/graphql/query/mutation/user";

interface ServerProps{
    userInfo?: User;
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
    // const {user} = useCurrentUser();
    const router = useRouter ();

    const { user: currentUser } = useCurrentUser(); 

    const queryClient = useQueryClient();

    const amIFollowing = useMemo(() => {
        if(!props.userInfo) return false;
        return (
        (currentUser?.following?.findIndex(
            el => el?.id === props.userInfo?.id) 
            ?? -1) >= 0

        );

    }, [currentUser?.id, props.userInfo])

    // console.log(props.userInfo);

    const handleFollowUser = useCallback(async () => {
        if (!props.userInfo?.id) return;
    
        await graphqlClient.request(followUserMutation, { to: props.userInfo?.id });
        await queryClient.invalidateQueries(["curent-user"]);
      }, [props.userInfo?.id, queryClient]);


      const handleUnfollowUser = useCallback(async () => {
        if (!props.userInfo?.id) return;
    
        await graphqlClient.request(unfollowUserMutation, {
          to: props.userInfo?.id,
        });
        await queryClient.invalidateQueries(["curent-user"] );
      }, [props.userInfo?.id, queryClient]);

   
    return(
        <div>

            <Twitterlayout>
                <div>
                    <nav className="flex items-center gap-3 py-3 px-3">
                    <BsArrowLeft className="text-4xl"/>
                    <div>
                        <h1 className="text-2xl font-bold">{props.userInfo?.firstName} {props.userInfo?.lastName}</h1>
                        <h1 className="text-md font-bold text-slate-500">{props.userInfo?.tweets?.length} Tweets </h1>

                    </div>

                    </nav>
                    <div className="p-4 border-b border-slate-800">
                        {props.userInfo?.profileImageURL && (
                            <Image 
                            src={props.userInfo?.profileImageURL} 
                            alt="user-image"
                            className="rounded-full" 
                            width={100} 
                            height={100} 
                            />
                        )}
                        <h1 className="text-2xl font-bold mt-5">{props.userInfo?.firstName} {props.userInfo?.lastName}</h1>
                        <div className="flex justify-between items-center">
                        <div className="flex gap-4 mt-2 text-sm text-gray-400">
                            <span>{props.userInfo?.followers?.length} followers</span>
                            <span>{props.userInfo?.following?.length} following</span>

                        </div>
                        {
                            currentUser?.id !== props.userInfo?.id && (
                               <>
                               {
                               amIFollowing ?(
                                         <button onClick={handleUnfollowUser} className="bg-white text-black px-3 py-1 rounded-full text-sm">
                                    Unfollow
                                    </button>
                                    ) : (
                                        <button onClick={handleFollowUser} className="bg-white text-black px-3 py-1 rounded-full text-sm">Follow</button>
                                    )
                               }
                               
                               
                               </>

                            )
                        }
                       

                    </div>

                        </div>
                    <div>
                    {props.userInfo?.tweets?.map((tweet) =>(
            <       FeedCard data= {tweet as Tweet} key={tweet?.id}/>
                    ))}

                    </div>
                </div>

                


            </Twitterlayout>
        </div>
        

    );
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async(context) => {
    const id = context.query.id as string | undefined;

    if(!id) return { notFound: true, props: { userInfo: undefined }};

    const userInfo = await graphqlClient.request(getUserByIdQuery, { id })

    if(!userInfo?.getUserById) return { notFound: true}
    return {
        props: {
            userInfo: userInfo.getUserById as User,
        },
    };
};


export default UserProfilePage;