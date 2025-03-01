import React, { useState, useEffect } from "react";

import Link from "next/link";
import { getCategories } from "../services";

export default function Banner() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);
  return (
    <div className="flex border-b flex-col lg:flex-row lg:space-x-5 justify-between font-bold px-10  mb-10">
      <div>
        <h1 className="text-7xl"> Micmary Weekly Blog</h1>
        <h2 className="mt-2 ">
          Welcome to{" "}
          <span className="underline decoration-4 decoration-[#02a54f]">
            {" "}
            Every Parents{" "}
          </span>{" "}
          favorite blog in the Parentsphere
        </h2>
      </div>
      <p className="mt-5 md:mt-2 text-gray-400 max-w-sm">
        Parenting | Kids | Educational Resources | Weekly challenges and More!
      </p>
    </div>
  );
}
