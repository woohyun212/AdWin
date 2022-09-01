import React, {useEffect, useState} from "react";

import RecruitAnnounceCard from "./RecruitAnnounceCard";



export default function RecruitAnnounceList({loading=false, error=null, posts=[]}) {


    if (loading) 
        return <div>로딩중..</div>;
    if (error) 
        return <div>에러가 발생했습니다</div>;
    if (!posts) 
        return null;
    return (<> {
        posts.map(
            (post : any) =>
                (<React.Fragment key={post._id}>
                    <RecruitAnnounceCard post={post}/>
                    <hr className="border-[#06113C] w-full opacity-30"/>
                </React.Fragment>)
        )
    } </>);
    // 
}
