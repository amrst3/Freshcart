import React from "react";
import style from "./ProductedRoute.module.css";
import { Navigate } from "react-router-dom";

export default function ProductedRoute(props) {
  if (localStorage.getItem("userToken")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
