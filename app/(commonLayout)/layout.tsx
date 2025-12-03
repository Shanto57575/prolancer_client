import React from "react";
import Navbar from "@/components/Shared/Navbar";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import Footer from "@/components/Shared/Footer";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let user = null;

  if (accessToken) {
    try {
      user = jwtDecode(accessToken);
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  }

  return (
    <>
      <Navbar user={user} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
