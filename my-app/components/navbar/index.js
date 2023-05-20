import React from "react";

import Link from "next/link";
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 ">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          Sensor Live Monitoring
        </a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square ">Customisation</button>
      </div>
    </div>
  );
};

export default Navbar;
