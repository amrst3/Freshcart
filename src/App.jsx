import React, { Suspense, lazy, useContext, useEffect } from "react";
import Layout from "./Component/Layout/Layout.jsx";
import Home from "./Component/Home/Home.jsx";
// import Categories from "./Component/Categories/Categories.jsx";
import Products from "./Component/Products/Products.jsx";
import Cart from "./Component/Cart/Cart.jsx";
// import Brands from "./Component/Brands/Brands.jsx";
import Register from "./Component/Register/Register.jsx";
import Login from "./Component/Login/Login.jsx";
import NotFound from "./Component/NotFound/NotFound.jsx";
import { RouterProvider, createHashRouter } from "react-router-dom";
// import CounterContextProvider from "./Context/CounterContext.js";
import { UserContext } from "./Context/UserContext.js";
import ProductedRoute from "./Component/ProductedRoute/ProductedRoute.jsx";
import ProductDetails from "./Component/ProductDetails/ProductDetails.jsx";
import { Toaster } from "react-hot-toast";
import ShippingAddress from "./Component/ShippingAddress/ShippingAddress.jsx";
import AllOrders from "./Component/AllOrders/AllOrders.jsx";
import ForgetPassword from "./Component/ForgetPassword/ForgetPassword.jsx";
import VerifyCode from "./Component/VerifyCode/VerifyCode.jsx";
import UdatePassword from "./Component/UdatePassword/UdatePassword.jsx";
// import WishList from "./Component/WishList/WishList.jsx";

const Categories = lazy(() => import("./Component/Categories/Categories.jsx"));
const Brands = lazy(() => import("./Component/Brands/Brands.jsx"));
const WishList = lazy(() => import("./Component/WishList/WishList.jsx"));

export default function App() {
  let routers = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            // <ProductedRoute>
            <Home />
            // </ProductedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProductedRoute>
              <Cart />
            </ProductedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <Suspense fallback={<div className="vh-100 bg-dark text-light">Loading ...</div>}>
              {/* <ProductedRoute> */}
              <Brands />
              {/* </ProductedRoute> */}
            </Suspense>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            // <ProductedRoute>
            <ProductDetails />
            // </ProductedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <Suspense fallback={<div className="vh-100 bg-dark text-light">Loading ...</div>}>
              {/* <ProductedRoute> */}
              <Categories />
              {/* </ProductedRoute> */}
            </Suspense>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProductedRoute>
              <AllOrders />
            </ProductedRoute>
          ),
        },
        {
          path: "shippingaddress/:cartId",
          element: (
            <ProductedRoute>
              <ShippingAddress />
            </ProductedRoute>
          ),
        },
        {
          path: "products",
          element: (
            // <ProductedRoute>
            <Products />
            // </ProductedRoute>
          ),
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forgetpassword",

          element: <ForgetPassword />,
        },
        {
          path: "verifycode",

          element: <VerifyCode />,
        },
        {
          path: "updatepassword",

          element: <UdatePassword />,
        },
        {
          path: "wishlist",

          element: (
            <Suspense fallback={<div className="vh-100 bg-dark text-light">Loading ...</div>}>
              <ProductedRoute>
                <WishList />
              </ProductedRoute>
            </Suspense>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
      <Toaster />
    </>
  );
}
