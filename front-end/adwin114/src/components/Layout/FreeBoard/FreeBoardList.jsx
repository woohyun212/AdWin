import React from "react";
import FreeBoardCard from "./FreeBoardCard";



export default function FreeBoardList({loading=false, error=null, posts=[]}) {

    if (loading) 
        return <div>로딩중..</div>;
    if (error) 
        return <div>에러가 발생했습니다</div>;
    if (!posts) 
        return null;
    return (<> {
        posts.map(
            (post) =>
                (<React.Fragment key={post._id}>
                    <FreeBoardCard post={post}/>
                    <hr className="border-[#06113C] w-full opacity-30"/>
                </React.Fragment>)
        )
    } </>);
    // 
}
