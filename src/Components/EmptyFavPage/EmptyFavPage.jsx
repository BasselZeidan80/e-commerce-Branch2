import React from 'react'
import './EmptyFavPage.css'

export default function EmptyFavPage() {
  return <>
  
  <div className="container vh-100">
    <div className="imageFav  ">
        <img src={require('../../images/emptyFav.png')} className='w-100' alt="emptyPage" />


<h3 className='mt-5 text-muted'>press on ❤ to add on your wishlist</h3>

    </div>
  </div>
  
  </>
}
