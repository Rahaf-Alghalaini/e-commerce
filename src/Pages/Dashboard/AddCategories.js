import { useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { Cat } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";


export default function AddCategories(){
    const[title,setTitle]=useState("");
    const [image,setImage]=useState("");
    const [loading,setLoading]=useState(false);
   
  
   async function handleSubmit(e)
   {
    setLoading(true);
     e.preventDefault();
     const form=new FormData();
     form.append('title',title);
     form.append('image',image);
     try{
    const res=await Axios.post(`${Cat}/add`,form);
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
         value={title}
        required
        onChange={(e)=>setTitle(e.target.value)}
        type="text" 
        placeholder="title.."
        
         />
         </Form.Group>
        <Form.Group className="mb-3" controlId="image">
        <Form.Label>Image</Form.Label>
          <FormControl
         
           onChange={(e)=>setImage(e.target.files.item(0))}
            type="file"
          
          
          ></FormControl>
        </Form.Group>
         <button disabled={
            title.length > 1 
            ?false:true
         }
          className="btn btn-primary">Save</button>
         </Form>
         </>
     
    );
}