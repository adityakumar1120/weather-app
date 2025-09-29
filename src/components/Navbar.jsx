import React from "react";

import logo from "../assets/logo.png";
import unitIcon from "../assets/units-icon.svg";
import downArrow from "../assets/down-arrow.svg";
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center pt-4 xs:pt-6 md:pt-12">
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-8 xs:w-10" />
        <span className="text-[var(--color-text)] font-bold text-base xs:text-[22px] font-bricolage">
          Weather Now
        </span>
      </div>
      <div className="flex items-center cursor-pointer gap-2 bg-[var(--color-neutral-800)] text-sm xs:text-base p-2 px-3 xs:py-2 xs:px-4 rounded">
        <img src={unitIcon} alt="change metric" />
        <span className="text-[var(--color-text)] text-base ">
          Units
        </span>
          <img src={downArrow} alt="down-arrow" className=""/>
      </div>
    </nav>
  );
}
