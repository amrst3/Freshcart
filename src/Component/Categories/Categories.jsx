import React, { useEffect, useState } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function Categories() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCatergories() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategory(data?.data);
    setLoading(false);
  }

  useEffect(() => {
    getCatergories();
  }, []);
  return (
    <>
      <section className="py-5">
        <div className="container">
          <h3 className="h4 fw-bold mb-4">Categories</h3>
          {loading ? (
            <div className="container">
              <div className="row align-items-center vh-100">
                <ThreeDots visible={true} height={100} width={100} color="#0aad0a" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="justify-content-center" />
              </div>
            </div>
          ) : (
            <div className="row gy-3">
              {category.map((category) => (
                <div key={category?._id} className={`col-md-3 ${style.screenSm}`}>
                  <div className="item text-center">
                    <img src={category?.image} width={200} height={200} className="w-100" alt={category?.name} />
                    <h3 className="h5 fw-bold">{category?.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
