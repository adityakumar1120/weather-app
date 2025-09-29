import React from "react";
import searchIcon from "../assets/search-icon.svg";
export default function SearchBox() {
return (
    <div>
        <div className="flex flex-col xs:flex-row items-center max-w-[650px] mx-auto justify-between gap-2 xs:gap-4 pb-8 md:pb-12">
            <div className="flex items-center bg-[var(--color-neutral-800)] pl-5  gap-2 rounded-xl xs:w-[78%] self-stretch hover:bg-[var(--color-neutral-600)] cursor-pointer">
                <img src={searchIcon} alt="search" className="w-[18px] self-stretch"/>
                <input
                    type="text"
                    placeholder="Search for a place..."
                    className="w-full py-3 text-[var(--color-text)] placeholder-[var(--color-text)] border-0 outline-0 cursor-pointer"
                />
            </div>
            <button className="bg-[var(--color-blue-500)] hover:bg-[var(--color-blue-700)] rounded-xl text-xl px-4 py-2 cursor-pointer self-stretch xs:w-[20%]">
                Search
            </button>
        </div>
    </div>
);
}
