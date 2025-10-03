import React, { useEffect, useState } from "react";

import logo from "../assets/logo.png";
import unitIcon from "../assets/units-icon.svg";
import downArrow from "../assets/down-arrow.svg";
import tickIcon from "../assets/tick.svg";
import { changeOneUnit, changeSystem } from "../store/unitSystemSlice";
import { useDispatch, useSelector } from "react-redux";
import DropdownBtn from "./DropdownBtn";
export default function Navbar() {
  const { isSystemMetric,oldSystemMetricVal, temperature, windSpeed, precipitation } = useSelector(
    (state) => state.unitSystem
  );
  const dispatch = useDispatch();
  const changeSingleUnit = (e) => {
    dispatch(changeOneUnit({trueUnit : e.target.dataset.unit ,falseUnit : e.target.dataset.unit_to_false}))
  };

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
            className={`flex-col bg-[var(--color-neutral-800)] p-2 rounded-xl border-1 border-[var(--color-neutral-600)] w-[214px] absolute top-[calc(100%+0px)] right-0  group-hover:flex group-hover:group-hover:flex hidden gap-1 z-1`}
          >
            <button
              onClick={() => dispatch(changeSystem())
              }
              className={`cursor-pointer text-left px-[8px] py-[10px] hover:bg-[var(--color-neutral-700)] rounded-[8px] font-medium tracking-wide  border-[var(--color-black)]} focus:[box-shadow:0_0_0_3px_var(--color-neutral-900),0_0_0_5px_var(--color-text)] ${
                isSystemMetric !== null
                  ? "[box-shadow:0_0_0_3px_var(--color-neutral-900),0_0_0_5px_var(--color-text)]"
                  : ""
              }`}
            >
              {`Switch to ${oldSystemMetricVal ? 'Imperial' : 'Metric'}`}
            </button>
            <span className="text-sm text-[var(--color-neutral-300)] tracking-wide px-[8px] py-[6px] border-t-1 border-[var(--color-neutral-600)]">
              Temperature
            </span>
            <DropdownBtn dataSet={"temperature.isCelsius"}
            handleClick = {changeSingleUnit}
            unitToFalse={'temperature.isFahrenheit'}
            isUnitTrue={temperature.isCelsius}
            unitName={<>Celsius (&deg;C)</>}
            />
            <DropdownBtn dataSet={"temperature.isFahrenheit"}
            handleClick = {changeSingleUnit}
            unitToFalse={'temperature.isCelsius'}
            isUnitTrue={temperature.isFahrenheit}
            unitName={<>Fahrenheit (&deg;C)</>}
            />
            <span className="text-sm text-[var(--color-neutral-300)] tracking-wide px-[8px] py-[6px] border-t-1 border-[var(--color-neutral-600)]">
              Wind Speed
            </span>
            <DropdownBtn dataSet={"windSpeed.isKmph"}
            handleClick = {changeSingleUnit}
            unitToFalse={'windSpeed.isMph'}
            isUnitTrue={windSpeed.isKmph}
            unitName={'Km/h'}
            />
            <DropdownBtn dataSet={"windSpeed.isMph"}
            handleClick = {changeSingleUnit}
            unitToFalse={'windSpeed.isKmph'}
            isUnitTrue={windSpeed.isMph}
            unitName={'mph'}
            />

            <span className="text-sm text-[var(--color-neutral-300)] tracking-wide px-[8px] py-[6px] border-t-1 border-[var(--color-neutral-600)]">
              Precipitation
            </span>
            <DropdownBtn dataSet={"precipitation.isMillimeters"}
            handleClick = {changeSingleUnit}
            unitToFalse={'precipitation.isInches'}
            isUnitTrue={precipitation.isMillimeters}
            unitName={'Millimeters (mm)'}
            />
            <DropdownBtn dataSet={"precipitation.isInches"}
            handleClick = {changeSingleUnit}
            unitToFalse={'precipitation.isMillimeters'}
            isUnitTrue={precipitation.isInches}
            unitName={'Inches (in)'}
            />
          
          </div>
        </div>
      </div>
    </nav>
  );
}
