import React, { useState } from "react";
import downArrow from "../assets/down-arrow.svg";
import { useSelector } from "react-redux";
import { getWeatherIcon } from "../utils/WeatherCodes";
import { celsiusToFahrenheit } from "../utils/UnitConverter";
export default function HourlyForecast() {
  const { hourly, daily  } = useSelector((state) => state.weatherData);
  const { temperature  } = useSelector((state) => state.unitSystem);
  const [currentDayIdx , setCurrentDayIdx] = useState(0)
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
  
  return (
    <>
      {hourly && (
        <div className="overflow-hidden lg:w-[34.5%] rounded-xl">
          <div className="bg-[var(--color-neutral-800)] rounded-xl  pb-6 max-h-[616px] overflow-y-auto scrollbar">
            <div className="flex justify-between items-center pb-4 sticky px-6 pt-6 top-0 bg-[var(--color-neutral-800)]">
              <p className="text-[20px] font-[600]">Hourly forecast</p>
              {/* Dropdown */}
              <div className="bg-[var(--color-neutral-800)] pb-2 relative group">
                <div className="flex items-center gap-2 bg-[var(--color-neutral-600)] py-2 px-4 rounded-[8px] cursor-pointer">
                <span className="text-[var(--color-text)] text-base ">
                  {getDays(daily)[currentDayIdx]}
                </span>
                <img src={downArrow} alt="down-arrow" />
                {/* dropdown open */}
                <div className={` flex-col bg-[var(--color-neutral-800)] p-2 rounded-xl border-1 border-[var(--color-neutral-600)] w-[214px] absolute top-[calc(100%+0px)] right-0  group-hover:flex group-hover:group-hover:flex hidden gap-1`}>
                  {getDays(daily).map((day , i) => (
                    <button onClick={e => setCurrentDayIdx(i)} key={i} className={`cursor-pointer text-left px-[8px] py-[10px] hover:bg-[var(--color-neutral-700)] rounded-[8px] font-medium tracking-wide ${currentDayIdx === i ? 'bg-[var(--color-neutral-700)]' : ''}`}>{day}</button>
                  ))}
                </div>
              </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-6">
              {hourly &&
                hourly.time[currentDayIdx].map((time, i) => {
                  const FormatTime = time.split('T')[1].split(':')[0]
                  if(currentDayIdx === 0 && FormatTime >= new Date().getHours()){
                     return (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-[var(--color-neutral-700)] rounded-[8px] p-2 border-1 border-[var(--color-neutral-600)]"
                    >
                      <div className="flex justify-between items-center">
                        <img
                          src={`/weatherIcons/${
                            getWeatherIcon(hourly.weatherCode[currentDayIdx][i]).icon
                          }.svg`}
                          alt={`${
                            getWeatherIcon(hourly.weatherCode[currentDayIdx][i]).desc
                          }`}
                          className="w-10"
                        />
                        <span className="text-lg font-[500]">
                          {formatTime12Hour(time)}
                        </span>
                      </div>
                      <span className="text-base">
                        {temperature.isCelsius ? `${hourly.temperature[currentDayIdx][i].toFixed()}°` : celsiusToFahrenheit(hourly.temperature[currentDayIdx][i].toFixed())}
                      </span>
                    </div>
                  );
                  } else if(currentDayIdx > 0){
                    return (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-[var(--color-neutral-700)] rounded-[8px] p-2 border-1 border-[var(--color-neutral-600)]"
                    >
                      <div className="flex justify-between items-center">
                        <img
                          src={`/weatherIcons/${
                            getWeatherIcon(hourly.weatherCode[currentDayIdx][i]).icon
                          }.svg`}
                          alt={`${
                            getWeatherIcon(hourly.weatherCode[currentDayIdx][i]).desc
                          }`}
                          className="w-10"
                        />
                        <span className="text-lg font-[500]">
                          {formatTime12Hour(time)}
                        </span>
                      </div>
                      <span className="text-base">
                      {temperature.isCelsius ? `${hourly.temperature[currentDayIdx][i].toFixed()}°` : celsiusToFahrenheit(hourly.temperature[currentDayIdx][i].toFixed())}
                      </span>
                    </div>
                  );
                  }else{return}
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
