import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import SearchInputCompare from "./SearchInputCompare";
import { getWeatherIcon } from "../utils/WeatherCodes";
import { getDate, getDay, getMonth, getYear } from "../utils/getDateInfo";
import { useSelector } from "react-redux";
import {
  celsiusToFahrenheit,
  kmphToMph,
  meterToKm,
} from "../utils/UnitConverter";

const WeatherLocation = ({
  locationNumber,
  setLocation,
  location,
}) => {
  const { temperature, windSpeed, precipitation, visibility } = useSelector(
    (state) => state.unitSystem
);
const { current, daily } = location;
  const getDayMonthYear = (isoTime) => {
    const day = getDay(isoTime);
    const date = getDate(isoTime);
    const month = getMonth(isoTime);
    const year = getYear(isoTime);
    // Tuesday, Aug 5, 2025
    return `${day}, ${month} ${date}, ${year}`;
  };
  useEffect(() => {
    console.log(location);
    console.log(current, daily);
  }, [location]);
  return (
    <div className="w-full">
      <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-text)] mb-4">
        Location {locationNumber}
      </h2>

      <SearchInputCompare setLocationInfo={setLocation} />

      {Object.keys(location).length ? (
        <div className="bg-[var(--color-neutral-800)] rounded-2xl p-6 shadow-xl border-1 border-[var(--color-neutral-600)]">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-[var(--color-text)]">{`${
              location.city ? location.city : "Current Location"
            } ${location.state ? `, ${location.state}` : ""}`}</h3>
            <p className="text-[var(--color-neutral-300)] text-sm">
              {getDayMonthYear(current?.time)}
            </p>
          </div>

          <div className="bg-[var(--color-neutral-700)] rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center gap-4">
              <img
                src={`/weatherIcons/${
                  getWeatherIcon(current?.weather_code).icon
                }.svg`}
                alt={`${getWeatherIcon(current?.weather_code).desc}`}
              />
              <span className="text-6xl font-bold text-[var(--color-text)]">
                {current
                  ? temperature?.isCelsius
                    ? `${current?.temperature_2m?.toFixed()}°`
                    : celsiusToFahrenheit(current?.temperature_2m?.toFixed())
                  : ""}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <p className="text-[var(--color-neutral-300)] text-sm mb-1">
                Feels Like
              </p>
              <p className="text-[var(--color-text)] text-2xl font-semibold">
                {current
                  ? temperature?.isCelsius
                    ? `${current?.apparent_temperature?.toFixed()}°`
                    : celsiusToFahrenheit(
                        current?.apparent_temperature?.toFixed()
                      )
                  : ""}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[var(--color-neutral-300)] text-sm mb-1">
                Min/Max
              </p>
              <p className="text-[var(--color-text)] text-2xl font-semibold">
                {temperature?.isCelsius
                  ? `${daily?.temperature_2m_min[0].toFixed()}°`
                  : celsiusToFahrenheit(
                      daily?.temperature_2m_min[0].toFixed()
                    )}{" "}
                /{" "}
                {temperature?.isCelsius
                  ? `${daily?.temperature_2m_max[0].toFixed()}°`
                  : celsiusToFahrenheit(daily?.temperature_2m_max[0].toFixed())}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[var(--color-neutral-300)] text-sm mb-1">
                Humidity
              </p>
              <p
                className={`text-2xl font-semibold ${
                  current?.relative_humidity_2m?.toFixed() > 60 ? "text-red-400" : "text-green-400"
                }`}
              >
                {current?.relative_humidity_2m?.toFixed()}%
              </p>
            </div>
            <div>
              <p className="text-[var(--color-neutral-300)] text-sm mb-1">
                Wind Speed
              </p>
              <p
                className={`text-2xl font-semibold ${
                  current?.wind_speed_10m?.toFixed() > 10 ? "text-red-400" : "text-green-400"
                }`}
              >
                {windSpeed?.isKmph
                  ? `${current?.wind_speed_10m?.toFixed()} km/h`
                  : kmphToMph(current?.wind_speed_10m)}
              </p>
            </div>
            <div>
              <p className="text-[var(--color-neutral-300)] text-sm mb-1">
                UV Index
              </p>
              <p className="text-[var(--color-text)] text-lg">
                {current?.uv_index?.toFixed()}
              </p>
            </div>
            <div>
              <p className="text-[var(--color-neutral-300)] text-sm mb-1">
                Visibility
              </p>
              <p className="text-[var(--color-text)] text-lg">
                {visibility.isMeter
                  ? `${current?.visibility?.toFixed()} m`
                  : meterToKm(current?.visibility)}{" "}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-[var(--color-text)] text-2xl flex justify-center items-center min-h-[300px] bg-[var(--color-neutral-800)] rounded-xl  border-1 border-[var(--color-neutral-600)]">
          Select a location to compare
        </div>
      )}
    </div>
  );
};

export default WeatherLocation;
