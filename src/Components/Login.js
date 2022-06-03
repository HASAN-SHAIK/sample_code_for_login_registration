import React from 'react'
import {Link, Outlet} from 'react-router-dom';

function Login() {
  return (
    <div className='container m-3'>
    <div className='text-center'>
        <Link to="/login/" className='m-3'><button className='btn btn-success'>User</button></Link>
        <Link to="/login/admin" className='m-3'><button className='btn btn-danger'>Admin</button></Link>
    </div>
    <div className="container text-center mt-5">
        <Outlet/>
    </div>
        
    </div>
  )
}

export default Login