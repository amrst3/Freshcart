import React, { useState } from "react";
import style from "./VerifyCode.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let navigate = useNavigate();

  async function registerSubmit(values) {
    setLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values).catch((error) => {
      setApiError(error.response.data.message);
      setLoading(false);
    });
    if (data.status === "Success") {
      setLoading(false);
      navigate("/updatepassword");
    }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: registerSubmit,
  });

  return (
    <>
      <section className="w-75 mx-auto py-5">
        <h3 className="h4 fw-bold mb-4">Verify Reset Code</h3>
        <form onSubmit={formik.handleSubmit}>
          {apiError ? <div className="alert alert-danger text-center">{apiError}</div> : ""}

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Enter Reset Code
            </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className="form-control" name="resetCode" id="exampleInputEmail1" aria-describedby="emailHelp" />
            {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2">{formik.errors.email}</div> : ""}
          </div>

          {loading ? (
            <button type="button" className="btn text-light">
              <ThreeDots visible={true} height="30" width="30" color="#0aad0a" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="" />
            </button>
          ) : (
            <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-light">
              Submit
            </button>
          )}
        </form>
      </section>
    </>
  );
}
