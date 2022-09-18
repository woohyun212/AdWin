import React from "react";
import { useNavigate } from "react-router-dom";


export default function Profile() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("temitope");
    navigate("/");
  };

  return (
    <div className='flex w-screen h-[91vh] mt-[9vh] justify-center items-center'>
      <div>
        <h1>Profile page</h1>
        <p>Hello there, welcome to your profile page</p>
        <button onClick={signOut}>sign out</button>
      </div>
    </div>
  );
}