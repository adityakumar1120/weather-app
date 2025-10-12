import React from "react";
import HeroHeading from "./HeroHeading";
import WeatherStatsGrid from "./WeatherStatsGrid";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import downArrow from "../assets/down-arrow.svg";

export default function Shimmer() {
  return (
    <div className="flex justify-between flex-col lg:flex-row gap-8 md:gap-12 lg:gap-0">
      <div className="lg:w-[63%] ">
        {/* HeroHeading  */}
      <div className="flex justify-center items-center rounded-2xl h-[256px] bg-[var(--color-neutral-800)]">
        <div>
          <div className="flex gap-2 justify-center mb-2">
            <div className="w-3 h-3 rounded-full bg-[var(--color-text)] dot"></div>
            <div className="w-3 h-3 rounded-full bg-[var(--color-text)] dot"></div>
            <div className="w-3 h-3 rounded-full bg-[var(--color-text)] dot"></div>
          </div>

          <p className="font-medium text-lg text-center">Loading...</p>
        </div>
      </div>
        {/* <WeatherStatsGrid /> */}
        <div className="mt-5 md:mt-8 grid grid-cols-2 gap-4 xs:grid-cols-4 xs:gap-3 md:gap-6">
          {["Feels Like", "Humidity", "Wind Speed", "Precipitation"].map(
            (e, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-col bg-[var(--color-neutral-800)] rounded-xl gap-2.5 py-4.5 px-4 border-1 border-[var(--color-neutral-600)]"
                >
                  <span className="text-lg">{e}</span>
                  <span className="text-3xl">-</span>
                </div>
              );
            }
          )}
        </div>
        {/* <DailyForecast /> */}
        <div className="mt-8 md:mt-12">
          <div>
            <p className="font-bold text-[20px] mb-5">Daily forecast</p>
            <div className="grid sm:grid-cols-7 xs:grid-cols-4 grid-cols-3 gap-2 ">
              {new Array(7).fill(0).map((_, i) => {
                return (
                  <div
                    className="bg-[var(--color-neutral-800)] flex flex-col items-center rounded-xl h-[165px] gap-1.5 border-1 border-[var(--color-neutral-600)]"
                    key={i}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* <HourlyForecast /> */}
      <div className="overflow-hidden lg:w-[34.5%] rounded-xl">
        <div className="bg-[var(--color-neutral-800)] rounded-xl  pb-6 max-h-[662px]  overflow-y-auto scrollbar">
          <div className="flex justify-between items-center pb-4 sticky px-6 pt-6 top-0 bg-[var(--color-neutral-800)]">
            <p className="text-[20px] font-[600]">Hourly forecast</p>

            <div className="bg-[var(--color-neutral-800)] pb-2 relative group">
              <div className="flex items-center gap-3 bg-[var(--color-neutral-600)] py-2 px-4 rounded-[8px] cursor-pointer">
                <span className="text-[var(--color-text)] text-base ">-</span>
                <img src={downArrow} alt="down-arrow" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-6">
            {new Array(24).fill(0).map((time, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-between items-center bg-[var(--color-neutral-700)] rounded-[8px] h-13 border-1 border-[var(--color-neutral-600)]"
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
