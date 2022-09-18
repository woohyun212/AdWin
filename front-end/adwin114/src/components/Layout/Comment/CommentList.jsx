import React from "react";
import CommentBlock from "./CommentBlock";

export default function CommentList({comments}) {
    return (
        <div
            className='flex flex-col w-full self-center items-center border-t border-[#06113C]'>
            {comments?.map(
            (comment) =>
                (<React.Fragment key={comment._id}>
                    <CommentBlock comment={comment}/>
                    <hr className="border-[#06113C] w-full opacity-30"/>
                </React.Fragment>)
        )}
        </div>
    )
}
