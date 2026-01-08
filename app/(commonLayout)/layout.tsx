import React from "react";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
