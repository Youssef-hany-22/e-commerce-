import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {BallTriangle} from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
 
const [loading, setLoading] = useState(false)
const [apiError, setApiError] = useState(null)
let  navigate = useNavigate()
async function registerSumbit(values){
// console.log(values);
// console.log(formik);
setLoading(true)
let {data }= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
.catch((err)=>{setApiError(err.response.data.message)
setLoading(false)
})
console.log(data);
if (data.message == "success")
{setLoading(false)
navigate("/login")
}
}
// function validate( values){
// let errors ={}

// if(!values.name){
//   errors.name="name is required"
// }
// else if(values.name.length <3){
//   errors.name ="min is 3"
// }
// else if(values.name.length >10){
//   errors.name="max is 10"
// }
// if(!values.password){
//   errors.password="password is required"
// }
// else if (/^[A-Z][\w @]{5,8}$/.test(values.password)){
//   errors.password="password invalid ex:Youssef123"
// }


// return errors
// }
let validationSchema=Yup.object({
  name: Yup.string().required("name is required").min(3,"min is 3").max(10," max is 10"),
  email:Yup.string().required("email is required ").email("invalid email"),
  password:Yup.string().required("password is required ").matches(/^[A-Z][ \w @]{5,8}$/ , "invalid password ex (Youssef123)"),
  rePassword:Yup.string().required("rePassword is required ").oneOf([Yup.ref("password")] , "password and rePassword must be match"),
  phone:Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/ , "we need Egypt number")

})
let formik =useFormik({
initialValues:{
  name:"",
  email:"",
  password:"",
  rePassword:"",
  phone:""  

},validationSchema
,onSubmit:registerSumbit


})


  return<>
<div className="w-75 mx-auto py-5  ">
  <h2 >Register Now</h2>
  <form onSubmit={formik.handleSubmit}>
    {apiError? <div className="alert alert-danger py-2">{apiError}</div>: ""}



<label htmlFor="name">name : </label>
<input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id='name' name='name' className='form-control mb-3' />
{formik.errors.name && formik.touched.name? <div className="alert alert-danger py-2 ">{formik.errors.name} </div>:""}


<label htmlFor="email">email : </label>
<input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='email' name='email' className='form-control mb-3' />
{formik.errors.email && formik.touched.email? <div className="alert alert-danger py-2 ">{formik.errors.email} </div>:""}


<label htmlFor="password">password : </label>
<input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='password' name='password' className='form-control mb-3' />
{formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2 ">{formik.errors.password} </div>:""}

<label htmlFor="rePassword">rePassword : </label>
<input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='rePassword' name='rePassword' className='form-control mb-3' />
{formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger py-2 ">{formik.errors.rePassword} </div>:""}



<label htmlFor="phone">phone : </label>
<input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tell" id='phone' name='phone' className='form-control mb-3' />
{formik.errors.phone && formik.touched.phone? <div className="alert alert-danger py-2 ">{formik.errors.phone} </div>:""}
{loading?<button type='button' className='btn bg-main text-light   ' >
<BallTriangle
  height={25}
  width={25}
  radius={5}
  color="#fff"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
</button>
  :<button disabled={!(formik.isValid&&formik.dirty)} type='sumbit' className='btn bg-main text-light  ' >register</button>
}
<Link className='ps-3 ' to={"/login"}>Login Now</Link>

  
  </form>
</div>



  
  </>
}
