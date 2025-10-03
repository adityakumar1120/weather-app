import React from "react";
import tickIcon from "../assets/tick.svg";

export default function DropdownBtn({handleClick , unitToFalse , isUnitTrue , unitName , dataSet}) {
  return (
    <button
      data-unit={dataSet}
      data-unit_to_false={unitToFalse}
      onClick={handleClick}
      className={`cursor-pointer text-left px-[8px] py-[10px] hover:bg-[var(--color-neutral-700)] rounded-[8px] font-medium tracking-wide flex justify-between focus-visible:[box-shadow:0_0_0_3px_var(--color-neutral-900),0_0_0_3px_var(--color-neutral-900)} ${
        isUnitTrue ? "bg-[var(--color-neutral-700)] " : ""
      }`}
    >
      <span className="pointer-events-none">{unitName}</span>
      <img
        className={`w-3.5 ${!isUnitTrue ? "hidden" : ""} pointer-events-none`}
        src={tickIcon}
        alt="tick-icon"
      />
    </button>
  );
}
