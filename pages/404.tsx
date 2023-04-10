import Button from "@/components/Button/button";
import Link from "next/link";
import React from "react";

export default function Custom404() {
  return (
    <section className="flex items-center h-screen p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600 text-danger">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl text-primary">
            Sorry, we couldn`t find this page.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400 text-primary">
            But dont worry, you can find plenty of other things on our homepage.
          </p>

          <Link href="/">
            <Button
              label="Back to Homepage"
              size="medium"
              type="secondary"
              variant="primary"
              className="mx-auto"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
