import React from 'react'
import style from './MainSlider.module.css'
import slider1 from '../../Assets/images/slider-image-1.jpeg'
import slider2 from '../../Assets/images/slider-image-2.jpeg'
import slider3 from '../../Assets/images/slider-image-3.jpeg'
import img1 from '../../Assets/images/grocery-banner-2.jpeg'
import img2 from '../../Assets/images/grocery-banner.png'
import Slider from "react-slick";
export default function MainSlider() {

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
  return<>
  <div className="row my-3 gx-0 rounded-1">
    <div className="col-md-9">
<Slider {...settings}>
        <img src={slider1}  className='w-100' height={400}  />
        <img src={slider2}  className='w-100' height={400}  />
        <img src={slider3}  className='w-100' height={400}  />
      </Slider>
    </div>
    <div className="col md 3">
      <img src={img1} className='w-100' height={200} alt="" />
      <img src={img2} className='w-100' height={200} alt="" />
    </div>
  </div>
  </>
}
