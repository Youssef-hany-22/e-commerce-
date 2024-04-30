import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {BallTriangle} from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function Login() {
let {setUserToken , userToken}= useContext(UserContext)
const [loading, setLoading] = useState(false)
const [apiError, setApiError] = useState(null)
let  navigate = useNavigate()
async function loginSumbit(values){
// console.log(values);
// console.log(formik);
setLoading(true)
let {data }= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values)
.catch((err)=>{setApiError(err.response.data.message)
setLoading(false)
})
//console.log(data);
if (data.message == "success")
{setLoading(false)
  localStorage.setItem('userToken' , data.token)
  setUserToken(data.token)
  console.log(userToken);
navigate("/")
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
  email:Yup.string().required("email is required ").email("invalid email"),
  password:Yup.string().required("password is required ").matches(/^[A-Z][ \w @]{5,8}$/ , "invalid password ex (Youssef123)"),


})
let formik =useFormik({
initialValues:{
  email:"",
  password:"",
  

},validationSchema
,onSubmit:loginSumbit


})


  return<>
<div className="w-75 mx-auto py-5  ">
  <h2 >login Now</h2>
  <form onSubmit={formik.handleSubmit}>
    {apiError? <div className="alert alert-danger py-2">{apiError}</div>: ""}



<label htmlFor="email">email : </label>
<input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='email' name='email' className='form-control mb-3' />
{formik.errors.email && formik.touched.email? <div className="alert alert-danger py-2 ">{formik.errors.email} </div>:""}


<label htmlFor="password">password : </label>
<input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='password' name='password' className='form-control mb-3' />
{formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2 ">{formik.errors.password} </div>:""}

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
  :<button disabled={!(formik.isValid&&formik.dirty)} type='sumbit' className='btn bg-main text-light  ' >login</button>
}
<Link className='ps-3 ' to={"/register"}>register Now</Link>
  
  </form>
</div>



  
  </>
}
