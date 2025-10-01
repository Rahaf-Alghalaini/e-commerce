import axios from "axios"
import { useEffect } from "react"
import { baseUrl, Google_Call_Back } from "../../../Api/Api"
import { useLocation } from "react-router-dom"
import Cookie from 'cookie-universal';

export default function GoogleCallback(){
    const cookie=Cookie();
    const location=useLocation();
    useEffect(()=>{
       async function GoogleCall() {
        try{
          const res= await axios.get(`${baseUrl}/${Google_Call_Back}${location.search}`);
         const token=res.data.access_token;
         cookie.set('e-commerce',token);
        }catch(err){
           console.log(err);
        }
       }
       GoogleCall();
    },[])
    return <h1>test</h1>
}