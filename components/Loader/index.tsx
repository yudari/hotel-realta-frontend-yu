import Image from "next/image";
import React from "react";
import HotelRealtaLogo from "@/public/logo-realta.png";

export default function Loader() {
  return (
    <div className="h-screen flex justify-center items-center z-50 bg-gray-100">
      {/* <span className="loader"></span> */}
      <Image
        src={HotelRealtaLogo}
        alt="Hotel Realta Logo"
        width={400}
        height={400}
        className="logo-loader"
      />
    </div>
  );
}
