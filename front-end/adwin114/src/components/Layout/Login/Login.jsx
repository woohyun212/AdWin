import React, {useState} from 'react';
import { fetchToken, setToken } from "Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ORIGIN } from 'components/APIRequest/APIRequest';
import {ReactComponent as AdWinLogo} from 'assets/WINAD.svg';
import {Link} from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

//check to see if the fields are not empty
const login = () => {
    if ((username === "") & (password === "")) {
      return;
    } else {
      // make api call to our backend. we'll leave thisfor later
      axios
        .post(`${API_ORIGIN}/auth/login`, {
          username: username,
          password: password,
        })
        .then(function (response) {
          console.log(response.data.token, "response.data.token");
          if (response.data.token) {
            setToken(response.data.token);
            navigate("/profile");
          }
        })
        .catch(function (error) {
          console.log("Login error", error);
        });
    }
  };
    return (
        <div
            className='flex flex-col w-screen h-[91vh] mt-[9vh] justify-center items-center gap-10 '>
            { fetchToken() ? ("이미 로그인되어 있습니다") :
            (<><div className='flex flex-col justify-center items-center w-1/3 h-1/5'>
                    <AdWinLogo className='h-full' />
                    <p>ADWIN114</p>
                </div><input
                        type="text"
                        id="username"
                        className='border-b border-gray-500 w-[20vw] mx-20 my-1 p-1 pl-4 '
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='아이디를 입력하세요'
                        required /><input
                        type="password"
                        id="password"
                        className='border-b border-gray-500 w-[20vw] mx-20 my-1 p-1 pl-4 '
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='비밀번호를 입력하세요'
                        required /><button
                            className='border border-[#D9D9D9] bg-[#D9D9D9] rounded-full px-20 py-2 \
                text-white hover:border-[#FF8C32] hover:bg-[#FF8C32] transition-color ease-in-out duration-300'
                            onClick={login}>로그인</button><div className='flex flex-row gap-6'>
                        <Link to="/fpass" className="text-[#06113C]">비밀번호 찾기</Link>
                        <Link to="/fid" className="text-[#06113C]">아이디 찾기</Link>
                        <Link to="/register" className="text-[#06113C]">회원가입</Link>
                    </div></>
                    )}
        </div>
    )
}