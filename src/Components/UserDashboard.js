import React from 'react';
import { Link } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function UserDashboard() {
  let {userObj} = useSelector(state=>state.user)
  
  return (
    <>
        <div>USerdashboard</div>
        <img src={userObj.user.profileImg} alt="profile image" className='float-end profile-pic m-3'/>
        
    </>
  )
}

export default UserDashboard