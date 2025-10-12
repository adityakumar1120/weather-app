import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router";
import HeroHeading from "../components/HeroHeading";
import { House } from "lucide-react";
import { current } from "@reduxjs/toolkit";

export default function SavedLocations() {
  const favouriteLocations = useSelector((state) => state.savedLocations);

  return (
    <div className="bg-[var(--color-bg)] min-h-screen font-dmsans text-[var(--color-text)] px-4 xs:px-6 pb-6 md:pb-10">
      <div className="mx-auto max-w-[1350px] flex items-center justify-between">
        <Link to={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-house-icon lucide-house"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        </Link>
        <h1 className=" text-center text-5xl font-medium py-10 stretch">
          Your Places
        </h1>
        <div></div>
      </div>
      <div className="border-1 border-[var(--color-neutral-600)] mx-auto max-w-[1350px] rounded-2xl px-4 md:px-6 py-6">
        <p className="text-3xl font-bold">Your Saved Places {`(${favouriteLocations.length})`}</p>
        <p className="border-[var(--color-neutral-300)] text-xl max-w-[900px] pt-2">
          Here you can view and manage all the places you have saved. Stay
          updated with the latest weather information for each location. To
          remove a place, simply click on the bookmark icon.
        </p>
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-6 mt-6">
          {favouriteLocations.map(
            ({current, city, state, latitude, longitude, id }) => {
              return (
                <HeroHeading
                  key={latitude}
                  city={city}
                  state={state}
                  latitude={latitude}
                  longitude={longitude}
                  id={id}
                  showRedirectBtn={true}
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
