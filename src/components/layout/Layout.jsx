import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }) {
  return (
    <div className="">
      <Header />
      <ToastContainer enableMultiContainer={true} position="top-right" />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}
