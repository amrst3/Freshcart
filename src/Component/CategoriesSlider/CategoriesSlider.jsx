import React from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategoriesSlider() {
  var settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  function getCatergories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data } = useQuery("Categories", getCatergories);
  return (
    <>
      <section className="mt-5">
        <div className="container">
          <h3 className="h4 fw-bold mb-4">Shop Popular Categories</h3>
          <div className="row">
            <Slider {...settings}>
              {data?.data.data.map((category) => (
                <div key={category._id} className="col-md-2">
                  <div className="image text-center">
                    <img src={category.image} height={200} className="w-100" alt={category.name} />
                    <span className="fw-bold">{category.name}</span>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
}
