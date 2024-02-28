import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Circles } from "react-loader-spinner";

export default function CategorySlider() {
  function getCatApiData() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isLoading } = useQuery("CategorySlider", getCatApiData);

  // console.log(data.data);

  if (isLoading) {
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

  var settings = {
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 7,
    // autoplaySpeed: 2000,
    // cssEase: "linear",
    // slidesToScroll: 1,
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <>
      <Slider {...settings}>
        {data.data.data.map((category, idx) => (
          <div key={idx}>
            {/* {console.log(Math.floor(Math.random()*category.image.length))} */}
            {/* <img style={{height: "100px"}} className='w-100' src={ Math.floor(Math.random()*category.image.length) } alt={category.name} /> */}
            <img
              style={{ height: "200px" }}
              className="w-100"
              src={category.image}
              alt={category.name}
            />
            <h5 className="text-center text-bg-dark">{category.name}</h5>
          </div>
        ))}
      </Slider>
    </>
  );
}
