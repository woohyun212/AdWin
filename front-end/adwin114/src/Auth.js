import { useLocation,Navigate } from "react-router-dom"
import { Buffer } from "buffer";

export const setToken = (token)=>{
    localStorage.setItem('access_token', token)// make up your own token
}

export const setProfileImage = (profileImage)=>{
    localStorage.setItem('profile_image', profileImage)// make up your own token
}


export const fetchToken = ()=>{
    return localStorage.getItem('access_token')
}

export const fetchProfileImage = ()=>{
    return localStorage.getItem('profile_image')
}

export const fetchUserData = ()=>{
    const token = fetchToken();
    if (token) {
        const userDataString = Buffer.from(token?.split('.')[1], 'base64')?.toString('utf8');
        const userData = JSON.parse(userDataString)
        return userData;
    }
    return {};  
}

export function RequireToken({children}){
    let auth = fetchToken()
    let location = useLocation()

    if(!auth){
        return <Navigate to='/' state ={{from : location}}/>;
    }

    return children;
}
