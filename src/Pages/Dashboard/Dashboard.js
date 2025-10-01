import SideBar from '../../Components/Dashborad/SideBar';
import TopBar from '../../Components/Dashborad/TopBar';

import './dashboard.css';
import { Outlet } from "react-router-dom";
export default function Dashboard(){
    return (<div className="position-relative dasboard d-flex gap-1">
        <TopBar />
        <div className='dasboard d-flex gap-1' style={{marginTop:'70px'}}>
        <SideBar/>
        <Outlet/>
        </div>
    </div>
    );
}