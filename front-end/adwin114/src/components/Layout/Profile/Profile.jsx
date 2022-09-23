import React from "react";
import {useNavigate} from "react-router-dom";
import {fetchToken, fetchUserData} from "Auth";

export default function Profile() {
    const userData = fetchUserData();
    console.log(userData);
    return (
        <div
            className='flex flex-col w-screen h-[91vh] mt-[9vh] justify-center items-center gap-10 '>
            {
                fetchToken()
                    ? (
                        <> 
                      <div className = 'flex flex-col justify-center items-center w-1/3 h-1/5' >
                        <p>{userData.username}</p>
                        <p>{userData.nickname}</p>
                        <p>{userData._id}</p>
                      </div>
                </>
                    )
                    : ("로그인되어 있지 않습니다!")
            }
        </div>
    );
}