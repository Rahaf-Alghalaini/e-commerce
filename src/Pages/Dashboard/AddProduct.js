import { useEffect, useRef, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

import LoadingSubmit from "../../Components/Loading/Loading";
import { CATEGORIES, Pro } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { useNavigate } from "react-router-dom";


export default function AddProduct(){
 const [form,setForm]=useState({
  category:"Select Category",
  title:"",
  description:"",
  price:"",
  discount:"",
  About:""
 });
 const dummyForm={
   category:null,
   title:"dummy",
   description:"dummy",
   price:222,
   discount:0,
   About:"About",
 }
    const [images,setImages]=useState([]);
    const [loading,setLoading]=useState(false);
    const[categories,setCategories]=useState([]);
    const [id,setId]=useState();
    const [uploading,setUploading]=useState(0);
    const[sent,setSent]=useState(false);
    const nav=useNavigate();
    const progress=useRef([]);
    const openImage=useRef(null);
       useEffect(()=>{
         Axios.get(`/${CATEGORIES}`)
         .then((data)=>setCategories(data.data))
         
         .catch(((err)=>console.log(err)));
        },[]);
    
      const j=useRef(-1);
      const ids=useRef([]);
    function handleOpenImage(){
      openImage.current.click();
    }
   async function handleEdit(e)
   {
    setLoading(true);
     e.preventDefault();
   
     try{
   
  
    const res=await Axios.post(`${Pro}/edit/${id}`,form);
     nav("/dashboard/products")
     }catch(err){
        setLoading(false);
      console.log(err);
     }
    }
     async function handleSubmitForm() {
      try{
        
      const res=await Axios.post(`${Pro}/add`,dummyForm);
      setId(res.data.id);
      }catch(err)


      {
         console.log(err);
      }
     }

      

     async function handleImageChange(e) {
      setImages((prev)=>[...prev,...e.target.files]);
    const imagesAsFile=e.target.files;
      const data=new FormData();
      for(let i=0;i<=imagesAsFile.length;i++){
        j.current++;
        data.append("image",imagesAsFile[i]);
        data.append("product_id",id);
        try{
          const res= await Axios.post("product-img/add",data,{
            onUploadProgress:(ProgressEvent)=>{
              const{loaded,total}=ProgressEvent;
              const percent=Math.floor((loaded * 100)/total);
              if(percent % 10 === 0 ){
                progress.current[j.current].style.width=`${percent}%`;
                progress.current[j.current].setAttribute('percent',`${percent}%`);
              }
             
           
             
            },
          });
          ids.current[j.current]=res.data.id;
        }catch(err){
          console.log(err);
        }
      }
     }

    async function handleImageDelete(id,img){
      const findId=ids.current[id];
      try{
       const res=await Axios.delete(`product-img/${findId}`);
       setImages((prev)=>prev.filter((image)=> image !==image));
       ids.current=ids.current.filter((i)=> i!==findId);
       --j.current;
       
      }catch(err){
        console.log(err);
      }
       

     }

    function handleChange(e){
      setForm({...form,[e.target.name]:e.target.value});
      setSent(1);
      if(sent !== 1){
         handleSubmitForm();
      }
      
    }
    const categoriesShow=categories.map((item,key)=>(
      <option key={key} value={item.id}>{item.title}</option>
    ));
    const imagesShow=images.map((img,key)=>
      <div className="border p-2 w-100">
        <div className="d-flex align-items-center jusify-content-between">
      <div className="d-flex align-items-center jusify-content-start gap-2 ">
        <img src={URL.createObjectURL(img)} width="80px"></img>
        <div>
         <p className="mb-1">{img.name}</p>
         <p>{(img.size / 1024).toFixed(2)}KB</p>
        </div>
      </div>
      <Button onClick={()=>handleImageDelete(key,img)} variant="danger">Delete</Button>
      </div>
      <div className="custom-progress mt-3">
         <span 
         ref={(e)=>(progress.current[key]=e)}
        //  percent={`${progress[key]}%`} style={{width:`${progress[key]}%`}}
          className="inner-progress"></span>
      </div>
      </div>
      
    );
    return(
        <>
         
         {loading && <LoadingSubmit/>}
        <Form className="bg-white w-100 mx-2 p-2" onSubmit={handleEdit} >
        <Form.Group className="mb-3" controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Select
         value={form.category}
    
        onChange={handleChange}
   
           name="category"
        placeholder="category.."
        
         >
          <option disabled>Select Category</option>
          {categoriesShow}
         </Form.Select>
         </Form.Group>
      
         <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
         value={form.title}
        required
        onChange={handleChange}
        type="text" 
           name="title"
        placeholder="title.."
        disabled={!sent}
        
         />
         </Form.Group>
    
         <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
         value={form.description}
        required
        onChange={handleChange}
        type="text"
        name="description" 
        placeholder="Description.."
        disabled={!sent}
        
         />
         </Form.Group>
         <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
         value={form.price}
        required
        onChange={handleChange}
        type="text" 
        name="price"
        placeholder="price.."
        disabled={!sent}
        
         />
         </Form.Group>
         <Form.Group className="mb-3" controlId="discount">
        <Form.Label>Discount</Form.Label>
        <Form.Control
         value={form.discount}
        required
        onChange={handleChange}
        type="text" 
           name="discount"
        placeholder="discount.."
        disabled={!sent}
        
         />
         </Form.Group>
         <Form.Group className="mb-3" controlId="about">
        <Form.Label>About</Form.Label>
        <Form.Control
         value={form.About}
        required
        onChange={handleChange}
        type="text" 
           name="About"
        placeholder="About.."
        disabled={!sent}
        
         />
         </Form.Group>
         <Form.Group className="mb-3" controlId="images">
        <Form.Label>Images</Form.Label>
        <Form.Control
        ref={openImage}
        hidden
        multiple
        onChange={handleImageChange}
        type="file" 
        disabled={!sent}
    
        
         />
         </Form.Group>

         <div onClick={handleOpenImage}
         className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column"
         style={{border: !sent? "2px dashed gray" :   " 2px dashed #0086fe", cursor:sent&& "pointer"}}
         >
            <img src={require('../../assets/upload.png')} alt="Upload Here"
            width="100px"
            style={{filter: !sent &&"grayscale(1)"}}
            ></img>
            <p className="fw-bold mb-0" style={{color:!sent ?"gray" :   "#0086fe"}}>Upload Images</p>
         </div>
       <div className="d-flex align-items-center justify-content-center flex-column gap-2"> {imagesShow}</div>
         <button 
          className="btn btn-primary">Save</button>
         </Form>
         </>
     
    );
}