import React, { useEffect, useState } from "react";
import heroBg from "../assets/hero-bg-desktop.svg";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherIcon } from "../utils/WeatherCodes";
import { getDate, getDay, getMonth, getYear } from "../utils/getDateInfo";
import { celsiusToFahrenheit } from "../utils/UnitConverter";
import { addLocation, deleteLocation } from "../store/FavouriteLocationsSlice";
import axios from "axios";
import { Link } from "react-router";
export default function HeroHeading(props) {
  const { city, state, latitude, longitude, id, showRedirectBtn } = props;
  const [current, setCurrent] = useState(props.current);
  const { temperature } = useSelector((state) => state.unitSystem);
  const favouriteLocations = useSelector((state) => state.savedLocations);
  const [isFavourite, setIsFavourite] = useState(() => {
    return favouriteLocations.some((location) => location.id === id);
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const getDayMonthYear = (isoTime) => {
    const day = getDay(isoTime);
    const date = getDate(isoTime);
    const month = getMonth(isoTime);
    const year = getYear(isoTime);
    // Tuesday, Aug 5, 2025
    return `${day}, ${month} ${date}, ${year}`;
  };
  const saveLocation = () => {
    if (isFavourite) {
      dispatch(deleteLocation({ id }));
    } else {
      console.log();
      dispatch(
        addLocation({
          city,
          state,
          latitude,
          longitude,
          id,
          current,
        })
      );
    }
  };

  const getCurrentWeatherData = async (latitude, longitude) => {
    try {
      setIsLoading(true);
      const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,visibility,uv_index,surface_pressure&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset&timezone=auto&forecast_days=7`;
      const response = await axios.get(endpoint);
      const {
        wind_speed_10m,
        relative_humidity_2m,
        apparent_temperature,
        temperature_2m,
        precipitation,
        weather_code,
        time,
      } = await response.data.current;
      setIsLoading(false);
      return {
        wind_speed: wind_speed_10m,
        humidity: relative_humidity_2m,
        feels_like: apparent_temperature,
        temperature: temperature_2m,
        precipitation,
        weather_code,
        time,
      };
    } catch (error) {
      setIsLoading(false);
      setIsError("failed to get data");
      console.log(error);
      return error;
    }
  };
  useEffect(() => {
    setIsFavourite((prev) =>
      favouriteLocations.some((location) => location.id === id)
    );
    localStorage.setItem(
      "favouriteLocations",
      JSON.stringify(favouriteLocations)
    );
  }, [favouriteLocations, id]);
  useEffect(() => {
    if (!current) {
      const asyncfunc = async () => {
        setCurrent(await getCurrentWeatherData(latitude, longitude));
      };
      asyncfunc();
    }
  }, []);
  return (
    <>
      {isLoading ? (
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
      ) : isError ? (
        "error"
      ) : (
        <div
          style={{ backgroundImage: `url(${heroBg})` }}
          className="bg-center bg-cover flex flex-col sm:flex-row items-center justify-between rounded-2xl py-4 px-4 sm:py-7  md:py-14 text-white relative"
        >
          <div>
            <p className="text-2xl xs:text-3xl font-bold mb-2">{`${
              city ? city : "Current Location"
            } ${state ? `, ${state}` : ""}`}</p>
            <p className="text-base text-[#ffffffc7] text-center sm:text-left">
              {getDayMonthYear(current?.time)}
            </p>
          </div>
          <div className="flex items-center justify-between w-full sm:w-fit">
            <img
              src={`/weatherIcons/${
                getWeatherIcon(current?.weather_code).icon
              }.svg`}
              alt={`${getWeatherIcon(current?.weather_code).desc}`}
              className="h-30"
            />
            <p className="text-6xl xs:text-8xl leading-[-2px] ">
              {current
                ? temperature?.isCelsius
                  ? `${current?.temperature?.toFixed()}°`
                  : celsiusToFahrenheit(current?.temperature?.toFixed())
                : ""}
            </p>
          </div>
          {/* heart icon */}
          <div
            className="absolute top-4 right-4 cursor-pointer"
            onClick={saveLocation}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill={isFavourite ? "red" : "none"}
              stroke={isFavourite ? "red" : "white"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-heart-icon lucide-heart"
            >
              <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
            </svg>
          </div>
          {showRedirectBtn ? (
            <Link
              to={`/?latitude=${latitude}&longitude=${longitude}&city=${city}${`${
                state ? `&state=${state}` : ""
              }`}`}
            >
              <button className="absolute bottom-2 right-6 flex items-center gap-2 h-12 min-w-max px-4 bg-[var( --color-blue-500)] border border-[var(--color-neutral-300)] text-white rounded-full hover:bg-white hover:text-black transition-all cursor-pointer">
                View{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-move-right-icon lucide-move-right"
                >
                  <path d="M18 8L22 12L18 16" />
                  <path d="M2 12H22" />
                </svg>
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
