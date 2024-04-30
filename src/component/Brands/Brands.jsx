import React from 'react'
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query';
import style from './Brands.module.css'
export default function Brands() {


  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data, isFetching, isError, isLoading } = useQuery(`brands `, getProducts, {
    refetchOnWindowFocus: false,

  })
  console.log(data?.data.data);

  return<>

  <h2 className='mt-5'>Brands </h2>
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
        { data?.data.data.map((brand , index ) => 


          <div key={index} className="col-lg-3">


            <div className="product p-2 rounded-1">

                <img src={brand.image } className='w-100' alt={brand.name} />
                <p>{brand.name}</p>
             
            </div>
          </div>

        ) }
      </div> }




  </>
}
