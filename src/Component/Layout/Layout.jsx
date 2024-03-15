import React from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import { Offline } from "react-detect-offline";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Offline>
        <div className="loading">
          <h2 className="fw-bold">Only shown offline</h2>
        </div>
      </Offline>
      <Outlet></Outlet>
      <Footer />
    </>
  );
}
