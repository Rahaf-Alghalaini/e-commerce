import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { Cat, USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { replace, useNavigate, useParams } from "react-router-dom";

export default function Category(){
    const [title,setTitle]=useState("");
    const [image,setImage]=useState("");
   
    const [disable,setDisable]=useState(true);
    const [loading,setLoading]=useState(false);
    const nav=useNavigate();
    const { id }=useParams();
    
    useEffect(()=>{
        setLoading(true);
     Axios.get(`${Cat}/${id}`).then((data)=>{
      
        setTitle(data.data.title);
    
        setLoading(false);
    })
        .then(()=>setDisable(false)).catch(()=>nav("/dashboard/categories/page/404",{replace:true}));
    },[])
   async function handleSubmit(e)
   {
    setLoading(true);
     e.preventDefault();
     const form=new FormData();
     form.append('title',title);
     form.append('image',image);
     try{
    const res=await Axios.post(`${Cat}/edit/${id}`,form);
    window.location.pathname="/dashboard/categories";
     }catch(err){
        setLoading(false);
      console.log(err);
     }
    }
    return(
        <>
         
         {loading && <LoadingSubmit/>}
        <Form className="bg-white w-100 mx-2 p-2" onSubmit={handleSubmit}>
      
         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
        type="text" 
        required
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        placeholder="title.." />
         </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
         <Form.Label>Image</Form.Label>
        <Form.Control
         type="file" 
         
         onChange={(e)=>setImage(e.target.files.item(0))}
       />
         </Form.Group>
      
         <button disabled={disable} className="btn btn-primary">Save</button>
         </Form>
         </>
     
    );
}