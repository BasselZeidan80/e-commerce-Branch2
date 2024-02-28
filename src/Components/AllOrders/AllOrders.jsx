import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner'
import './AllOrders.css'
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
{/*   

  <div className="container">
    <div className="row">
        {AllOrders?.map( (order , idx)=> 
          <div key={idx} className="col-md-6">
            <div className=" order p-2">

                <h2>Order Id : {order.id}</h2>
            <h5>Payment Method: {order.paymentMethodType}</h5>
            <h5>Order Price: {order.totalOrderPrice}</h5>
            <p>this order is delevireng to {order.shippingAddress.city }on Phone Number {order.shippingAddress.phone }with Details : {order.shippingAddress.details}</p>
            <p>delevery status : {order.isDelivered?"yes" : "no"} </p>

            </div>
        </div> 
        
        )}
      
    </div>
  </div> */}





<div className="container">
    <div className="row align-items-center   ">
        {AllOrders?.map( (order , idx)=>   <div key={idx} className="col-lg-6   border-1 justify-content-between   border-black p-3 ">
    <div className="card  ">
    <h2>Order ID : {order.id}</h2>
    <p className='text-success'>Estimated Delivery : {order.createdAt}</p>
    <hr />
            <h4 className='text-success fs-5 mb-4'>Deleviry Status : {order.isDelivered?"Delivered" : "in going"}</h4>

          <div className="design ">
            <div className='imageCst d-flex justify-content-between align-items-center '>
                {/* <img src={require('../../images/banner-4.jpeg')} className='w-100' alt="" /> */}
                
                <img src={order.cartItems.map( (image) => image.product.imageCover )} className='w-50' alt="" />
            {/* <p className='px-2'>{order.cartItems.map( (title) => title.product.title.slice(0,4) )} </p> */}
            </div>
            <p className='text-success fw-bold'>Price : {order.totalOrderPrice} $</p>
            </div>
            <div className="rate d-flex w-25  align-items-center pt-3">
                <p>Star: {order.cartItems.map( (rate) => rate.product.ratingsAverage )} </p>
                <i class="fa-solid fa-star mb-3  px-3 text-warning "></i>
            </div>
            <p className='text-success fw-bold'>Total Price : {order.totalOrderPrice} $ </p>
            <p className='text-danger fw-bold'> Payment Method:  {order.paymentMethodType}</p>
        </div>
        
    </div> )}
      
    </div>
</div>
  
  </>
}
