import React, { useContext, useEffect } from 'react'
import Navbar from './component/Navbar/Navbar.jsx'
import Layout from './component/Layout/Layout.jsx'
import Register from './component/Register/Register.jsx'
import Categories from './component/Categories/Categories.jsx'
//import Logout from './component/Logout/Logout.jsx'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Cart from './component/Cart/Cart.jsx'
import Brands from './component/Brands/Brands.jsx'
import Products from './component/Products/Products.jsx'
import Login from './component/Login/Login.jsx'
import Home from './component/Home/Home.jsx'

import CounterContextProvider from './Context/CounterContext.js'
import NotFound from './component/NotFound/NotFound.jsx';
import  { UserContext } from './Context/UserContext.js'
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './component/ProductDetails/ProductDetails.jsx'
import { Toaster } from 'react-hot-toast'
import WishList from './component/WishList/WishList.jsx'
import { Offline, Online } from "react-detect-offline";
import ShippingAdress from './component/ShippingAdress/ShippingAdress.jsx'
import Allorders from './component/Allorders/Allorders';


export default function App() {

let routers = createHashRouter([
  {path:``,element:<Layout/>,children:[
  {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
  {path:`cart`, element:<ProtectedRoute><Cart/></ProtectedRoute>},
  {path:`products`, element:<ProtectedRoute><Products/></ProtectedRoute>},
  {path:`productdetails/:x`, element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
  {path:`categories`, element:<ProtectedRoute><Categories/></ProtectedRoute>},
  {path:`shippingadress/:cartId`, element:<ProtectedRoute><ShippingAdress/></ProtectedRoute>},
  {path:`wishlist`, element:<ProtectedRoute><WishList/></ProtectedRoute>},
  {path:`allorders`, element:<ProtectedRoute><Allorders/></ProtectedRoute>},
  {path:`brands`, element:<ProtectedRoute><Brands/></ProtectedRoute>},
  {path:`register`, element:<Register/>},
  {path:`login`, element:<Login/>},
  {path:`*`, element:<NotFound/>},


  ]}
])
let {setUserToken , userToken}=useContext(UserContext)
useEffect(() => {
  if(localStorage.getItem('userToken')){
  setUserToken(localStorage.getItem('userToken'))
  //console.log(localStorage.getItem("userToken"));
} 
},[])


  return <>







<div >
      <Offline><div className="loading fw-bold fs-2"><i className='fas fa-wifi'></i> You Are offline </div></Offline>

  </div>

<RouterProvider router={routers} />
<Toaster></Toaster>
 
 
 





  
  </>
}
