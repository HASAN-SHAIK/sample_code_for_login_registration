import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useForm} from 'react-hook-form';
import { userlogin } from '../slices/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Userlogin() {
  let navigate = useNavigate()
  let {register,handleSubmit,formState:{errors}} =useForm();
  var {userObj,isError,isPending,isSuccess,errMsg}=useSelector(state=>state.user);
  let dispatch = useDispatch();

  const onFormSubmit =async(userData)=>{
    let user=await dispatch(userlogin(userData));
    if(user.payload.message==='Success')
    navigate('/UserDashboard')
    }
   
  return (
    <div className="row mt-5">
    <div className="row col-11 col-sm-9 col-md-6 mx-auto">
    {errMsg!=="" && <p className='text-danger'>Credentials are wrong</p>}
    <form onSubmit={handleSubmit(onFormSubmit)}>
          <label htmlFor="un">Username</label>
          <input type="text" id="un" className='form-control mb-3' {...register("username",{required:true})}/>
          {/* Handling the username errors */}
          {errors.username?.type==='required'&&<p className='text-danger'>*This feild is required</p>}
          {/* {errMsg==="User does not exists"&&<p className='text-danger'>User doesn't exist</p>} */}
          <label htmlFor="password" >Password</label>
          <input type="password" id="password" className='form-control mb-3' {...register("password",{required:true})}/>
          {errors.password?.type==='required'&&<p className='text-danger'>*This feild is required</p>}
          {/* {errMsg==="Wrong password"&&<p className='text-danger'>Password is not matched</p>} */}
          <button type="submit" className='btn btn-success w-100 ' >Submit</button>
      </form>
    </div>
    </div>
  )
}

export default Userlogin