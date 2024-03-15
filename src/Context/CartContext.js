import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [countt, setCount] = useState(0);
  const [wishcount, setWishCount] = useState(0);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }
  function getCartItem() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .then((response) => {
        setCount(response.data.numOfCartItems);
        return response;
      })
      .catch((err) => err);
  }

  useEffect(() => {
    getCartItem();
    getWhishlist();
  }, []);

  function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((err) => err);
  }
  function updateCartItem(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }
  function checkOutSession(cartId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          shippingAddress,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  function getWhishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: headers,
      })
      .then((response) => {
        setWishCount(response.data.count);
        return response;
      })
      .catch((err) => err);
  }
  function addToWhishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }
  function removeFromWhishlist(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((err) => err);
  }
  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartItem,
        deleteCartItem,
        updateCartItem,
        checkOutSession,
        countt,
        setCount,
        getWhishlist,
        addToWhishlist,
        removeFromWhishlist,
        wishcount,
        setWishCount,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
