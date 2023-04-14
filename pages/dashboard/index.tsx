import Head from "next/head";
import { FaUser } from "react-icons/fa";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Hotel Realta - Dashboard</title>
      </Head>

      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="bg-white shadow-xl rounded-xl p-4">
            <div className="flex justify-between">
              <div>
                <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase">
                  Example
                </p>
                <h5 className="mb-2 font-bold">$10000</h5>
                <p className="mb-0">
                  <span className="text-sm font-bold leading-normal text-emerald-500">
                    +55%{" "}
                  </span>
                  <span className="text-sm">since yesterday</span>
                </p>
              </div>

              <div className="px-3 text-right">
                <div className="flex justify-center items-center w-12 h-12 text-center rounded-full bg-gradient-to-tl from-blue-500 to-violet-500 text-white">
                  <FaUser className="text-xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-xl p-4">
            <div className="flex justify-between">
              <div>
                <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase">
                  Example
                </p>
                <h5 className="mb-2 font-bold">$10000</h5>
                <p className="mb-0">
                  <span className="text-sm font-bold leading-normal text-emerald-500">
                    +55%{" "}
                  </span>
                  <span className="text-sm">since yesterday</span>
                </p>
              </div>

              <div className="px-3 text-right">
                <div className="flex justify-center items-center w-12 h-12 text-center rounded-full bg-gradient-to-tl from-emerald-500 to-teal-400 text-white">
                  <FaUser className="text-xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-xl p-4">
            <div className="flex justify-between">
              <div>
                <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase">
                  Example
                </p>
                <h5 className="mb-2 font-bold">$10000</h5>
                <p className="mb-0">
                  <span className="text-sm font-bold leading-normal text-emerald-500">
                    +55%{" "}
                  </span>
                  <span className="text-sm">since yesterday</span>
                </p>
              </div>

              <div className="px-3 text-right">
                <div className="flex justify-center items-center w-12 h-12 text-center rounded-full bg-gradient-to-tl from-orange-500 to-yellow-500 text-white">
                  <FaUser className="text-xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-xl p-4">
            <div className="flex justify-between">
              <div>
                <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase">
                  Example
                </p>
                <h5 className="mb-2 font-bold">$10000</h5>
                <p className="mb-0">
                  <span className="text-sm font-bold leading-normal text-emerald-500">
                    +55%{" "}
                  </span>
                  <span className="text-sm">since yesterday</span>
                </p>
              </div>

              <div className="px-3 text-right">
                <div className="flex justify-center items-center w-12 h-12 text-center rounded-full bg-gradient-to-tl from-red-600 to-orange-600 text-white">
                  <FaUser className="text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
