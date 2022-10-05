import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {setToken, setProfileImage, fetchToken, fetchUserData, fetchProfileImage, CheckToken } from "Auth";
import {ReactComponent as BunyangmonLogo} from 'images/dragon_color.svg';
import {ReactComponent as PersonSVG} from 'images/person-svgrepo-com.svg';
import axios from "axios";
import {API_ORIGIN} from 'components/APIRequest/APIRequest';

export default function Profile() {
    CheckToken();
    const navigate = useNavigate();
    const userData = fetchUserData();
    const [nickname, setNickname] = useState(userData.nickname);
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [userImage, setUserImage] = useState(fetchProfileImage());
    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setUserImage(reader.result);
                resolve();
            };
        });
    };

    const [nicknameValid, setNicknameValid] = useState([true, ""]);
    const handleNicknameChange = (e) => {
        let nickname_copy = e.target.value;
        nickname_copy = nickname_copy.replace(/[^a-zA-Z\dㄱ-ㅎ가-힣_.]/gi, "");
        setNickname(nickname_copy);
        if (nickname_copy) {
            if (nickname_copy.length < 2) {
                setNicknameValid([false, "닉네임이 너무 짧습니다."]);
                return;
            }
            setNicknameValid([true, "사용 가능합니다."]);
            return;
        }
        setNicknameValid([false, "* 필수 입력 항목입니다."]);
    }
    const [passwordValid, setPasswordValid] = useState([false, "* 필수 입력 항목입니다."]);
    const handlePasswordChange = (e) => {
        let password_copy = e.target.value;
        setPassword(password_copy);
        setPasswordCheck("");
        setPasswordCheckValid([false, "* 필수 입력 항목입니다."]);
        if (password_copy) {
            if (password_copy.length < 8) {
              setPasswordValid([false, "비밀번호는 8자리 이상이어야 합니다."]);
              return;
            }
            else if (!password_copy.match(/[^a-zA-Z\d.]/g)){
              setPasswordValid([false, "비밀번호는 최소 하나의 특수문자가 포함되어야 합니다."]);
              return;
            }
            else {
              setPasswordValid([true, "사용 가능합니다."]);
              return;
            }
        }
        setPasswordValid([false, "* 필수 입력 항목입니다."]);
    }
    const [passwordCheckValid, setPasswordCheckValid] = useState([false, "* 필수 입력 항목입니다."]);
    const handlePasswordCheckChange = (e) => {
        let passworCheck_copy = e.target.value;
        setPasswordCheck(passworCheck_copy);
        if (!passwordValid) {
            setPasswordCheckValid([false, "[]"]);
        }
        if (passworCheck_copy) {
            if (passworCheck_copy === password) {
                setPasswordCheckValid([true, "일치합니다."]);
                return;
            }
            setPasswordCheckValid([false, "비밀번호가 일치하지 않습니다."]);
            return;
        }
        setPasswordCheckValid([false, "* 필수 입력 항목입니다."]);
    }

    const update = () => {
        if (password === "") {
            alert("비밀번호을 입력해주세요.");
            return;
        } else if (password.length < 8) {
            alert("비밀번호는 8자리 이상이어야 합니다.");
            return;
        } else if (!(passwordCheck)) {
            alert("비밀번호 확인란을 입력해주세요");
            return;
        } else if (!(passwordCheck === password)) {
            alert("두 비밀번호가 서로 다릅니다!");
            return;
        } else if (nicknameValid[0]&&passwordValid[0]&&passwordCheckValid[0]) {
            axios
                .patch(`${API_ORIGIN}/users/update`, {
                    nickname: nickname,
                    password: password,
                    password_check: passwordCheck,
                    profile_image: (
                        userImage
                            ? userImage
                            : null
                    )
                })
                .then(function (response) {
                    console.log(response.data, "response.data");
                    // console.log(response.data.access_token, "response.data.access_token");
                    if (response.data.access_token) {
                        setToken(response.data.access_token);
                        setProfileImage(response.data.profile_image);
                        navigate("/profile");
                    }
                })
                .catch(function (error) {
                    console.log("Update error", error);
                });
                return;
        }
        // console.log(usernameVaild[0],emailValid[0],nicknameValid[0],passwordValid[0],passwordCheckValid[0])
        alert("입력 항목들을 다시 확인해주세요");
    };

    return (
        <div
            className='flex flex-col w-screen h-[91vh] mt-[9vh] justify-center items-center gap-10 '>
            {
                fetchToken()
                    ? (
                        <> < div className = 'flex flex-col justify-center items-center w-1/3 h-1/5' > <BunyangmonLogo className='h-full'/>
                    <p className='uppercase'>Bunyangmon</p>
                </div>

                <form className="grid grid-cols-2 gap-4">
                    <div className='flex flex-col justify-center items-center'>
                        <input
                            type="text"
                            id="username"
                            className='border-b border-gray-500 w-[37.5vw] lg:w-[20vw] mx-0 my-1 p-1 pl-4 bg-gray-300'
                            disabled={true}
                            value={userData.username}
                            placeholder='아이디'
                            required="required"
                            minLength={4}
                            maxLength={10}/>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <input
                            type="email"
                            id="email"
                            className='border-b border-gray-500 w-[37.5vw] lg:w-[20vw] mx-0 my-1 p-1 pl-4 bg-gray-300'
                            disabled={true}
                            value={userData.email}
                            placeholder='이메일'
                            required="required"
                            minLength={5}
                            maxLength={40}/>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <input
                            type="text"
                            id="nickname"
                            className='border-b border-gray-500 w-[37.5vw] lg:w-[20vw] mx-0 my-1 p-1 pl-4 '
                            onChange={(e) => handleNicknameChange(e)}
                            value={nickname}
                            placeholder='별명'
                            required="required"
                            minLength={2}
                            maxLength={10}/>
                        <sub
                            className={`float-right self-end mr-10 my-1 ${nicknameValid[0]
                                ? "text-[#88CC88]"
                                : "text-[#EE7777]"}`}>{nicknameValid[1]}</sub>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <input
                            type="password"
                            id="password"
                            className='border-b border-gray-500 w-[37.5vw] lg:w-[20vw] mx-0 my-1 p-1 pl-4 '
                            onChange={(e) => handlePasswordChange(e)}
                            // value={"*".repeat((password.length > 0 ? password.length-1 : 0))+password.slice(-1)}
                            value={password}
                            placeholder='비밀번호'
                            required="required"
                            minLength={8}
                            maxLength={64}/>
                        <sub
                            className={`float-right self-end mr-10 my-1 ${passwordValid[0]
                                ? "text-[#88CC88]"
                                : "text-[#EE7777]"}`}>{passwordValid[1]}</sub>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <input
                            type="password"
                            id="passwordCheck"
                            className='border-b border-gray-500 w-[37.5vw] lg:w-[20vw] mx-0 my-1 p-1 pl-4 '
                            onChange={(e) => handlePasswordCheckChange(e)}
                            value={passwordCheck}
                            placeholder='비밀번호 확인'
                            required="required"
                            minLength={8}
                            maxLength={64}/>
                        <sub
                            className={`float-right self-end mr-10 my-1 ${passwordCheckValid[0]
                                ? "text-[#88CC88]"
                                : "text-[#EE7777]"}`}>{passwordCheckValid[1]}</sub>
                    </div>
                    <label
                        htmlFor="user_image"
                        className='flex border-b border-gray-500 w-[37.5vw] lg:w-[20vw] mx-0 my-1 p-1 pl-4 gap-4'>
                        <label
                            htmlFor="user_image"
                            className='1/2 my-1 flex justify-center mx-auto items-center whitespace-nowrap text-xs lg:text-base'>
                            사용자 이미지 변경
                            <div
                                className="w-16 aspect-square overflow-hidden rounded-full border-black border mx-5 md:mx-0
                                
                                lg:mx-0
                                
                                ">
                                {
                                    userImage
                                        ? <img src={userImage} className="object-cover" alt="preview-img"/>
                                        : <PersonSVG className="w-full h-full object-fill"/>
                                }
                            </div>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            name="user_image"
                            id="user_image"
                            className='w-1/2 my-1 hidden'
                            onChange={(e) => encodeFileToBase64(e.target.files[0])}
                            placeholder='이름'
                            required="required"/>
                    </label>
                </form>

                <button
                    className='border border-[#D9D9D9] bg-[#D9D9D9] rounded-full px-20 py-2 \
                text-white hover:border-pointColor hover:bg-pointColor transition-color ease-in-out duration-300'
                    onClick={update}>정보 수정</button> </>
                    )
                    : ("로그인되어 있지 않습니다!")
            }
        </div>
    );
}