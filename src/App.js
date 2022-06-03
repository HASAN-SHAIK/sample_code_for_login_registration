import {Routes,Route, NavLink} from 'react-router-dom'
import './App.css';
import Home from './Components/Home';
import Contactus from './Components/Contactus';
import Login from './Components/Login'
import Signup from './Components/Signup';
import Userdashboard from './Components/Userlogin';
import Admindashboard from './Components/Adminlogin';
import Usercart from './Components/Usercart';
import Viewproducts from './Components/Viewproducts';
import Addproduct from './Components/Addproduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Container,Nav, NavDropdown } from 'react-bootstrap';
import { useSelector ,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {onLogoutclick} from './slices/userSlice'
import UserDashboard from './Components/UserDashboard';
 
function App() {
  let navigate = useNavigate();
  let  dashboard=true;
  // var profilepic ="<img src={userObj}/>";
  const dispatch = useDispatch();
  const onLogout=()=>{
    console.log("called")
    localStorage.clear();
    dispatch(onLogoutclick())
    navigate('/login')
  }
  let {userObj,isError,isPending,isSuccess,errMsg}=useSelector(state=>state.user);
  return (
    <>
      
      {isSuccess!==true?
      
      <>
  <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand to="">Team -5</Navbar.Brand>
    <Nav className="mx -auto">
      <NavLink className='nav-link' to=''>Home</NavLink>
      <NavLink className='nav-link' to='signup'>Signup</NavLink>
      <NavLink className='nav-link' to='login'>Login</NavLink>
    </Nav>
    </Container>
  </Navbar>
  </>

    :
    <>
   
    <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">Team -5</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
       
        <NavDropdown title={userObj.user.username } id="basic-nav-dropdown">
          <NavDropdown.Item>Change Password</NavDropdown.Item>
          <NavDropdown.Item onClick={onLogout}> Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

    </>


    }
    



    <Routes>
        <Route path="" element={<Home/>}/>
        <Route path="signup" element={ <Signup/>}/>
        <Route path="userDashboard" element={<UserDashboard/>}/>
        <Route path="login" element={<Login/>}>
          <Route path="" element={<Userdashboard/>}>
            
          </Route>
          <Route path="admin" element={<Admindashboard/>}>

          </Route>
        </Route>
        <Route path="contactus" element={<Contactus/>} />
         
      </Routes> 
    </>













  
   
      
//  <div>

// <nav classNameNameName="navbar navbar-expand-lg navbar-light bg-light">
//   <a classNameNameName="navbar-brand" href="#">Deliver</a>
//   <button classNameNameName="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span classNameNameName="navbar-toggler-icon"></span>
//   </button>

//   <div classNameNameName="collapse navbar-collapse" id="navbarSupportedContent">
  
//     <ul classNameNameName="navbar-nav mx-auto">
//       <li classNameNameName="nav-item active">
//         <NavLink classNameNameName="nav-link" to="">Home </NavLink>
//       </li>
//       <li classNameNameName="nav-item active">
//         <NavLink classNameNameName="nav-link" to="signup">Signup </NavLink>
//       </li>
//       <li classNameNameName="nav-item active">
//         <NavLink classNameNameName="nav-link" to="login">Login </NavLink>
//       </li>
//       <li classNameNameName="nav-item active">
//         <NavLink classNameNameName="nav-link" to="contactus">contactUs </NavLink>
//       </li>
//     </ul>
   
//   </div>
// </nav>







    
// </div> 

   






      






   
  );
}

export default App;
