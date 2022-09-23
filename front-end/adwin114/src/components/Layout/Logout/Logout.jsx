import { useLocation, Navigate } from "react-router-dom"

export default function RequireToken(){
    let location = useLocation()
    localStorage.removeItem("access_token");
    localStorage.removeItem("profile_image");
    return <Navigate to='/' state ={{from : location}}/>;
}