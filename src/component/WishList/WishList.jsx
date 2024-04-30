import React, { useContext , useEffect, useState } from 'react'
import style from './WishList.module.css'
import { WishListContext } from '../../Context/WishListContext'
import { BallTriangle } from 'react-loader-spinner'
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
export default function WishList() {
  const [wishlist, setWishlist] = useState(null)
  const [loading, setLoading] = useState(true)
let { getWishList ,deleteWishList}= useContext(WishListContext)

let {addToCart}=useContext(CartContext)
 

async function postToCart(id){
  let {data }= await addToCart(id);
  console.log(data);
  if (data.status =="success"){
    toast.success(data.message , {duration:2000})
    
      }

}



  async function getItems (){
    let {data} = await getWishList();
    console.log(data);
    setWishlist(data)
    setLoading(false)
   } 

   async function deleteItems (id){
    setLoading(true)
    let {data} = await deleteWishList(id);
    
    console.log(data);
   
    
   await getItems()

    setLoading(false)
   } 
   console.log(wishlist);

   useEffect(()=>{
    getItems()
   } , [])
  return<>
   <div className="bg-main-light p-2 mt-5">
  <h2>wishlist</h2>
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

    </div> :<>
    
   {wishlist.data.map(product =>  <div key={product.id} className="row border-1 border-bottom p-2 mt-5 m-0">
      <div className="col-md-1  ">
       <div className="img">
        <img src={product.imageCover} className='w-100' alt={product.category.name}/>
       </div>
      </div>
      <div className="col-md-8">
        <div className="item">
          <p className='h5 fw-bold '>{product.title.split(" ").slice(0,3).join(" ")}</p>
          <p className='text-main'> price : {product.price} EGP</p>
          <button className='btn' onClick={()=>{deleteItems(product.id)}}> <i className='fas fa-trash-can text-danger'></i> remove</button>

        </div>
        </div>
        <div className="col-md-2">
        <button onClick={()=> postToCart(product.id)}  className='btn btn-outline-success  fs-5 fw-bold   btn-sm mt-2 '> Add To Cart </button>

          </div>    
    </div> )}
    
    
    </>
    
    
    
    }
  </div>

  </>
}
