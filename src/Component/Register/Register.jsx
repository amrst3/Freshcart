import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let navigate = useNavigate();

  async function registerSubmit(values) {
    setLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values).catch((error) => {
      setApiError(error.response.data.message);
      setLoading(false);
    });
    if (data.message === "success") {
      setLoading(false);
      navigate("/login");
    }
  }
  let validationSchema = Yup.object({
    name: Yup.string().required("Name Is Required").min(3, "Min Length Is 3").max(10, "Max Length Is 10"),
    email: Yup.string().required("Email Is Required").email("Invalid Email"),
    password: Yup.string()
      .required("Password Is Required")
      .matches(/^[A-Z][\w @]{5,8}$/, "Invalid Password"),
    rePassword: Yup.string()
      .required("Password Is Required")
      .oneOf([Yup.ref("password")], "Password don't Match"),
    phone: Yup.string()
      .required("Name Is Required")
      .matches(/^01[0125][0-9]{8}$/, "we need eg phone"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <>
      <section className="py-5">
        <div className="w-75 mx-auto">
          <h3 className="h4 fw-bold mb-4">Rejester Now</h3>
          <form onSubmit={formik.handleSubmit}>
            {apiError ? <div className="alert alert-danger text-center">{apiError}</div> : ""}
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className="form-control" name="name" id="exampleInputName" aria-describedby="emailHelp" />
              {formik.errors.name && formik.touched.name ? <div className="alert alert-danger py-2">{formik.errors.name}</div> : ""}
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
              {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2">{formik.errors.email}</div> : ""}
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className="form-control" name="password" id="exampleInputPassword1" />
              {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2">{formik.errors.password}</div> : ""}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputrePassword1" className="form-label">
                rePassword
              </label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className="form-control" name="rePassword" id="exampleInputrePassword1" />
              {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger py-2">{formik.errors.rePassword}</div> : ""}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPhone" className="form-label">
                Phone
              </label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" className="form-control" name="phone" id="exampleInputPhone" />
              {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger py-2">{formik.errors.phone}</div> : ""}
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

            <Link className="ps-3" to={"/login"}>
              Login Now
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}
