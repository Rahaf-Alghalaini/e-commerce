import { useEffect, useState } from "react"
import { Pro, USER, USERS } from "../../Api/Api"
import Cookie from 'cookie-universal';
import { Axios } from "../../Api/axios";
import { data, Link } from "react-router-dom";
import TableShow from "../../Components/Dashborad/Table";
export default function Users(){
    const[user,setUser]=useState([]);
    const[deleteUser,setDeleteUser]=useState(false);
    const [currentUser,setCurrentUser]=useState("");
    const[page,setPage]=useState(1);
      const [loading,setLoading]=useState(false);
    const [limit,setLimit]=useState(3);
     const [total,setTotal]=useState(0);
 
    const cookie=Cookie();
  // get all users
    useEffect(()=>{
     Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
     .then((data)=>{setUser(data.data.data)
    setTotal(data.data.total)
     })
     .catch(((err)=>console.log(err))).finally(()=>setLoading(false));
    },[page,limit]);
      //get current users
      useEffect(()=>{
        Axios.get(`${USER}`).then((res)=> setCurrentUser(res.data))
      },[]);

      const header=[
    
        { 
          key:"name",
          name:"UserName",

        },
        { 
          key:"email",
          name:"Email",

        },
        { 
          key:"role",//هاد الكي لازم يكون بنفس اسم الموجود بالباك
          name:"Role",

        },
         {
            key:"created_at",
            name:"Created",
        },
        {
            key:"updated_at",
            name:"Last Login",
        },
      ];
      async function handleDelete(id){
       
        try{
         const res= await Axios.delete(`${USER}/${id}`);
          setUser((prev)=>prev.filter((item)=>item.id!==id));
        }catch(err){
         console.log(err);       }
        
     }

 
    return(
    <div className="bg-white w-100 p-2 shadow-sm">
      <div className="d-flex align-items-center justify-content-between">
        <h1>User Page</h1>
        <Link className="btn btn-primary" to="/dashboard/user/add">Add User</Link>
        </div>
        <TableShow header={header}
         data={user} 
          currentUser={currentUser}
          delete={handleDelete}
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          loading={loading}
          total={total}
          search="name"
          searchLink={USER}
          />

     </div>
    
     );
}