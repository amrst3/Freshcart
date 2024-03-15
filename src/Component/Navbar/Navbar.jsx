import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext.js";
import { CartContext } from "../../Context/CartContext.js";

export default function Navbar() {
  const [scroll, setScroll] = useState("");

  const [isNavCollapsend, setIsNavCollapsend] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsend(!isNavCollapsend);

  let { countt, wishcount } = useContext(CartContext);
  let { userToken, setUserToken } = useContext(UserContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY < 15) {
        setScroll("position-relative");
      } else {
        setScroll("fixed-top");
      }
    });
  }, []);

  return (
    <>
      <nav className={`navbar navbar-expand-lg bg-body-tertiary shadow-sm ${scroll}`}>
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            <img src={logo} alt="fresh Cart" />
          </Link>
          <button
            className={`navbar-toggler border-0 shadow-none  ${isNavCollapsend ? "collapsed" : ""}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={!isNavCollapsend ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isNavCollapsend ? "collapse" : "show collaps"} navbar-collapse`} id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* {userToken != null ? ( */}
              <>
                <li className="nav-item fw-bold font-sm">
                  <Link className="nav-link" to={"/"}>
                    Home
                  </Link>
                </li>
                <li className="nav-item fw-bold font-sm">
                  <Link className="nav-link" to={"products"}>
                    Products
                  </Link>
                </li>
                <li className="nav-item fw-bold font-sm">
                  <Link className="nav-link" to={"categories"}>
                    Categories
                  </Link>
                </li>
                <li className="nav-item fw-bold font-sm">
                  <Link className="nav-link" to={"brands"}>
                    Brands
                  </Link>
                </li>
                <li className="nav-item fw-bold font-sm">
                  <Link className="nav-link" to={"cart"}>
                    Cart
                  </Link>
                </li>
                <li className="nav-item fw-bold font-sm">
                  <Link className="nav-link" to={"wishlist"}>
                    WishList
                  </Link>
                </li>
              </>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className={`nav-item d-flex align-items-center me-2 ${style.social}`}>
                <Link target="_blank" rel="noopener noreferrer" to={"https://www.facebook.com"}>
                  <i className="fa-brands fa-facebook me-3"></i>
                </Link>
                <Link target="_blank" rel="noopener noreferrer" to={"https://www.twitter.com"}>
                  <i className="fa-brands fa-twitter me-3"></i>
                </Link>
                <Link target="_blank" rel="noopener noreferrer" to={"https://www.instagram.com"}>
                  <i className="fa-brands fa-instagram me-3"></i>
                </Link>
                <Link target="_blank" rel="noopener noreferrer" to={"https://www.youtube.com"}>
                  <i className="fa-brands fa-youtube me-3"></i>
                </Link>
                {userToken != null ? (
                  <Link className="position-relative" to={"cart"}>
                    <i className="fa-solid fa-cart-shopping me-3"></i>
                    <span className={`${style.count}`}>{countt}</span>
                  </Link>
                ) : (
                  ""
                )}
                {userToken != null ? (
                  <Link className="position-relative" to={"wishlist"}>
                    <i className="fa-solid fa-heart text-danger"></i>
                    <span className={`${style.count}`}>{wishcount}</span>
                  </Link>
                ) : (
                  ""
                )}
              </li>
              {userToken != null ? (
                <>
                  <li className="nav-item fw-bold font-sm">
                    <span onClick={logOut} className="nav-link cursor-pointer">
                      SignOut
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item fw-bold font-sm">
                    <Link className="nav-link" to={"register"}>
                      Register
                    </Link>
                  </li>
                  <li className="nav-item fw-bold font-sm">
                    <Link className="nav-link" to={"login"}>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
