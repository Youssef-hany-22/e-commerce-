import React, { useEffect, useState,useContext } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {BallTriangle} from 'react-loader-spinner'
import Slider from "react-slick";

import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext'


export default function ProductDetails() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:2000,
    infinite:true,
  };
  const [details, setDetails] = useState([])
  const [loading, setLoading] = useState(true)
  let {x} = useParams()
  //console.log(x);
  useEffect( ()=>{
    getProductDetails(x)
  }
  ,[])
 async function getProductDetails(x){
let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x}`)
setDetails(data.data)
setLoading(false)
//console.log(data);
}
let {addToCart}=useContext(CartContext)
 

async function postToCart(id){
  let {data }= await addToCart(id);
  console.log(data);
  if (data.status =="success"){
toast.success(data.message , {duration:2000})

  }
}
let { addToWishList} = useContext(WishListContext);


async function postToWishList(ProductId){

 let {data} = await addToWishList(ProductId);
 console.log(data);
 if (data.status =="success"){
  toast.success(data.message , {duration:2000})
  
    }

}

  return <>
 {loading?<>
  <div className=" d-flex justify-content-center align-items-center vh-100">
  <BallTriangle
  height={100}
  width={100}
  radius={5}

  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=" text-main"
  visible={true}
  />
  </div>
  </>:<>
  <div className="row  m-5   align-items-center">
<div className="col-md-4">
<Slider {...settings}>
     {details.images.map( (image, index) =><img src={image}  key={index} className='w-100' alt={details.title} />)}
    </Slider>
</div>
<div className="col-md-8">
<div className="details">
   
       <h3 className='h5'>{details.title}</h3>
       <p>{details.description}</p>     
       <span className='text-main font-sm'>{details.category.name}</span>  
    <div className="d-flex justify-content-between align-items-center">
<span className='font-sm'>{details.price}EGP</span>
<span className='font-sm'><i className='fas fa-star rating-color me-1' ></i> {details.ratingsAverage
}</span>
    </div>
    <div className='d-flex justify-content-around mt-4'>
             <button onClick={()=> postToCart(details.id)}  className='btn bg-main text-main-light w-75 btn-sm mt-2 '> Add To Cart </button>

             <button onClick={()=> postToWishList(details.id)}  className='btn  text-main-light  btn-sm mt-2    text-muted  '> <i className='fa fa-heart ' ></i> </button>

             </div>
     </div>


</div>
  </div>





</>
 }
</>
}
