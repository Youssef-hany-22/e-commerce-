import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
  
import FeaturedProducts from './../FeaturedProducts/FeaturedProducts';
import axios from 'axios';

import MainSlider from '../MainSlider/MainSlider';
import CategoriesSlider from './../CategoriesSlider/CategoriesSlider';

export default function Home() {

  
  return <>
  <MainSlider></MainSlider>
<CategoriesSlider></CategoriesSlider>
  <FeaturedProducts></FeaturedProducts>
  </>
}
