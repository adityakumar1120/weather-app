import React from "react";

import logo from "../assets/logo.png";
import unitIcon from "../assets/units-icon.svg";
import downArrow from "../assets/down-arrow.svg";
import tickIcon from "../assets/tick.svg";
export default function Navbar() {
  const btnClass =`cursor-pointer text-left px-[8px] py-[10px] hover:bg-[var(--color-neutral-700)] rounded-[8px] font-medium tracking-wide flex justify-between`
  return (
    <nav className="flex justify-between items-center pt-4 xs:pt-6 md:pt-12">
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-8 xs:w-10" />
        <span className="text-[var(--color-text)] font-bold text-base xs:text-[22px] font-bricolage">
          Weather Now
        </span>
      </div>
      {/* dropdown */}
      <div className="bg-[var(--color-bg)] rounded pb-2 relative group">
        <div className="flex items-center cursor-pointer gap-2 bg-[var(--color-neutral-800)] text-sm xs:text-base p-2 px-3 xs:py-2 xs:px-4 rounded ">
          <img src={unitIcon} alt="change metric" />
          <span className="text-[var(--color-text)] text-base ">Units</span>
          <img src={downArrow} alt="down-arrow" className="" />
          {/* dropdown open */}
          <div
            className={`flex-col bg-[var(--color-neutral-800)] p-2 rounded-xl border-1 border-[var(--color-neutral-600)] w-[214px] absolute top-[calc(100%+0px)] right-0  group-hover:flex group-hover:group-hover:flex hidden gap-1`}
          >
            <button
              onClick={(e) => setCurrentDayIdx(i)}
              className={`cursor-pointer text-left px-[8px] py-[10px] hover:bg-[var(--color-neutral-700)] rounded-[8px] font-medium tracking-wide }`}
            >
              Switch to Imperial
            </button>
            <span className="text-sm text-[var(--color-neutral-300)] tracking-wide px-[8px] py-[6px]">
              Temperature
            </span>
            <button
              onClick={(e) => setCurrentDayIdx(i)}
              className={btnClass}
            >
              <span>Celcius (&deg;C)</span>{" "}
              <img className="w-3.5" src={tickIcon} alt="tick-icon" />
            </button>
            <button
              onClick={(e) => setCurrentDayIdx(i)}
              className={btnClass}
            >
              <span>Fahrenheit (&deg;F)</span>{" "}
              <img className="w-3.5" src={tickIcon} alt="tick-icon" />
            </button>
            <span className="text-sm text-[var(--color-neutral-300)] tracking-wide px-[8px] py-[6px]">
              Wind Speed
            </span>
            <button
              onClick={(e) => setCurrentDayIdx(i)}
              className={btnClass}
            >
              <span>Km/h</span>{" "}
              <img className="w-3.5" src={tickIcon} alt="tick-icon" />
            </button><button
              onClick={(e) => setCurrentDayIdx(i)}
              className={btnClass}
            >
              <span>mph</span>{" "}
              <img className="w-3.5" src={tickIcon} alt="tick-icon" />
            </button>
            <span className="text-sm text-[var(--color-neutral-300)] tracking-wide px-[8px] py-[6px]">
              Precipitation
            </span>
            <button
              onClick={(e) => setCurrentDayIdx(i)}
              className={btnClass}
            >
              <span>Millimeters (mm)</span>{" "}
              <img className="w-3.5" src={tickIcon} alt="tick-icon" />
            </button><button
              onClick={(e) => setCurrentDayIdx(i)}
              className={btnClass}
            >
              <span>Inches (in)</span>{" "}
              <img className="w-3.5" src={tickIcon} alt="tick-icon" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
