import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "@/redux/users/action/loginActionReducers";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { ImHome } from "react-icons/im";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs";

export default function Layout({ children }: any) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: any) => state.loginReducers);
  const router = useRouter();

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
    if (!isLogin || !localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("login");
      router.push("/users/loginEmployee");
    }

    setIsLoading(false);
  }, [isLogin, router]);

  const handleLogout = () => {
    dispatch(doLogout());
  };

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading || !isLogin) {
    return <Loader />;
  }

  return (
    <>
      <Navbar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        handleLogout={handleLogout}
      />
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
