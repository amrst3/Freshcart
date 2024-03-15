import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getCartItem, deleteCartItem, updateCartItem, setCount } = useContext(CartContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getItem() {
    let { data } = await getCartItem();
    setCart(data);
    setLoading(false);
  }
  async function deleteItem(id) {
    // setLoading(true);
    let { data } = await deleteCartItem(id);
    setCart(data);
    setCount(data.numOfCartItems);
    // setLoading(false);
  }
  async function updateItem(id, count) {
    // setLoading(true);
    if (count < 1) {
      let { data } = await deleteCartItem(id);
      setCart(data);
      setCount(data.numOfCartItems);
    } else {
      let { data } = await updateCartItem(id, count);
      setCart(data);
      setCount(data.numOfCartItems);
    }
    // setLoading(false);
  }

  useEffect(() => {
    getItem();
  }, []);

  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="p-2">
            <h3 className="fw-bold mb-4">Cart</h3>
            {loading ? (
              <div className="loading">
                <ThreeDots
                  visible={true}
                  height={100}
                  width={100}
                  color="#0aad0a"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass="justify-content-center"
                />
              </div>
            ) : cart ? (
              <>
                <p className="text-main fw-bold">
                  numOfCartItems : <span className="text-danger">{cart.numOfCartItems}</span>
                </p>
                <p className="text-main fw-bold">
                  totalCartPrice : <span className="text-danger">{cart.data.totalCartPrice} EGP</span>
                </p>
                {cart.data.products.map((product, index) => (
                  <div key={index} className="row align-items-center p-2 m-0 border-1 border-bottom">
                    <div className="col-md-1">
                      <img src={product.product.imageCover} className="w-100" alt={product.product.title} />
                    </div>
                    <div className="col-md-10">
                      <div className="item">
                        <h3 className="h5 fw-bold">{product.product.title.split(" ").slice(0, 3).join(" ")}</h3>
                        <p className="text-main fw-bold">
                          Price : <span className="text-danger">{product.price} EGP</span>
                        </p>
                        <button onClick={() => deleteItem(product.product.id)} className="btn">
                          <i className="fas fa-trash-can text-danger"></i> Remove
                        </button>
                      </div>
                    </div>
                    <div className="col-md-1">
                      <div className="count d-flex">
                        <button onClick={() => updateItem(product.product.id, product.count + 1)} className="btn brdr p-1">
                          +
                        </button>
                        <span className="mx-2 d-flex align-items-center">{product.count}</span>
                        <button onClick={() => updateItem(product.product.id, product.count - 1)} className="btn brdr p-1">
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <Link className="btn bg-main text-light m-3" to={`/shippingaddress/${cart.data._id}`}>
                  online payment
                </Link>
              </>
            ) : (
              <h2>Cart Is Empty ...</h2>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
