import React, {useState} from 'react';
import {fetchToken, setToken} from "Auth";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_ORIGIN} from 'components/APIRequest/APIRequest';
import {ReactComponent as AdWinLogo} from 'assets/WINAD.svg';
import {ReactComponent as PersonSVG} from 'images/person-svgrepo-com.svg';

export default function Register() {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [userImage, setUserImage] = useState(null);
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

    const [usernameVaild, setUsernameValid] = useState([false, "* 필수 입력 항목입니다."]);
    const handleUsernameChange = (e) => {
        let username_copy = e.target.value;
        username_copy = username_copy.replace(/[^a-zA-Z\d]/gi, "");
        setUsername(username_copy);
        if (username_copy) {
            if (username_copy.length < 4) {
                setUsernameValid([false, "아이디는 4자리 이상이어야 합니다."]);
                return;
            }
            axios
                .get(`${API_ORIGIN}/auth/check_username/${username_copy}`)
                .then(function (response) {
                    if (!response.data) {
                        setUsernameValid([false, "동일한 이름의 아이디가 존재합니다."]);
                        return;
                    }
                })
                .catch(function (error) {
                    console.log("error", error);
                    setUsernameValid([false, "아이디 확인에 실패하였습니다. 잠시후 다시 시도해주세요."]);
                    return;
                });
            setUsernameValid([true, "사용 가능합니다."]);
            return;
        }
        setUsernameValid([false, "* 필수 입력 항목입니다."]);
    }
    const [emailValid, setEmailValid] = useState([false, "* 필수 입력 항목입니다."]);
    const handleEmailChange = (e) => {
        let email_copy = e.target.value;
        email_copy = email_copy.replace(/[^a-zA-Z\d_@.]/gi, "");
        setEmail(email_copy);
        if (email_copy) {
            axios
                .get(`${API_ORIGIN}/auth/check_email/${email_copy}`)
                .then(function (response) {
                    if (!response.data) {
                        setEmailValid([false, "이미 가입된 이메일이 존재합니다."]);
                        return;
                    }
                })
                .catch(function (error) {
                    console.log("error", error);
                    if (error?.response?.data?.detail[0]?.type === "value_error.email") {
                        setEmailValid([false, "유효하지 않은 이메일 양식입니다."]);
                        return;
                    }
                    setEmailValid([false, "이메일 확인에 실패하였습니다. 잠시후 다시 시도해주세요."]);
                    return;
                });
            setEmailValid([true, "사용 가능합니다."]);
            return;
        }
        setEmailValid([false, "* 필수 입력 항목입니다."]);
    }
    const [nicknameValid, setNicknameValid] = useState([false, "* 필수 입력 항목입니다."]);
    const handleNicknameChange = (e) => {
        let nickname_copy = e.target.value;
        nickname_copy = nickname_copy.replace(/[^a-zA-Z\d가-힣_.]/gi, "");
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
    //check to see if the fields are not empty
    const register = () => {
        if (username === "") {
            alert("이름을 입력해주세요.");
            return;
        } else if (nickname === "") {
            alert("별명을 입력해주세요.");
            return;
        } else if (email === "") {
            alert("이메일을 입력해주세요.");
            return;
        } else if (password === "") {
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
        } else if (usernameVaild[0]&&emailValid[0]&&nicknameValid[0]&&passwordValid[0]&&passwordCheckValid[0]) {
            axios
                .post(`${API_ORIGIN}/auth/register`, {
                    nickname: nickname,
                    username: username,
                    email: email,
                    password: password,
                    password_check: passwordCheck,
                    profile_image: (
                        userImage
                            ? userImage
                            : null
                    )
                })
                .then(function (response) {
                    console.log(response, "response");
                    console.log(response.data.token, "response.data.token");
                    if (response.data.token) {
                        setToken(response.data.token);
                        navigate("/profile");
                    }
                })
                .catch(function (error) {
                    console.log("Register error", error);
                });
                return;
        }
        console.log(usernameVaild[0],emailValid[0],nicknameValid[0],passwordValid[0],passwordCheckValid[0])
        alert("입력 항목들을 다시 확인해주세요");
    };

    return (
        <div
            className='flex flex-col w-screen h-[91vh] mt-[9vh] justify-center items-center gap-10 '>
            {
                fetchToken()
                    ? ("이미 로그인되어 있습니다")
                    : (<> < div className = 'flex flex-col justify-center items-center w-1/3 h-1/5' > <AdWinLogo className='h-full'/>
                    <p>ADWIN114</p>
                </div>

                <form className="grid grid-cols-2 gap-4">
                    <div className='flex flex-col justify-center items-center'>
                        <input
                            type="text"
                            id="username"
                            className='border-b border-gray-500 w-[20vw] mx-20 my-1 p-1 pl-4 '
                            onChange={(e) => handleUsernameChange(e)}
                            value={username}
                            placeholder='아이디'
                            required="required"
                            minLength={4}
                            maxLength={20}/>
                        <sub
                            className={`float-right self-end mr-20 my-1 ${usernameVaild[0]
                                ? "text-[#88CC88]"
                                : "text-[#EE7777]"}`}>{usernameVaild[1]}</sub>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <input
                            type="email"
                            id="email"
                            className='border-b border-gray-500 w-[20vw] mx-20 my-1 p-1 pl-4 '
                            onChange={(e) => handleEmailChange(e)}
                            value={email}
                            placeholder='이메일'
                            required="required"
                            minLength={5}
                            maxLength={40}/>
                        <sub
                            className={`float-right self-end mr-20 my-1 ${emailValid[0]
                                ? "text-[#88CC88]"
                                : "text-[#EE7777]"}`}>{emailValid[1]}</sub>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <input
                            type="text"
                            id="nickname"
                            className='border-b border-gray-500 w-[20vw] mx-20 my-1 p-1 pl-4 '
                            onChange={(e) => handleNicknameChange(e)}
                            value={nickname}
                            placeholder='별명'
                            required="required"
                            minLength={2}
                            maxLength={10}/>
                        <sub
                            className={`float-right self-end mr-20 my-1 ${nicknameValid[0]
                                ? "text-[#88CC88]"
                                : "text-[#EE7777]"}`}>{nicknameValid[1]}</sub>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <input
                            type="password"
                            id="password"
                            className='border-b border-gray-500 w-[20vw] mx-20 my-1 p-1 pl-4 '
                            onChange={(e) => handlePasswordChange(e)}
                            // value={"*".repeat((password.length > 0 ? password.length-1 : 0))+password.slice(-1)}
                            value={password}
                            placeholder='비밀번호'
                            required="required"
                            minLength={8}
                            maxLength={64}/>
                        <sub
                            className={`float-right self-end mr-20 my-1 ${passwordValid[0]
                                ? "text-[#88CC88]"
                                : "text-[#EE7777]"}`}>{passwordValid[1]}</sub>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <input
                            type="password"
                            id="passwordCheck"
                            className='border-b border-gray-500 w-[20vw] mx-20 my-1 p-1 pl-4 '
                            onChange={(e) => handlePasswordCheckChange(e)}
                            value={passwordCheck}
                            placeholder='비밀번호 확인'
                            required="required"
                            minLength={8}
                            maxLength={64}/>
                        <sub
                            className={`float-right self-end mr-20 my-1 ${passwordCheckValid[0]
                                ? "text-[#88CC88]"
                                : "text-[#EE7777]"}`}>{passwordCheckValid[1]}</sub>
                    </div>
                    <label
                        htmlFor="user_image"
                        className='flex border-b border-gray-500 w-[20vw]
                        mx-20 my-1 p-1 pl-4 gap-4'>
                        <label
                            htmlFor="user_image"
                            className='1/2 my-1 flex justify-center mx-auto items-center'>
                            사용자 이미지 추가
                            <div
                                className="w-16 aspect-square overflow-hidden rounded-full border-black border mx-5 md:mx-10 lg:mx-20">
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
                text-white hover:border-[#FF8C32] hover:bg-[#FF8C32] transition-color ease-in-out duration-300'
                    onClick={register}>회원가입</button> </>
                    )
            }
        </div>
    )
}