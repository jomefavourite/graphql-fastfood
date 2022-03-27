import React from "react";
import Banner from "../components/Banner";
import Orders from "../components/Orders";

function HomePage({ isAuthenticated, isLoading }) {
  return (
    <>
      <Banner />
      <Orders isAuthenticated={isAuthenticated} isLoading={isLoading} />
    </>
  );
}

export default HomePage;
