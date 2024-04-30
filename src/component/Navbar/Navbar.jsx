import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './Navbar.module.css'
import logo from '../../Assets/images/freshcart-logo.svg'
import Categories from './../Categories/Categories';

import { UserContext , setUserContext} from '../../Context/UserContext';

export default function Navbar() {


let {userToken , setUserToken}=useContext(UserContext)
let  navigate = useNavigate()
function logout(){
  localStorage.removeItem("userToken")
  setUserToken(null)
  navigate("/login")
}


  return<>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to={"/"}>
      <img src={logo} alt="freshcart" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {userToken !=null? <>
          <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/"}>Home </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"cart"}>Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"products"}>product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"categories"}>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"wishlist"}>WishList</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"brands"}>Brands</Link>
        </li>
     
        </> : "" }
        
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex align-items-center">
         <i className='fab fa-instagram me-3'></i>
          <i className='fab fa-facebook me-3'></i>
          <i className='fab fa-tiktok me-3'></i>
          <i className='fab fa-twitter me-3'></i>
          <i className='fab fa-linkedin me-3'></i>
        
          <i className='fab fa-youtube me-3'></i>
        </li>
        {userToken!=null?<>
          <li className="nav-item">
       <span onClick={logout} className='nav-link cursor-pointer'>logout</span>
        </li> 
        </>:<>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"register"}>Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"login"}>Login </Link>
        </li>
        </>
        }
        
      
      </ul>
    </div>
  </div>
</nav>
  </>
}
