import Cookie from 'cookie-universal';
import { Cat, CATEGORIES } from '../../Api/Api';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Axios } from '../../Api/axios';
import { data, Link } from 'react-router-dom';
import TableShow from '../../Components/Dashborad/Table';
import { PaginatedItems } from './Pagination/Pagination';
import { Form } from 'react-bootstrap';
export default function Categories(){
    const[categories,setCategories]=useState([]);
    const[page,setPage]=useState(1);
    const [limit,setLimit]=useState(5);
    const [loading,setLoading]=useState(false);
    const [total,setTotal]=useState(0);
   
 

  // get all users
    useEffect(()=>{
        setLoading(true);
     Axios.get(`/${CATEGORIES}?limit=${limit}&page=${page}`)
     .then((data)=>{setCategories(data.data.data)
     setTotal(data.data.total)
    })
     
     .catch(((err)=>console.log(err))
    ).finally(()=>setLoading(false));
    },[limit,page]);

  
    const header=[
        {   key:'title',
            name:"Title",
        },
        {   key:"image",
            name:"Image",
        },
        {
            key:"created_at",
            name:"Created",
        },
        {
            key:"updated_at",
            name:"Updated",
        },
    ];



       
        async function handleDelete(id){
           
            try{
             const res= await Axios.delete(`${Cat}/${id}`);
              setCategories((prev)=>prev.filter((item)=>item.id!==id));
            }catch(err){
             console.log(err);       }
            
         }
          

        

    return(
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Categories Page</h1>
        <Link className="btn btn-primary" to="/dashboard/category/add">Add Categories</Link>
        </div>

     
       <TableShow 
       limit={limit}
       setLimit={setLimit}
       page={page}
        header={header} 
        data={categories} 
        delete={handleDelete}
         setPage={setPage}
         loading={loading}
         total={total}
         search="title"
         searchLink={Cat}
      
         />
       

     </div>
    );
}