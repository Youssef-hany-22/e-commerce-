import axios from "axios";
import { createContext, useState } from "react";




export let CartContext =  createContext();

export default function CartContextProvider(props){
let headers = {
    token:localStorage.getItem('userToken')
} 
   const [cartId, setCartId] = useState(null)
    function chickOutSession(cartid , shippingAddress){
return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:3000` , {
    shippingAddress
} , {
    headers} )
.then((response)=>response)
.catch((err)=>err)

    }
    
    function addToCart(productId){
return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
    productId
} , {
    headers} )
.then((response)=>response)
.catch((err)=>err)


    }

    function getCart(productId){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
            headers} )
        .then((response)=>response)
        .catch((err)=>err)
        
        
            }
        
    function deleteCart(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
            headers} )
        .then((response)=>response)
        .catch((err)=>err)
        
        
            }
    function updataCart(productId , count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
            count
        }, {
            headers} )
        .then((response)=>response)
        .catch((err)=>err)
        
        
            }


return <CartContext.Provider value={{addToCart , getCart , deleteCart , updataCart ,chickOutSession ,cartId,setCartId }} >
    {props.children}
</CartContext.Provider>

}