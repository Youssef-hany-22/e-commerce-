import React, { useContext } from 'react'
import style from './ShippingAdress.module.css'
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
export default function ShippingAdress() {

 let { chickOutSession }= useContext(CartContext)
  let {cartId }=useParams();
  console.log(cartId  );
   async function checkOut(values){
    let {data} = await chickOutSession(cartId , values)
   // console.log(data);
   if (data.status=="success"){
    window.location.href=data.session.url
   }
  }



  let formik = useFormik(
    {initialValues:{
      details: '',
      phone: '',
      city: ''
    },onSubmit:checkOut

    }
  )
  
  
  
  
  return<>
  <h2>ShippingAdress</h2>
  <div className='w-75 mx-auto'>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="details"> details </label>
      <input type='text' id='details' name='details ' className='form-control mb-3' onChange={formik.handleChange} onBlur={formik.handleBlur} />
      <label htmlFor="phone"> phone </label>
      <input type='tell' id='phone' name='phone ' className='form-control mb-3' onChange={formik.handleChange} onBlur={formik.handleBlur} />
      <label htmlFor="city"> city </label>
      <input type='text' id='city' name='city ' className='form-control mb-3' onChange={formik.handleChange} onBlur={formik.handleBlur} />
<button className='btn bg-main text-light  ' type='submit' >checkOut</button>
    </form>
    
  </div>



  </>
}
