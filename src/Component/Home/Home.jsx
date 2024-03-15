import React from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import MainSilder from "../MainSilder/MainSilder";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart</title>
      </Helmet>
      <MainSilder />
      <CategoriesSlider />
      <FeaturedProducts />
    </>
  );
}
