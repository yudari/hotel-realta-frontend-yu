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
import Cookies from "js-cookie";

export default function Layout({ children }: any) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginData, setLoginData] = useState({
    user_role_id: 0,
    user_full_name: "",
  });

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
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isLogin && !localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("login");
      localStorage.removeItem("loginData");
      Cookies.remove("loginData");
      Cookies.remove("token");

      const user = JSON.parse(localStorage.getItem("loginData") || "{}");

      if (!(user.usro_role_id === 1)) {
        router.push("/users/loginEmployee");
      } else {
        router.push("/users/loginGuest");
      }
    }

    setLoginData(JSON.parse(localStorage.getItem("loginData") || "{}"));
    setIsLoading(false);
  }, [isLogin, router]);

  const handleLogout = () => {
    try {
      dispatch(doLogout());
      localStorage.removeItem("login");
      localStorage.removeItem("token");
      localStorage.removeItem("loginData");
      Cookies.remove("loginData");
      Cookies.remove("token");

      if (
        Number(loginData.user_role_id) === 2 ||
        Number(loginData.user_role_id) === 3 ||
        Number(loginData.user_role_id) === 4
      ) {
        router.push("/users/loginEmployee");
      } else {
        router.push("/users/loginGuest");
      }
    } catch (e) {
      return e;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  console.log(showSidebar)
  return (
    <>
      <Navbar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        handleLogout={handleLogout}
        loginData={loginData}
      />
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        loginData={loginData}
      />
      <main
        className={`pt-24 transition-all duration-[400ms] ${showSidebar && !isMobile ? "pl-56" : ""
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

export async function getServerSideProps(context: any) {
  const { req } = context;

  if (!req.cookies["loginData"] || !req.cookies["token"]) {
    return {
      redirect: {
        destination: "/users/loginGuest",
      },
    };
  }
}
