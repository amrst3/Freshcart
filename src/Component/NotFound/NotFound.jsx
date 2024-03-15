import React from "react";
import style from "./NotFound.module.css";
import notFound from "../../Assets/images/error.svg";

export default function NotFound() {
  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="notfound text-center">
                <img src={notFound} alt="notFound" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
