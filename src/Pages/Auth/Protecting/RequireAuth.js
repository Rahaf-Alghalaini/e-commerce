import { Navigate, Outlet, replace, useNavigate } from "react-router-dom";
import Cookie from 'cookie-universal';
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, USER } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import Err403 from "../Errors/403";
export default function RequireAuth({allowedRole}){
    const cookie=Cookie();
    const [user,setUser]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
       axios.get(`${baseUrl}/${USER}`,{headers:{
        Authorization:`Bearer ${token}`,
       }}).then((data)=> setUser(data.data)).catch(()=>Navigate ('/login' ,{replace:true}));
    },[])
    const token =cookie.get('e-commerce');
   
    return token ?( user==="" ?(
    <LoadingSubmit/>):allowedRole.includes(user.role)? (
    <Outlet/>
):(
<Err403 role={user.role}/>
) 
): (<Navigate to={'/login'} replace={true} />);
}