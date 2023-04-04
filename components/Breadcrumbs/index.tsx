import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ImHome } from "react-icons/im";
import { HiChevronRight } from "react-icons/hi";

export default function Breadcrumb() {
  const router = useRouter();
  const pathnames = router.pathname.split("/").filter((path) => path);

  return (
    <nav className="flex mb-7" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 my-2">
        <li className="inline-flex items-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 text-md underline underline-offset-4"
          >
            <ImHome className="mr-2 text-lg" />
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const capitalizeRoute = name[0].toUpperCase() + name.slice(1);
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

          if (name === "dashboard") {
            return null;
          }

          return (
            <li key={routeTo}>
              <div className="flex items-center">
                <HiChevronRight className="text-2xl text-gray-500" />

                <Link
                  href={routeTo}
                  className={`ml-1 text-md font-medium  md:ml-2 ${
                    router.pathname === routeTo
                      ? "text-gray-500"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                >
                  {capitalizeRoute}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
