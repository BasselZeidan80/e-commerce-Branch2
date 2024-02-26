import React from 'react'
import { Link } from 'react-router-dom'

export default function CartEmpty() {
  return <>
  
  
  <div className="container">
    <div className='d-flex align-items-center justify-content-center flex-column'>

<figure>
    <img className=' w-100' src={require('../../images/emptyCart.png')} alt="emptyPage" />
</figure>
        <h2>Your Cart is Empty </h2>
        <p>Look like you have not added anything to you cart . Go ahead & explore top Categoies.</p>


        <Link to={'/Products'} className='btn btn-success w-50 mb-5' type='button' > Go To Explore</Link>
    </div>
  </div>
  
  </>
}
