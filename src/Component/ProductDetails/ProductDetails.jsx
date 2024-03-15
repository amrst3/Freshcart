import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
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

  const [details, setDetails] = useState({});

  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  async function getProductDetails(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);

    setDetails(data.data);
    setLoading(false);
  }
  useEffect(() => {
    getProductDetails(id);
  }, []);

  let { addToCart, setCount } = useContext(CartContext);
  async function postToCart(id) {
    if (localStorage.getItem("userToken")) {
      let { data } = await addToCart(id);
      if (data.status == "success") {
        setCount(data.numOfCartItems);

        toast.success(data.message, {
          duration: 2000,
        });
      }
    } else {
      toast.error("LogIn In First Please", {
        duration: 2000,
      });
    }
  }
  return (
    <>
      {loading ? (
        <ThreeDots visible={true} height={100} width={100} color="#0aad0a" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="justify-content-center" />
      ) : (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{details.title}</title>
          </Helmet>
          <section className="py-5">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <Slider {...settings}>
                    {details.images.map((image, index) => (
                      <img src={image} key={index} className="w-100" alt={details.title} />
                    ))}
                  </Slider>
                </div>
                <div className="col-md-8">
                  <div className="details">
                    <h3 className="h5">{details.title}</h3>
                    <p className="py-3">{details.description}</p>
                    <span className="font-sm text-main">{details.category.name}</span>
                    <div className="d-flex justify-content-between align-items-center py-3">
                      <span className="font-sm">{details.price} EGP</span>
                      <span className="font-sm">
                        {details.ratingsAverage} <i className="fas fa-star rating-color me-1"></i>
                      </span>
                    </div>
                    <button onClick={() => postToCart(details.id)} className="btn bg-main text-main-light w-100 btn-sm">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
