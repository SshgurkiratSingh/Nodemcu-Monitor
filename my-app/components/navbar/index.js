import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const Router = useRouter();

  return (
    <div className="navbar bg-base-100 ">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Sensor Live Monitoring
        </Link>
      </div>
      {Router.pathname === "/" ? (
        <>
          <Link href="/customisation">
            <div className="flex-none">
              <button className="btn  ">Customisation</button>
            </div>
          </Link>
          <Link href="/about">
            <div className="flex-none">
              <button className="btn  ">About</button>
            </div>
          </Link>
        </>
      ) : (
        <Link href="/">
          <div className="flex-none">
            <button className="btn  ">Home</button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
