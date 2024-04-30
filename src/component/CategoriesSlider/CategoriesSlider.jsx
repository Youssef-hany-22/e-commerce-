import React from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick";
export default function CategoriesSlider() {

  function getCategories(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
 
 let {data}=  useQuery('category' , getCategories)
//  console.log(data?.data.data); 
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:2000,
    infinite:true,
  };
  return<>
  <h2>CategoriesSlider</h2>
  <div className="row">
  <Slider {...settings}>
   
    
    {data?.data.data.map(category => <div key={category._id} className="col-md-2">
      <div className="img m-auto">
        <img src={category.image} className='w-100 ' height={200 } alt={category.name} />
        <p className='fw-bold '>{category.name}</p>
      </div>
    </div> )}
    
    </Slider>
  </div>
  </>
}
