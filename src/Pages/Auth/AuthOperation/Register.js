import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseUrl, REGISTER } from "../../../Api/Api";
import LoadingSubmit from "../../../Components/Loading/Loading";
import Cookie from 'cookie-universal';
import {Form} from 'react-bootstrap';


export default function Register(){
    const [form,setForm]=useState({
        name:"",
        email:"",
        password:"",
    });
    const [loading,setLoading]=useState(false);
    const cookie=Cookie()
    const[err,setErr]=useState("");
    const focus=useRef("");
    function handleChange(e){
      setForm({...form,[e.target.name]:e.target.value});
        
    }
    async  function handleSubmit(e){
     e.preventDefault();
     setLoading(true);
     try{
      const res=await axios.post(`${baseUrl}/${REGISTER}`, form);
      setLoading(false);
      const token=res.data.token;
      cookie.set('e-commerce',token);
      window.location.pathname='/users';

     }catch(err){
      setLoading(false);
     if(err.response.status=== 422){
      setErr('email is already been taken')
     }else{
      setErr('internal server error')
     }

     }
    }
        useEffect(()=>{
          focus.current.focus();
      },[]);
    return(
      <>
      {loading && <LoadingSubmit/> }
      <div className="container">
  

  <div className="row "style={{height:"100vh"}}>
    <Form className="form " onSubmit={handleSubmit}>
      <div className="custom-form">
        <h1>Register Now</h1>
        <Form.Group className="form-custom" controlId="exampleForm.ControlInput1">
    <Form.Control
    ref={focus}
    value={form.name}
    onChange={handleChange} 
    type="text"
    name="name"
     placeholder="Enter Your name.." 
    required/>
    <Form.Label>Name:</Form.Label>
  </Form.Group>
    <Form.Group className="form-custom" controlId="exampleForm.ControlInput1">
    <Form.Control
    value={form.email}
    onChange={handleChange} 
    type="email"
    name="email"
     placeholder="Enter Your email.." 
    required/>
    <Form.Label>Email:</Form.Label>
  </Form.Group>

   

      <Form.Group className="form-custom" controlId="exampleForm.ControlInput2">
    <Form.Control
    value={form.password}
    onChange={handleChange} 
    type="password" 
    name="password"
    placeholder="Enter Your Password.."
    minLength="6"
    required />
    <Form.Label>Password:</Form.Label>
  </Form.Group>

    
    <button className="btn btn-primary">Register</button>
    <div className="google-btn">
      <a href={`http://127.0.0.1:8000/login-google`}>
      <div class="google-icon-wrapper">
      <img 
      className="google-icon"
      src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
      alt="sign in with google"
      />
      </div>
      <p class="btn-text-custom">
        <b>Register in with Google</b>
      </p>
      </a>

    </div>
    { err!=='' &&<span className="error">{err}</span>}
    </div>
    </Form>
    </div>
    </div>
        </>
    );
}