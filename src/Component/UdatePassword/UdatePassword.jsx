import React, { useContext, useState } from "react";
import style from "./UdatePassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function UdatePassword() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let navigate = useNavigate();
  let { setUserToken } = useContext(UserContext);

  async function loginSubmit(values) {
    setLoading(true);
    let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values).catch((error) => {
      setApiError(error.response.data.message);
      setLoading(false);
    });
    if (data.token) {
      setLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/");
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().required("Email Is Required").email("Invalid Email"),
    newPassword: Yup.string()
      .required("Password Is Required")
      .matches(/^[A-Z][\w @]{5,8}$/, "Invalid Password"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <section className="w-75 mx-auto py-5">
        <h3 className="h4 fw-bold mb-4">Reset Password</h3>
        <form onSubmit={formik.handleSubmit}>
          {apiError ? <div className="alert alert-danger text-center">{apiError}</div> : ""}
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
              New Password
            </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className="form-control" name="newPassword" id="exampleInputPassword1" />
            {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2">{formik.errors.password}</div> : ""}
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
