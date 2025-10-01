import { useEffect, useRef, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

import LoadingSubmit from "../../Components/Loading/Loading";
import { CATEGORIES, Pro } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { data, useNavigate, useParams } from "react-router-dom";


export default function UpdateProduct(){
 const [form,setForm]=useState({
  category:"Select Category",
  title:"",
  description:"",
  price:"",
  discount:"",
  About:""
 });
 
    const [images,setImages]=useState([]);
    const [imagesFromServer,setImagesFromServer]=useState([]);
    const [loading,setLoading]=useState(false);
    const[categories,setCategories]=useState([]);
    const[idsFromServer,setIdsFromServer]=useState([]);
   
    const [uploading,setUploading]=useState(0);
    
    const nav=useNavigate();
    const progress=useRef([]);
    const {id}=useParams();
    const openImage=useRef(null);
       useEffect(()=>{
         Axios.get(`/${CATEGORIES}`)
         .then((data)=>setCategories(data.data))
         
         .catch(((err)=>console.log(err)));
        },[]);

        useEffect(()=>{
            Axios.get(`/${Pro}/${id}`)
            .then((data)=>{
                setForm(data.data[0]);
             setImagesFromServer(data.data[0].images);
            })
            .catch((err)=>console.log(err));
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
        for(let i=0;i<idsFromServer.length;i++){
            await Axios.delete(`/product-img/${idsFromServer[i]}`).then((data)=>
                console.log(data)
            );
        
           
        }
   
  
    await Axios.post(`${Pro}/edit/${id}`,form);
     nav("/dashboard/products")
     }catch(err){
        setLoading(false);
      console.log(err);
     }
    }
 

      

     async function handleImageChange(e) {
      setImages((prev)=>[...prev,...e.target.files]);
    const imagesAsFile=e.target.files;
      const data=new FormData();
      for(let i=0;i<imagesAsFile.length;i++){
        j.current++;
        data.append("image",imagesAsFile[i]);
        data.append("product_id",id);
        try{
          const res= await Axios.post("/product-img/add",data,{
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
     
     async function handleDeleteImageFromServer(id) {
        setImagesFromServer((prev)=> prev.filter((img)=>img.id !==id));
        setIdsFromServer((prev)=>{
            return[...prev,id];
        }
        );
    }




    async function handleImageDelete(id,file){
      const findId=ids.current[id];
      try{
       const res=await Axios.delete(`/product-img/${findId}`);
       setImages((prev)=>prev.filter((img)=> img !==file));
       ids.current=ids.current.filter((i)=> i!==findId);
       j.current--;
       
      }catch(err){
        console.log(err);
      }
       

     }

    function handleChange(e){
      setForm({...form,[e.target.name]:e.target.value});
     
    
      
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
    const imagesFromServerShow=imagesFromServer.map((img,key)=>(
      
      <div key={key} className="border p-2 col-2 position-relative">
    <div className="d-flex align-items-center jusify-content-start gap-2 ">
      <img src={img.image} className="w-100"></img>
    
    </div>
    <div style={{cursor:"pointer"}}
    className="position-absolute top-0 end-0 bg-danger rounded text-white"
    >
        <p className="py-1 px-2 m-0" onClick={()=>handleDeleteImageFromServer(img.id)}>
            x
    </p>
   
    </div>
    </div>
   
    
));
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
      
    
        
         />
         </Form.Group>

         <div onClick={handleOpenImage}
         className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-2 w-100 flex-column"
         style={{border:   " 2px dashed #0086fe", cursor:"pointer"}}
         >
            <img src={require('../../assets/upload.png')} alt="Upload Here"
            width="100px"
            style={{filter:" #0086fe"}}
            ></img>
            <p className="fw-bold mb-0" style={{color:  "#0086fe"}}>Upload Images</p>
         </div>
         <div className="d-flex align-items-start flex-wrap gap-2"> {imagesFromServerShow}</div>
       <div className="d-flex align-items-start flex-column gap-2"> {imagesShow}</div>

         <button 
          className="btn btn-primary">Save</button>
         </Form>
         </>
     
    );
}