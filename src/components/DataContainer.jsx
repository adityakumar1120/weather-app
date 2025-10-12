import React, { useEffect, useState } from "react";
import HeroHeading from "./HeroHeading";
import WeatherStatsGrid from "./WeatherStatsGrid";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherUsingCoordinates } from "../utils/getWeatherUsingCoordinates";
import Shimmer from "./Shimmer";
import Error from "./Error";
import { useSearchParams } from "react-router";

export default function DataContainer() {
  const weatherInfo = useSelector((state) => state.weatherData);
  const {current , city , state , latitude , longitude , id } = weatherInfo
  const {isLoading , error} = useSelector((state) => state.fetchingState);
  const dispatch = useDispatch();
  const [searchparams] = useSearchParams()
  const searchQueryLat = searchparams.get('latitude')
  const searchQueryLon = searchparams.get('longitude')
  const searchQueryCity = searchparams.get('city')
  const searchQueryState = searchparams.get('state')
  console.log(searchQueryLat,searchQueryLon);

   const getCityName = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await response.json();
    if (data && data.address.city || data.address.city) {
      const city = data.address.city;
      const state = data.address.state;
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
    if(!searchQueryLat && !searchQueryLon){
      if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude;
       const longitude = position.coords.longitude;
      const {city , state} = await getCityName(latitude , longitude); 
      getWeatherUsingCoordinates(latitude,longitude , dispatch , {city : city , state : state})
    },
    (error) => {
      getWeatherUsingCoordinates(19.1664441,72.8832896 , dispatch , {city : 'Mumbai' , state : 'Maharashtra'})
    }
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}
    }
    else if(searchQueryLat && searchQueryLon){
      getWeatherUsingCoordinates(searchQueryLat,searchQueryLon , dispatch , {city : searchQueryCity , state : searchQueryState})
    }
  }, []);
  return <>
  {
   isLoading ? <Shimmer/> : error.isError ? <Error message={error.message}/> : Object.keys(weatherInfo).length ?
   <div className="flex justify-between flex-col xl:flex-row gap-8 md:gap-12 xl:gap-0">
      <div className="xl:w-[63%] ">
        <HeroHeading current={current} city={city} state={state} latitude={latitude} longitude={longitude} id={id} />
        <WeatherStatsGrid />
        <DailyForecast />
      </div>
      <HourlyForecast />
    </div> : <Shimmer/>
  }
  </>
  
}
