import React, { useEffect, useState } from "react";
import HeroHeading from "./HeroHeading";
import WeatherStatsGrid from "./WeatherStatsGrid";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../store/weatherdataSlice";
import  { days , getDay } from "../utils/getDateInfo";
import { getWeatherUsingCoordinates } from "../utils/getWeatherUsingCoordinates";
import Shimmer from "./Shimmer";
import Error from "./Error";

export default function DataContainer() {
  // const meta = [0, 46, 14, 17];
  const weatherInfo = useSelector((state) => state.weatherData);
  const {isLoading , error} = useSelector((state) => state.fetchingState);
  const dispatch = useDispatch();

   const getCityName = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await response.json();
    console.log(data.address.city ,data.address.country);
    if (data && data.address.city || data.address.city) {
      const city = data.address.city;
      const state = data.address.state;
      console.log(`📍 Location: ${city}, ${state}`);
      return { city, state };
    } else {
      console.log("No city found for the given coordinates.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching city name:", error);
  }
};
// Example usage:

  useEffect(() => {
    if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude;
       const longitude = position.coords.longitude;
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
      const {city , state} = await getCityName(latitude , longitude); 
      console.log(city , state);
      getWeatherUsingCoordinates(latitude,longitude , dispatch , {city : city , state : state})
    },
    (error) => {
      getWeatherUsingCoordinates(19.1664441,72.8832896 , dispatch , {city : 'Mumbai' , state : 'Maharashtra'})
    }
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}
  }, []);
  return <>
  {
   isLoading ? <Shimmer/> : error.isError ? <Error message={error.message}/> : Object.keys(weatherInfo).length ?
   <div className="flex justify-between flex-col lg:flex-row gap-8 md:gap-12 lg:gap-0">
      <div className="lg:w-[63%] ">
        <HeroHeading />
        <WeatherStatsGrid />
        <DailyForecast />
      </div>
      <HourlyForecast />
    </div> : <Shimmer/>
  }
  </>
  
}
