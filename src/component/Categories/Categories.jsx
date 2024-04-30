import React from 'react'
import style from './Categories.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
export default function Categories() {
  function getCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
 
 let {data}=  useQuery('category' , getCategories)
 console.log(data?.data.data); 
  return<>
  <h2 className='fs-1 pb-3 mt-5'>Categories</h2>

  <div className="row g-5">
   {data?.data.data.map(category =>  <div key={category._id} className="col-md-4 ">
   <div className="product border rounded-2 border-success-subtle
   ">
      <div className="img">
        <img src={category.image} className='w-100 overflow-hidden ' height={400} alt={category.name} />
      </div>
      <div className="title d-flex justify-content-center align-content-center  "  >
        <p  className='pt-4 fs-3 fw-bold text-main'>{category.name}</p>
      </div>
      </div>
    </div>)}

  </div>
  </>
}
