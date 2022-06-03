import React, { useState } from 'react'
import { useForm,formData } from 'react-hook-form';
import { Navbar,Container,Nav,Form } from 'react-bootstrap';
import {MdLogin} from 'react-icons/md';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  let {register,handleSubmit,formState:{errors}}=useForm();
  const navigate=useNavigate();
  let [img,setImg]= useState(null);
  let formData= new FormData();

  const onImageSelect=(event)=>{
    console.log(event.target.files[0]);
    setImg(event.target.files[0]);
  }

  const onFormSubmit=(userData)=>{
    formData.append("userObj",JSON.stringify(userData));
    formData.append("photo",img);
    axios.post('http://localhost:3000/user/createuser',formData)
    .then(response=>{
        console.log("response is ",response);
        if(response.data.message==='User already exists'){
          alert("User already exists");
        }
        
        if(response.data.message==='New user created')
        navigate('/login')
      }
      )
      .catch(err=>console.log("error is",err));
      
  }

  return (

    <div className="row mt-5">
    <h2 className='text-center'>Registration Form</h2>
    <div className="row col-11 col-sm-9 col-md-6 mx-auto">
    <form className='' onSubmit={handleSubmit(onFormSubmit)}>
          <label htmlFor="un">Username</label>
          <input type="text" id="un" className='form-control mb-3' {...register("username",{required:true,minLength:4})}/>
          {/* Adding the error notification for the errors */}
          {errors.username?.type==='required'&& <p className='text-danger'>* This field is required</p>}
          {errors.username?.type==='minLength'&& <p className='text-danger'>* Min length should be 4</p>}

          <label htmlFor="password" >Password</label>
          <input type="password" id="password" className='form-control mb-3' {...register("password",{required:true,minLength:4})}/>
          {/* Adding the error notification for the errors */}
          {errors.password?.type==='required'&& <p className='text-danger'>* This field is required</p>}
          {errors.password?.type==='minLength'&& <p className='text-danger'>* Min length should be 4</p>}
          <label htmlFor="email">Email</label>
          <input type="text" id="email" className='form-control mb-3' {...register("email",{required:true,minLength:4,pattern:{
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}})}/>
        
          {/* Adding the error notification for the errors */}
          {errors.email?.type==='required'&& <p className='text-danger'>* This field is required</p>}
          {errors.email?.type==='minLength'&& <p className='text-danger'>* Min length should be 4</p>}
          {errors.email?.type==='pattern' && <p className='text-danger'>* Email req</p>}
          
          <label htmlFor="img">Profile Image</label>
          <input type="file" name="img" id="img"  {...register("image",{required:true})} onChange={(event)=>{
            onImageSelect(event);
          }}/>
          <div className='text-center'>
          <button type="submit" className="btn btn-success mt-3" >SignUp <MdLogin/></button>
          </div>
          
      </form>
    </div>
    </div>
  )
}

export default Signup
