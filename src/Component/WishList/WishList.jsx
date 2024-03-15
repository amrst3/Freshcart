import React, { useContext, useEffect, useState } from "react";
import style from "./WishList.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export default function WishList() {
  let { getWhishlist, removeFromWhishlist, addToCart, setCount } = useContext(CartContext);

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(null);

  async function showWhishlist() {
    let { data } = await getWhishlist();
    if (data.status == "success") {
      setCart(data);
      setLoading(false);
    }
  }

  async function removeToWhishlist(id) {
    let { data } = await removeFromWhishlist(id);

    if (data.status == "success") {
      showWhishlist();
      toast.success(data.message, {
        duration: 2000,
      });
    }
  }

  async function postToCart(id) {
    let { data } = await addToCart(id);
    if (data.status == "success") {
      setCount(data.numOfCartItems);

      toast.success(data.message, {
        duration: 2000,
      });
    }
  }

  useEffect(() => {
    showWhishlist();
  }, []);

  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="p-2">
            <h3 className="fw-bold mb-4">WishList</h3>
            {loading ? (
              <div className="loading">
                <ThreeDots visible={true} height={100} width={100} color="#0aad0a" radius="9" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClass="justify-content-center" />
              </div>
            ) : cart ? (
              <>
                <p className="text-main font-sm fw-bold">
                  numOfWishList : <span className="text-danger">{cart.count}</span>
                </p>
                {cart.data.map((product, index) => (
                  <div key={index} className="row align-items-center p-2 m-0 border-1 border-bottom">
                    <div className="col-md-1">
                      <img src={product.imageCover} className="w-100" alt={product.title} />
                    </div>
                    <div className="col-md-9">
                      <div className="item">
                        <h3 className="h5 fw-bold">{product.title.split(" ").slice(0, 3).join(" ")}</h3>
                        <p className="text-main fw-bold">
                          Price : <span className="text-danger">{product.price} EGP</span>
                        </p>
                        <button onClick={() => removeToWhishlist(product._id)} className="btn">
                          <i className="fas fa-trash-can text-danger"></i> Remove
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="add d-flex">
                        <button onClick={() => postToCart(product.id)} className="btn bg-main text-main-light w-100 btn-sm">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h2>WishList Is Empty ...</h2>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
