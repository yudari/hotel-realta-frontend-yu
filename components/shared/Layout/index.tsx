import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { ImHome } from "react-icons/im";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs";

export default function Layout({ children }: any) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (innerWidth <= 640) {
      setShowSidebar(false);
      setIsMobile(true);
    } else {
      setShowSidebar(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <main
        className={`pt-24 transition-all duration-[400ms] ${
          showSidebar && !isMobile ? "pl-56" : ""
        }`}
      >
        <div className="mx-4 px-4 py-4 md:px-16">
          <Breadcrumb />

          {children}
        </div>
      </main>
    </>
  );
}
