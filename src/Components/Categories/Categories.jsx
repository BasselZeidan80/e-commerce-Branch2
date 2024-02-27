import React, { useEffect, useState } from "react";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlide/CategorySlider";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useQuery } from "react-query";
import "./Categories.css"


export default function Categories() {
const [allCategories, setAllCategories] = useState(null)

// function getCategories(){
//   return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`,{
//     headers: {token : localStorage.getItem("token")}
//   }).then(
//     (res)=>{
//       console.log("res ",res.data.data);
//       setAllCategories(res.data.data)
//     }    
//   ).catch(
//       (err)=>{
//         console.log("err " ,err);
//       }
//   )
// }

// useEffect( ()=>{
//   getCategories()
// } )



async function getCategories(){
  return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
 
    }

const {isError , isLoading , isFetching , data}=useQuery('getAllCategories' ,getCategories)

// console.log(isError , "iserror");
// console.log(isLoading , "isLoading");
// console.log(isFetching , "isFetching");
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


<div className="container">

  <div className="row">
    {data.data.data.map( (category , idx) => <div key={idx} className="col-md-3 ccat">
      <div className="category text-center mt-3 p-3">
        
        <figure className="image">
          <img src={category.image} className="w-100" alt={category.name} />
          <div className="layer d-flex align-items-center justify-content-center flex-column">
        <h3 className="text-white">{category.name}</h3>


          </div>
        </figure>
      </div>
    </div> )}
    

  </div>
</div>


   

    </>
  );
}
