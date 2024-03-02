import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import './Products.css'
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlide/CategorySlider";
import { CartContext } from "../../Context/CartContext";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {

  // const [products, setProducts] = useState(null)

   const {addProductToCart , addFavoriteToWichlist} =  useContext(CartContext)

  async function addProduct(id){
   const res= await addProductToCart(id)
   if(res=== data.data.message){
    console.log("product add successful");
    toast.success('Product Added To Cart Successfully !');

   }else{
    toast.error('Error !');
   }

   }

  async function addFavorite(id){
  const res = await addFavoriteToWichlist(id)
if(res=== data.data.message){
  console.log("favorited Successfully" );
  toast.success("Product added successfully to your wishlist!" );
}
else{
    toast.error('Error !');
}

   }


  async function getProducts(){
    return await axios.get('https://ecommerce.routemisr.com/api/v1/products')
   
      }

 const {isError , isLoading , isFetching , data}=useQuery('getAllProducts' ,getProducts)

//  console.log(isError , "iserror");
//  console.log(isLoading , "isLoading");
//  console.log(isFetching , "isFetching");
//  console.log(data, "data");
 


if(isLoading){
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


  return (
    <>

{ <div className="w-75 m-auto  ">

  <div className="row my-4">



    <div className="col-md-10">
  <div className=" mt-5 mx-auto">
<HomeSlider/>
</div>
</div>

<div className="col-md-2 mt-5 ">
  <div>
    <img  style={{height : "200px"}} className="w-100 p-1" src={require("../../images/blog-img-1.jpeg")} alt="" />
  </div>
  <div>
    <img style={{height : "200px"}}  className="w-100 p-1" src={require("../../images/blog-img-2.jpeg")} alt="" />
  </div>

</div>




  </div>
  <CategorySlider />
      <div className="row p-3 gy-3">
        {data.data.data.map(  (product , idx) =>   <div key={idx} className=" col-sm-12 col-md-6 col-lg-2 mb-3 cstom">
          <div  className="product"  >
          <Link to={`/ProductDetails/${product.id}`}>
          <figure className="image" >
            <img className="w-100" src={product.imageCover} alt={product.title}/>
          </figure>
          </Link>

          <div className="HeartIcon">
        <button onClick={()=> addFavorite(product.id)} className="btn btn-outline-danger">
          <i class="fa-solid fa-heart"></i>
          </button >
          </div>
          <div className="textCutomize">
          <h6 className="text-success">{product.category.name}</h6>
          <p>{product.description.split(' ').slice(0,2).join(' ')}</p>
            </div>
          <div className="priceArea p-1 d-flex align-items-center justify-content-between">

            {product.priceAfterDiscount? 
            <span className="fw-bold text-decoration-line-through">{product.price} - <span >{product.priceAfterDiscount} </span> </span>
            :<span className="fw-bold">{product.price}  EGP   </span>}
          
         
          <span><i className="fa-solid fa-star text-warning"></i>{product.ratingsAverage} </span>
          </div>
          <button onClick={() => addProduct(product.id)} className=" addBtn  btn btn-success w-100">Add +</button>
        </div>
        </div>
        )}
      
       
     
       
      </div>
     </div> 

}


<ToastContainer
        position="top-right"
        theme="light"
        style={{ width: '400px' }}
      />

    </>
  );
}
