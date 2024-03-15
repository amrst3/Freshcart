import React, { useContext } from "react";
import style from "./ShippingAddress.module.css";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function ShippingAddress() {
  let { checkOutSession } = useContext(CartContext);
  let { cartId } = useParams();

  async function checkOut(values) {
    let { data } = await checkOutSession(cartId, values);
    if (data.status == "success") {
      window.location.href = data.session.url;
    }
  }
  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: checkOut,
  });
  return (
    <>
      <section className="py-5">
        <div className="w-75 mx-auto">
          <h3 className="h4 fw-bold mb-4">ShippingAddress</h3>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="details">details</label>
            <input onChange={formik.handleChange} type="text" name="details" id="details" className="form-control mb-3" />
            <label htmlFor="phone">phone</label>
            <input onChange={formik.handleChange} type="tel" name="phone" id="phone" className="form-control mb-3" />
            <label htmlFor="city">city</label>
            <input onChange={formik.handleChange} type="text" name="city" id="city" className="form-control mb-3" />
            <button className="btn bg-main text-light" type="submit">
              CheckOut
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
