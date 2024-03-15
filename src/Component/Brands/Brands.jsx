import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getbrands() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    setBrands(data?.data);
    setLoading(false);
  }

  useEffect(() => {
    getbrands();
  }, []);
  return (
    <>
      <section className="py-5">
        <div className="container">
          <h3 className="fw-bold text-center">Brands</h3>
          {loading ? (
            <div className="container">
              <div className="row align-items-center vh-100">
                <ThreeDots visible={true} height={100} width={100} color="#0aad0a" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="justify-content-center" />
              </div>
            </div>
          ) : (
            <div className="row gy-3">
              {brands.map((brands) => (
                <div key={brands?._id} className={`col-md-2 ${style.screenSm}`}>
                  <div className="item text-center">
                    <img src={brands?.image} className="w-100" alt={brands?.name} />
                    <h3 className="h5">{brands?.name}</h3>
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
