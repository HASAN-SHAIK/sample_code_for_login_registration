import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useForm} from 'react-hook-form';

function Adminlogin() {
  let {register,handleSubmit,formState:{errors}}=useForm();

  const onFormSubmit =(userData)=>{
    console.log(userData);
  }
  return (
    <div className="row mt-5">
    <div className="row col-11 col-sm-9 col-md-6 mx-auto">
    <form onSubmit={handleSubmit(onFormSubmit)}>
          <label htmlFor="un">AdminId</label>
          <input type="text" id="un" className='form-control mb-3' {...register("username")}/>
          <label htmlFor="password" >Password</label>
          <input type="text" id="password" className='form-control mb-3' {...register("password")}/>
          <button type="submit" className='btn btn-success w-100 ' >Submit</button>
      </form>
    </div>
    </div>
    
  
    
  
  )
}

export default Adminlogin;