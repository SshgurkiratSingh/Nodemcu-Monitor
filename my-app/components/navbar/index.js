import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 ">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Sensor Live Monitoring
        </Link>
      </div>
      <Link href="/customisation">
        <div className="flex-none">
          <button className="btn  ">Customisation</button>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
