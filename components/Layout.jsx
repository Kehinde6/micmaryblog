import React from "react";
import { Banner, Header } from "./";
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Banner />
      {children}
    </>
  );
};

export default Layout;
