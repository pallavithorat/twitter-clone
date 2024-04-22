import React from "react";
import Image from "next/image";
import { BiMessageDetail } from "react-icons/bi";
import { AiOutlineRetweet, AiOutlineUpload } from "react-icons/ai";
import { IoHeartOutline } from "react-icons/io5";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProps{
    data: Tweet
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
    const {data} = props
    return <div className="border border-l-0 border-b-0 border-r-0 border-gray-600 p-5  hover:bg-gray-800 transition-all cursor-pointer">
        <div className="grid grid-cols-12">
            <div className="col-span-1">
               { data.author?.profileImageURL && <Image className="rounded-full"
                src={data.author.profileImageURL} alt="user-image" height={50} width={50}/>}
            </div>
            <div className="col-span-11">
                <h5>
                    <Link href={`/${data.author?.id}`}>
                        {data.author?.firstName} {data.author?.lastName}
                    </Link>
                </h5>
                
                <p>
                {data.content}
                </p>
                <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
            <div>
                <BiMessageDetail />
            </div>
            <div>
                <AiOutlineRetweet />
            </div>
            <div>
                <IoHeartOutline />
            </div>
            <div>
                <AiOutlineUpload />
            </div>

            </div>

            </div>
        </div>

    </div>
}

export default FeedCard;