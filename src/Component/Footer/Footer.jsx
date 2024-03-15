import React from "react";
import style from "./Footer.module.css";
import amazon from "../../Assets/images/payment/amazon-pay.png";
import express from "../../Assets/images/payment/american-express.png";
import master from "../../Assets/images/payment/card.png";
import paypal from "../../Assets/images/payment/paypal.png";
import googleplay from "../../Assets/images/payment/googleplay.png";
import appstore from "../../Assets/images/payment/appstore.png";

export default function Footer() {
  return (
    <>
      <footer className="pt-5 bg-body-tertiary">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="form pb-4">
                <h5 className="fw-bold">Get the FreshCart App</h5>
                <p>We will send you a link, open it on your phone to download the app</p>
                <form className="d-flex g-1">
                  <input type="email" className="form-control shadow-none" name="email" id="email" placeholder="Email" />
                  <input type="submit" className="form-control font-sm ms-4 bg-main text-main-light btn-sm w-25" name="submit" id="submit" value="Share App" />
                </form>
              </div>
              <div className={`${style.paymentMethod} d-flex justify-content-between py-2 border-top border-bottom`}>
                <div className={`${style.payment} d-flex align-items-center`}>
                  <p className="fw-semibold m-0">Payment Partners</p>
                  <div className={`${style.image} ms-3 d-flex flex-wrap`}>
                    <img src={amazon} className="me-4" alt="amazon" />
                    <img src={express} className="me-4" alt="express" />
                    <img src={master} className="me-4" alt="master" />
                    <img src={paypal} className="me-4" alt="paypal" />
                  </div>
                </div>
                <div className={`${style.app} d-flex align-items-center`}>
                  <p className="fw-semibold m-0">Get deliveries with FreshCart</p>
                  <div className="image ms-3 d-flex flex-wrap">
                    <img src={googleplay} width={64} className="me-4" alt="amazon" />
                    <img src={appstore} width={64} className="me-4" alt="express" />
                  </div>
                </div>
              </div>

              <div className="copyright py-2">
                <p className="mb-0 fw-bold text-center font-sm">All Copyright Reicive 2024</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
