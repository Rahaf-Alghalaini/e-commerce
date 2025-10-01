import Cookie from 'cookie-universal';
import { Cat, Pro, PRO } from '../../Api/Api';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Axios } from '../../Api/axios';
import { data, Link } from 'react-router-dom';
import TableShow from '../../Components/Dashborad/Table';
export default function Products(){
    const[products,setProducts]=useState([]);
    const [page,setPage]=useState(1);
      const [loading,setLoading]=useState(false);
    const [limit,setLimit]=useState(3);
      const [total,setTotal]=useState(0);
    
  

  // get all users
    useEffect(()=>{
     Axios.get(`/${PRO}?limit=${limit}&page=${page}`)
     .then((data)=>{setProducts(data.data.data)
         setTotal(data.data.total)
     })
     .catch(((err)=>console.log(err))).finally(()=>setLoading(false));
    },[page,limit]);

  
    const header=[
        {
            key:"images",
            name:"Images",

        },
        {   key:'title',
            name:"Title",
        },
        {   key:"price",
            name:"Price",
        },
        {   key:"description",
            name:"Description",
        },
        {   key:"rating",
            name:"Rating",
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
             const res= await Axios.delete(`${Pro}/${id}`);
              setProducts((prev)=>prev.filter((item)=>item.id!==id));
            }catch(err){
             console.log(err);       }
            
         }


    return(
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products Page</h1>
        <Link className="btn btn-primary" to="/dashboard/category/add">Add Products</Link>
        </div>
       <TableShow header={header}
        data={products}
        delete={handleDelete}
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        loading={loading}
        total={total}
        search="title"
        searchLink={Pro}
        />

     </div>
    );
}