import React, { useContext, useEffect } from 'react'
import './Favorites.css'
import { CartContext } from '../../Context/CartContext';
import { Circles } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import EmptyFavPage from '../EmptyFavPage/EmptyFavPage';


export default function Favorites() {

    const {
        allFavItems,
        numOfFav,
        DeleteFavItem,
      } = useContext(CartContext);
      console.log();

     
      if (!allFavItems) {
        return (
          <div className="d-flex vh-100 bg-opacity-50 justify-content-center align-items-center">
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
        );
      }

 async function deleteMyFavItem(id){
    const res = await DeleteFavItem(id);
    if (res) {
      console.log("deleted fav..");
      toast.success("removed successfully", { position: "top-center" });
    } else {
      toast.error("error try again later", { position: "top-center" });
    }
}



  return <>
  {allFavItems.length ? <div className="w-75 mx-auto">
    <h2 className='pt-5  fw-bold'>FAVORITES: <span className='text-success'>{numOfFav } </span>  </h2>
    <hr className='line ' />

    <div className="row pt-5">
        {allFavItems?.map( (favItem , idx) =>   <div key={idx} className="col-lg-4 mb-2 ">
            <div className="cardFav">
                <figure className='cardImg '>
                    <img src={favItem.imageCover} className='w-100' alt="" />
                </figure>
                <div className="ariaBody">
                <h4>{favItem.title}</h4>
                <i class=" px-1 text-danger fs-3  fa-solid fa-heart"></i>
                </div>
                <div className="ariaBody">
                {/* <h5>{favItem.brand.name} </h5> */}
               <p>{favItem.price}$</p>
                </div>
                {console.log(" favId",favItem.id)}
                <button onClick={()=> deleteMyFavItem(favItem.id)} className='btn btn-outline-danger w-100 mt-2'>Remove</button>
 
            </div>
        </div>  )}
      

      
    </div>
  </div> : <EmptyFavPage /> }
  
  
  </>
}
