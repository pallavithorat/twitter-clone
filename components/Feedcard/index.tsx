import React from "react";
import Image from "next/image";
import { BiMessageDetail } from "react-icons/bi";
import { AiOutlineRetweet, AiOutlineUpload } from "react-icons/ai";
import { IoHeartOutline } from "react-icons/io5";

const FeedCard: React.FC = () => {
    return <div className="border border-l-0 border-b-0 border-r-0 border-gray-600 p-5  hover:bg-gray-800 transition-all cursor-pointer">
        <div className="grid grid-cols-12">
            <div className="col-span-1">
                <Image src="https://avatars.githubusercontent.com/u/87472620?v=4" alt="user-image" height={50} width={50}></Image>
            </div>
            <div className="col-span-11">
                <h5>Pallavi Thorat</h5>
                
                <p>
                Concerns greatest margaret him absolute entrance nay.
                 Door neat week do find past he. 
                Unpacked endeavor six steepest had husbands her. Painted no or affixed it so civilly.
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