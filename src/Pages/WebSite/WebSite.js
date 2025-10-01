import { Outlet } from "react-router-dom";
import NavBar from "../../Components/WebSite/NavBar";


export default function WebSite(){
    return <>
    <NavBar/>
    <Outlet/>
    </>
}