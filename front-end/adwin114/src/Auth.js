import {useLocation, useNavigate, Navigate} from "react-router-dom"
import {Buffer} from "buffer";

export const setToken = (token) => {
    localStorage.setItem('access_token', token) // make up your own token
}

export const setProfileImage = (profileImage) => {
    localStorage.setItem('profile_image', profileImage) // make up your own token
}

export const fetchToken = () => {
    return localStorage.getItem('access_token')
}

export const fetchProfileImage = () => {
    return localStorage.getItem('profile_image')
}

export const fetchUserData = () => {
    const token = fetchToken();
    if (token) {
        const userDataString = Buffer.from(token?.split('.')[1],'base64')?.toString('utf8');
        const userData = JSON.parse(userDataString)
        return userData;
    }
    return {};
}

export const isTokenExpired = () => {
    if (fetchToken() !== null) {
        var date = new Date();
        if (date.getTime() / 1000 > fetchUserData().exp) {
            return true;
        }
    }
    return false;
};

export const CheckToken = () => {
    // console.log("checking token...");
    if (isTokenExpired()) {
        let navigate = useNavigate
        alert("회원님의 토큰이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("profile_image");
        navigate('/login');
    }
};

export function RequireToken({children}) {
    let auth = fetchToken()
    let location = useLocation()

    if (!auth) {
        return <Navigate to='/' state={{from : location}}/>;
    }

    return children;
}
