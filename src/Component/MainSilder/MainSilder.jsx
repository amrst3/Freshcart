import React from "react";
import Slider from "react-slick";
import style from "./MainSilder.module.css";
import slide1 from "../../Assets/images/slider-image-1.jpeg";
import slide2 from "../../Assets/images/slider-image-2.jpeg";
import slide3 from "../../Assets/images/slider-image-3.jpeg";
import img1 from "../../Assets/images/grocery-banner.png";
import img2 from "../../Assets/images/grocery-banner-2.jpeg";

export default function MainSilder() {
  var settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <section className={`${style.hero}`}>
        <div className="container">
          <div className="row my-3 gx-0">
            <div className="col-md-9">
              <Slider {...settings}>
                <img src={slide1} className="w-100" height={400} alt="" />
                <img src={slide2} className="w-100" height={400} alt="" />
                <img src={slide3} className="w-100" height={400} alt="" />
              </Slider>
            </div>
            <div className="col-md-3">
              <div className={`${style.image}`}>
                <img src={img1} className="w-100" height={200} alt="" />
                <img src={img2} className="w-100" height={200} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
