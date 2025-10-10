import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getWeatherIcon } from "../utils/WeatherCodes";
import { celsiusToFahrenheit } from "../utils/UnitConverter";
import useClickOutside from "../hooks/useClickOutside";
export default function HourlyForecast() {
  const { hourly, daily } = useSelector((state) => state.weatherData);
  const { temperature } = useSelector((state) => state.unitSystem);
  const [currentDayIdx, setCurrentDayIdx] = useState(0);
  const [isDropDownOpen, setDropDownState] = useState(false);

  const getDays = (dailyArr) => {
    return dailyArr?.map((elem) => {
      return elem?.day;
    });
  };
  const formatTime12Hour = (isoTime) => {
    const hour24 = parseInt(isoTime.split("T")[1].split(":")[0], 10);
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    const amOrPm = hour24 >= 12 ? "PM" : "AM";
    return `${hour12} ${amOrPm}`;
  };

  useClickOutside('.hourly-dropdown-wrapper' , () => setDropDownState(false))
  return (
    <>
      {hourly && (
        <div className="overflow-hidden xl:w-[34.5%] rounded-xl">
          <div className="bg-[var(--color-neutral-800)] rounded-xl  pb-6 max-h-[616px] overflow-y-auto scrollbar">
            <div className="flex justify-between items-center pb-4 sticky px-6 pt-6 top-0 bg-[var(--color-neutral-800)]">
              <p className="text-[20px] font-[600]">Hourly forecast</p>
              {/* Dropdown */}
              <div onMouseEnter={e => setDropDownState(true)}
              onMouseLeave={e => setDropDownState(false)}
                className="hourly-dropdown-wrapper bg-[var(--color-neutral-800)] pb-2 relative group"
              >
                <div
                  onClick={(e) => setDropDownState((prev) => !prev)}
                  className="flex items-center gap-2 bg-[var(--color-neutral-700)] py-2 px-4 rounded-[8px] cursor-pointer"
                >
                  <span className="text-[var(--color-text)] text-base ">
                    {getDays(daily)[currentDayIdx]}
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
                  {/* Dropdown open*/}
                  {isDropDownOpen && (
                    <div
                      className={`flex-col bg-[var(--color-neutral-800)] p-2 rounded-xl border-1 border-[var(--color-neutral-600)] w-[214px] absolute top-[calc(100%+0px)] flex right-0 gap-1`}
                    >
                      {getDays(daily).map((day, i) => (
                        <button
                          onClick={(e) => setCurrentDayIdx(i)}
                          key={i}
                          className={`cursor-pointer text-left px-[8px] py-[10px] hover:bg-[var(--color-neutral-700)] rounded-[8px] font-medium tracking-wide ${
                            currentDayIdx === i
                              ? "bg-[var(--color-neutral-700)]"
                              : ""
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Dropdown open*/}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-6">
              {hourly &&
                hourly.time[currentDayIdx].map((time, i) => {
                  return (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-[var(--color-neutral-700)] rounded-[8px] p-2 border-1 border-[var(--color-neutral-600)]"
                    >
                      <div className="flex justify-between items-center">
                        <img
                          src={`/weatherIcons/${
                            getWeatherIcon(hourly.weatherCode[currentDayIdx][i])
                              .icon
                          }.svg`}
                          alt={`${
                            getWeatherIcon(hourly.weatherCode[currentDayIdx][i])
                              .desc
                          }`}
                          className="w-10"
                        />
                        <span className="text-lg font-[500]">
                          {formatTime12Hour(time)}
                        </span>
                      </div>
                      <span className="text-base">
                        {temperature.isCelsius
                          ? `${hourly.temperature[currentDayIdx][i].toFixed()}°`
                          : celsiusToFahrenheit(
                              hourly.temperature[currentDayIdx][i].toFixed()
                            )}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
