import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
export default function Cart() {
 let  {getCart ,deleteCart , updataCart ,setCartId , cartId}= useContext(CartContext)
console.log(cartId);
const [cart, setCart] = useState(null)
const [loading, setLoading] = useState(true)

async function getItems (){
  let {data} = await getCart();
  console.log(data);
  setCart(data)
  setLoading(false)

 } 

async function deleteItems (id){
  setLoading(true)
  let {data} = await deleteCart(id);
  console.log(data);
  
  setCart(data)
  setLoading(false)
 } 
async function updataItems (id , count){
if(count<1){
  let {data} = await deleteCart(id);
  setCart(data)
} else{
  let {data} = await updataCart(id , count);
  setCart(data)
}
 } 
 
 console.log(cart);
useEffect(()=>{
 getItems()
} , [])
  
  return<>
  <div className="bg-main-light p-2 mt-5">
  <h2>Cart</h2>
    {loading?
     <div className="loading">
      <BallTriangle
          height={ 100 }
          width={ 100 }
          radius={ 5 }

          ariaLabel="ball-triangle-loading"
          wrapperStyle={ {} }
          wrapperClass=" text-main"
          visible={ true }
        />

    </div> : cart? <>
    <p className='text-main'>numOfCartItems: {cart.numOfCartItems}</p>
    <p className='text-main'>totalCartPrice: {cart.data.totalCartPrice} EGP</p>
   {cart.data.products.map(product =>  <div key={product.product.id} className="row border-1 border-bottom p-2 m-0">
      <div className="col-md-1  ">
       <div className="img">
        <img src={product.product.imageCover} className='w-100' alt={product.product.category.name} />
       </div>
      </div>
      <div className="col-md-9">
        <div className="item">
          <p className='h5 fw-bold '>{product.product.title.split(" ").slice(0,3).join(" ")}</p>
          <p className='text-main'> price : {product.price} EGP</p>
          <button className='btn' onClick={()=>{deleteItems(product.product.id)}}> <i className='fas fa-trash-can text-danger'></i> remove</button>

        </div>
        </div>
        <div className="col-md-1 ">
        <button className=' btn border-1  p-2 border-success' onClick={()=>{updataItems(product.product.id,product.count -1)}}>-</button>
          <span className='mx-2' >{product.count}</span>
          <button className=' btn border-1 p-2 border-success' onClick={()=>{updataItems(product.product.id,product.count +1)}}>+</button>
        </div>
    
    </div> )}
    
    <Link to={`/shippingadress/${cart.data._id}`} className='btn bg-main text-light m-3'  > online payment </Link>
    </>
    
    
    :<h2>cart is empty ....</h2>
    }
  </div>
  
  </>
}
