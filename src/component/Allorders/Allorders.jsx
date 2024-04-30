import React, { useContext, useEffect, useState } from 'react'
import style from './Allorders.module.css'
import { CartContext } from '../../Context/CartContext'
import { useQuery } from 'react-query'
import axios from 'axios'

import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
export default function Allorders() {

  const [cart, setCart] = useState(null)
  const [isloading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState(null)
  let { getCart}=useContext(CartContext)
  async function getItems (){
    let {data} = await getCart();
    console.log(data);
    setCart(data)
    setIsLoading(false)
    
   await getProducts(data.data.cartOwner)
  
   } 
console.log(cart);
useEffect(()=>{  getItems()},[])
  async  function getProducts(productId) {
    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${productId}`);
    console.log(data);
    setOrders(data.pop())
  }

  function BackToHome() {
    Navigate('/')
  }
  return <>


  <h2 className='text-center mt-3 fw-bolder  pt-3'>Thanks for Order</h2>
  <h4 className='text-center   border-bottom py-3'>Payment completed successfully</h4>




  {isloading ? <div className='vh-100 w-100 d-flex py-5 justify-content-center align-items-center'>
  <BallTriangle
          height={ 100 }
          width={ 100 }
          radius={ 5 }

          ariaLabel="ball-triangle-loading"
          wrapperStyle={ {} }
          wrapperClass=" text-main"
          visible={ true }
        />
  </div> : <>
    <div className='alert alert-success fw-medium fs-5  w-75 mx-auto'>Total Order Price : {orders?.totalOrderPrice} EGP</div>

    <div className="w-75 mx-auto bg-main-light p-3 my-3">
      <h5 className='h6 py-3 m-0 px-0'>what you order : </h5>

      {orders?.cartItems.map((items) => <div key={items._id}>
        <div className='row py-2 border-bottom'>
          <div className="col-md-2 text-center">
            <img height={120} src={items.product.imageCover} alt="" />
          </div>
          <div className="col-md-10">
            <h4>{items.product.title.split(' ').slice(0, 3).join(' ')}</h4>
            <h4 className='h5'>Price : {items.price}</h4>
            <h4 className='h6'>Quantity : {items.count}</h4>
          </div>
        </div>

      </div>)}


      <button onClick={() => BackToHome()} className='btn bg-main text-white w-100 my-2'>Back to Home</button>
    </div>

  </>


  }



</>
}
