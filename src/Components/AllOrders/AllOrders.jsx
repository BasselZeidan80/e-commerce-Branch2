import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner'

export default function AllOrders() {

    const [AllOrders, setAllOrders] = useState(null)

function getUserOrder(){
    const userId = localStorage.getItem("userId")
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    .then( (res)=>{
        console.log("res", res );
        setAllOrders(res.data)
    } )
    .catch( (err)=>{
        console.log("err  ",err);
    } )
}

useEffect( ()=> {
    getUserOrder()
}, [] )


if(!AllOrders){

 return <div className="d-flex vh-100 bg-opacity-50 justify-content-center align-items-center">


    <Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      />
    
    
    </div>
}

  return <>
  

  <div className="container">
    <div className="row">
        {AllOrders?.map( (order , idx)=>   <div key={idx} className="col-md-6">
            <div className=" order bg-info">

            <h5>Payment Method: {order.paymentMethodType}</h5>
            <h5>Order Price: {order.totalOrderPrice}</h5>
            <p>this order is delevireng to {order.shippingAddress.city }on Phone Number {order.shippingAddress.phone }with Details : {order.shippingAddress.details}</p>
            </div>
        </div>  )}
      
    </div>
  </div>
  
  </>
}
