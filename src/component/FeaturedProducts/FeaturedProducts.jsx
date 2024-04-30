import React, { useContext, useEffect, useState } from 'react'
import style from './FeaturedProducts.module.css'
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext'
import WishList from './../WishList/WishList';
export default function FeaturedProducts() {

  let { addToWishList} = useContext(WishListContext);


  async function postToWishList(ProductId){
 
   let {data} = await addToWishList(ProductId);
   console.log(data);
   if (data.status =="success"){
    toast.success(data.message , {duration:2000})
    
      }
 
  }
 

  //   const [products, setProducts] = useState([])
  //   const [loading, setLoading] = useState(true)
  //  async  function getProducts (){
  //     let {data}=await 
  // setProducts(data.data)
  // console.log(products);
  // setLoading(false)

  //   }
  //   useEffect(()=>{
  //     getProducts()
  //   },[])

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isFetching, isError, isLoading } = useQuery(`featuredProduct `, getProducts, {
    refetchOnWindowFocus: false,
    
    

  })
  // console.log(data?.data.data);


let {addToCart}=useContext(CartContext)
 

async function postToCart(id){
  let {data }= await addToCart(id);
  console.log(data);
  if (data.status =="success"){
toast.success(data.message , {duration:2000})

  }
}

  return <>

    <h2 className='mb-4'>Product </h2>
    { isLoading ? <>
      <div className=" d-flex justify-content-center align-items-center vh-100">
        <BallTriangle
          height={ 100 }
          width={ 100 }
          radius={ 5 }

          ariaLabel="ball-triangle-loading"
          wrapperStyle={ {} }
          wrapperClass=" text-main"
          visible={ true }
        />
      </div>
    </> :
      <div className="row gy-4">
        { data?.data.data.map((product , index ) => 


          <div key={index} className="col-lg-2 ">


            <div className="product p-2">
              <Link to={ `/productdetails/${product.id}` } >
                <img src={ product.imageCover } className='w-100' alt={ product.title } />
                <span className='text-main font-sm'>{ product.category.name }</span>
                <h3 className='h5'>{ product.title.split(` `).splice(0, 2).join(` `) }</h3>
                <div className="d-flex justify-content-between align-items-center">
                  <span className='font-sm'>{ product.price }EGP</span>
                  <span className='font-sm'><i className='fas fa-star rating-color me-1' ></i> { product.ratingsAverage
                  }</span>
                </div>
              </Link>
              
             <div className='d-flex justify-content-between'>
             <button onClick={()=> postToCart(product.id)}  className='btn bg-main text-main-light w-100 btn-sm mt-2 '> Add To Cart </button>

             <button onClick={()=> postToWishList(product.id)}  className='btn  text-main-light  btn-sm mt-2   text-muted  '> <i className='fa fa-heart'></i> </button>

             </div>
              
            </div>
          </div>

        ) }
      </div> }

  </>
}
