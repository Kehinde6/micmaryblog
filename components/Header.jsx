import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../public/logo.jpeg";
import { GiSpiderWeb } from "react-icons/gi";
function handleRedirect() {
  window.location.href = "https://www.micmary school.com";
}

function Header() {
  return (
    <header className="flex items-enter justify-between font-bold px-10 py-5">
      <Link href="/">
        <div className="flex items-center space-x-2">
          <Image
            src={logo}
            width={50}
            height={50}
            className="rounded-full"
            alt="logo"
          />

          <h1 className="text-xl">Micmary School</h1>
        </div>
      </Link>
      <div>
        <button
          onClick={handleRedirect}
          className="flex mr-6 items-center transition duration-500 ease transform hover:-translate-y-1  bg-[#02a54f] text-s font-medium rounded-full text-white p-2 cursor-pointer"
        >
          <GiSpiderWeb />
          Main Website?
        </button>
      </div>
    </header>
  );
}

export default Header;
