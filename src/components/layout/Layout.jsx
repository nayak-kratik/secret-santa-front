import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
  return (
    <div className="">
      <Header />
      <ToastContainer />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}
