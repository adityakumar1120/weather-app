import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { changeOneUnit, changeSystem } from "../store/unitSystemSlice";
import { useDispatch, useSelector } from "react-redux";
import DropdownBtn from "./DropdownBtn";
import useClickOutside from "../hooks/useClickOutside";
import { Link } from "react-router";
export default function Navbar() {
  const {
    isSystemMetric,
    oldSystemMetricVal,
    temperature,
    windSpeed,
    precipitation,
  } = useSelector((state) => state.unitSystem);
  const dispatch = useDispatch();
  const changeSingleUnit = (e) => {
    dispatch(
      changeOneUnit({
        trueUnit: e.target.dataset.unit,
        falseUnit: e.target.dataset.unit_to_false,
      })
    );
  };
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    let val = localStorage.getItem("theme");
    if (val) return val;
    return "dark";
  });

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    }
  };
  useClickOutside(".nav-dropdown-wrapper", () => setIsDropDownOpen(false));

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.remove("light");
    } else if (theme === "light") {
      document.body.classList.add("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <nav className="flex justify-between items-center pt-4 xs:pt-6 md:pt-12">
      <div className="flex items-center gap-3">
        <img src={logo} alt="logo" className="w-8 xs:w-10" />
        <span className="text-[var(--color-text)] font-bold text-base xs:text-[22px] font-bricolage">
          Weather Now
        </span>
      </div>
      {/* dropdown */}
      <div className="flex  items-center gap-4 xs:gap-10">
        <Link to="/compare">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-git-compare-icon lucide-git-compare"
          >
            <circle cx={18} cy={18} r={3} />
            <circle cx={6} cy={6} r={3} />
            <path d="M13 6h3a2 2 0 0 1 2 2v7" />
            <path d="M11 18H8a2 2 0 0 1-2-2V9" />
          </svg>
        </Link>
        <Link to="/savedlocations">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-heart-icon lucide-heart"
          >
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
          </svg>
        </Link>
        {theme === "dark" ? (
          <div className="cursor-pointer" onClick={changeTheme}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ff7c0a"
            >
              <path d="M480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-252q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0-200Zm0 340 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z" />
            </svg>
          </div>
        ) : (
          <div className="cursor-pointer" onClick={changeTheme}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M600-640 480-760l120-120 120 120-120 120Zm200 120-80-80 80-80 80 80-80 80ZM483-80q-84 0-157.5-32t-128-86.5Q143-253 111-326.5T79-484q0-146 93-257.5T409-880q-18 99 11 193.5T520-521q71 71 165.5 100T879-410q-26 144-138 237T483-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T463-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T159-484q0 135 94.5 229.5T483-160Zm-20-305Z" />
            </svg>
          </div>
        )}
        {/* dropDown */}
        <div
          onMouseLeave={(e) => setIsDropDownOpen(false)}
          onMouseEnter={(e) => setIsDropDownOpen(true)}
          className="bg-[var(--color-bg)] rounded pb-2 relative group"
        >
          <div className="nav-dropdown-wrapper">
            <div
              onClick={(e) => setIsDropDownOpen((prev) => !prev)}
              className="flex items-center cursor-pointer gap-2 bg-[var(--color-neutral-800)] text-sm xs:text-base p-2 px-3 xs:py-2 xs:px-4 rounded"
            >
              <svg
                className="svg-icon"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.125 7.90625C14.1562 8.3125 14.1562 8.71875 14.125 9.09375L15.125 9.6875C15.4062 9.84375 15.5625 10.1875 15.4688 10.5312C15.125 11.8438 14.4062 13.0312 13.4688 14C13.2188 14.2188 12.8438 14.2812 12.5625 14.125L11.5625 13.5312C11.3125 13.7188 10.8438 14 10.5312 14.125V15.2812C10.5312 15.625 10.3125 15.9062 9.96875 16C8.6875 16.3438 7.28125 16.3438 6 16C5.6875 15.9375 5.4375 15.5938 5.4375 15.2812V14.125C5.125 14 4.65625 13.7188 4.40625 13.5312L3.40625 14.125C3.125 14.2812 2.75 14.2188 2.5 14C1.5625 13.0312 0.84375 11.8438 0.5 10.5312C0.40625 10.1875 0.5625 9.84375 0.84375 9.6875L1.84375 9.09375C1.8125 8.9375 1.8125 8.6875 1.8125 8.5C1.8125 8.34375 1.8125 8.09375 1.84375 7.90625L0.84375 7.34375C0.5625 7.1875 0.40625 6.84375 0.5 6.5C0.84375 5.1875 1.5625 4 2.5 3.03125C2.75 2.8125 3.125 2.75 3.40625 2.90625L4.40625 3.5C4.65625 3.3125 5.125 3.03125 5.4375 2.90625V1.75C5.4375 1.40625 5.65625 1.125 6 1.03125C7.28125 0.6875 8.6875 0.6875 9.96875 1.03125C10.2812 1.09375 10.5312 1.4375 10.5312 1.75V2.90625C10.8438 3.03125 11.3125 3.3125 11.5625 3.5L12.5625 2.90625C12.8438 2.75 13.2188 2.8125 13.4688 3.03125C14.4062 4 15.125 5.1875 15.4688 6.5C15.5625 6.84375 15.4062 7.1875 15.125 7.34375L14.125 7.90625ZM12.4688 9.90625C12.7188 8.59375 12.7188 8.4375 12.4688 7.125L13.8438 6.34375C13.6562 5.78125 13.1562 4.96875 12.7812 4.53125L11.4062 5.3125C10.4375 4.46875 10.2812 4.375 9.03125 3.9375V2.34375C8.75 2.3125 8.28125 2.25 8 2.25C7.6875 2.25 7.21875 2.3125 6.9375 2.34375V3.9375C5.6875 4.375 5.5625 4.46875 4.5625 5.3125L3.1875 4.53125C2.71875 5.0625 2.375 5.6875 2.125 6.34375L3.5 7.125C3.25 8.4375 3.25 8.59375 3.5 9.90625L2.125 10.6875C2.3125 11.25 2.8125 12.0625 3.1875 12.5L4.5625 11.7188C5.53125 12.5625 5.6875 12.6562 6.9375 13.0938V14.6875C7.21875 14.7188 7.6875 14.7812 8 14.7812C8.28125 14.7812 8.75 14.7188 9.03125 14.6875V13.0938C10.2812 12.6562 10.4062 12.5625 11.4062 11.7188L12.7812 12.5C13.1562 12.0625 13.6562 11.25 13.8438 10.6875L12.4688 9.90625ZM8 5.5C9.625 5.5 11 6.875 11 8.5C11 10.1562 9.625 11.5 8 11.5C6.34375 11.5 5 10.1562 5 8.5C5 6.875 6.34375 5.5 8 5.5ZM8 10C8.8125 10 9.5 9.34375 9.5 8.5C9.5 7.6875 8.8125 7 8 7C7.15625 7 6.5 7.6875 6.5 8.5C6.5 9.34375 7.15625 10 8 10Z"
                  fill="white"
                />
              </svg>

              <span className="select-none text-[var(--color-text)] text-base ">
                Units
              </span>

              <svg
                className="svg-icon"
                width="13"
                height="8"
                viewBox="0 0 13 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.30859 6.98438L1.10547 1.81641C0.929688 1.67578 0.929688 1.39453 1.10547 1.21875L1.80859 0.550781C1.98438 0.375 2.23047 0.375 2.40625 0.550781L6.625 4.69922L10.8086 0.550781C10.9844 0.375 11.2656 0.375 11.4062 0.550781L12.1094 1.21875C12.2852 1.39453 12.2852 1.67578 12.1094 1.81641L6.90625 6.98438C6.73047 7.16016 6.48438 7.16016 6.30859 6.98438Z"
                  fill="white"
                />
              </svg>
            </div>
            {/* dropdown open */}
            {isDropDownOpen && (
              <div
                className={`flex flex-col bg-[var(--color-neutral-800)] p-2 rounded-xl border-1 border-[var(--color-neutral-600)] w-[214px] absolute top-[calc(100%+0px)] right-0 gap-1 z-1`}
              >
                <button
                  onClick={() => dispatch(changeSystem())}
                  className={`cursor-pointer text-left px-[8px] py-[10px] hover:bg-[var(--color-neutral-700)] rounded-[8px] font-medium tracking-wide  border-[var(--color-black)]} focus:[box-shadow:0_0_0_3px_var(--color-neutral-900),0_0_0_5px_var(--color-text)] ${
                    isSystemMetric !== null
                      ? "[box-shadow:0_0_0_3px_var(--color-neutral-900),0_0_0_5px_var(--color-text)]"
                      : ""
                  }`}
                >
                  {`Switch to ${oldSystemMetricVal ? "Imperial" : "Metric"}`}
                </button>
                <span className="text-sm text-[var(--color-neutral-300)] tracking-wide px-[8px] py-[6px] border-t-1 border-[var(--color-neutral-600)]">
                  Temperature
                </span>
                <DropdownBtn
                  dataSet={"temperature.isCelsius"}
                  handleClick={changeSingleUnit}
                  unitToFalse={"temperature.isFahrenheit"}
                  isUnitTrue={temperature.isCelsius}
                  unitName={<>Celsius (&deg;C)</>}
                />
                <DropdownBtn
                  dataSet={"temperature.isFahrenheit"}
                  handleClick={changeSingleUnit}
                  unitToFalse={"temperature.isCelsius"}
                  isUnitTrue={temperature.isFahrenheit}
                  unitName={<>Fahrenheit (&deg;C)</>}
                />
                <span className="text-sm text-[var(--color-neutral-300)] tracking-wide px-[8px] py-[6px] border-t-1 border-[var(--color-neutral-600)]">
                  Wind Speed
                </span>
                <DropdownBtn
                  dataSet={"windSpeed.isKmph"}
                  handleClick={changeSingleUnit}
                  unitToFalse={"windSpeed.isMph"}
                  isUnitTrue={windSpeed.isKmph}
                  unitName={"Km/h"}
                />
                <DropdownBtn
                  dataSet={"windSpeed.isMph"}
                  handleClick={changeSingleUnit}
                  unitToFalse={"windSpeed.isKmph"}
                  isUnitTrue={windSpeed.isMph}
                  unitName={"mph"}
                />

                <span className="text-sm text-[var(--color-neutral-300)] tracking-wide px-[8px] py-[6px] border-t-1 border-[var(--color-neutral-600)]">
                  Precipitation
                </span>
                <DropdownBtn
                  dataSet={"precipitation.isMillimeters"}
                  handleClick={changeSingleUnit}
                  unitToFalse={"precipitation.isInches"}
                  isUnitTrue={precipitation.isMillimeters}
                  unitName={"Millimeters (mm)"}
                />
                <DropdownBtn
                  dataSet={"precipitation.isInches"}
                  handleClick={changeSingleUnit}
                  unitToFalse={"precipitation.isMillimeters"}
                  isUnitTrue={precipitation.isInches}
                  unitName={"Inches (in)"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
