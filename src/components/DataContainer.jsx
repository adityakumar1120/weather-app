import React, { useEffect, useState } from "react";
import HeroHeading from "./HeroHeading";
import Dropdown from "./Dropdown";
import WeatherStatsGrid from "./WeatherStatsGrid";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../store/weatherdataSlice";
import  { days , getDay } from "../utils/getDateInfo";

export default function DataContainer() {
  // const meta = [0, 46, 14, 17];
  const weatherInfo = useSelector((state) => state.weatherData);
  
  const dispatch = useDispatch();
  useEffect(() => {
    //   let endpoint = `
    // https://api.open-meteo.com/v1/forecast?latitude=19.1641957&longitude=72.8670443&current=temperature_2m%2Crelative_humidity_2m%2Capparent_temperature%2Cprecipitation%2Cweather_code%2Cwind_speed_10m%2Cvisibility%2Cuv_index%2Csurface_pressure&hourly=temperature_2m%2Cweather_code%2Cprecipitation_probability&daily=weather_code%2Ctemperature_2m_max%2Ctemperature_2m_min%2Cprecipitation_sum%2Csunrise%2Csunset&timezone=auto&forecast_days=7`
    const api = `https://api.open-meteo.com/v1/forecast?lattitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity,apparent_temperature,precipitation,weather_code,wind_speed_10m,visibility,uv_index,surface_pressure&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min`;

    const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=19.1641957&longitude=72.8670443&current=temperature_2m%2Crelative_humidity_2m%2Capparent_temperature%2Cprecipitation%2Cweather_code%2Cwind_speed_10m%2Cvisibility%2Cuv_index%2Csurface_pressure&hourly=temperature_2m%2Cweather_code%2Cprecipitation_probability&daily=weather_code%2Ctemperature_2m_max%2Ctemperature_2m_min%2Cprecipitation_sum%2Csunrise%2Csunset&timezone=auto&forecast_days=7`;
    
    const chunkArr = (arr, size) => {
      let chunkedArr = [];
      for (let i = 0; i < arr.length / size; i++) {
        chunkedArr.push(arr.slice(i * size, (i + 1) * size));
      }
      return chunkedArr;
    };
    const getHourlyData = ({
      time,
      temperature_2m,
      precipitation_probability,
      weather_code,
    }) => {
      return {
        time: chunkArr(time, 24),
        temperature: chunkArr(temperature_2m, 24),
        precipitation: chunkArr(precipitation_probability, 24),
        weatherCode: chunkArr(weather_code, 24),
      };
    };
    const shapeData = (data) => {
      return {
        current: {
          wind_speed: data.current.wind_speed_10m.toFixed(),
          humidity: data.current.relative_humidity_2m,
          feels_like: data.current.apparent_temperature.toFixed(),
          precipitation: data.current.precipitation,
          weather_code : data.current.weather_code,
          temperature : data.current.temperature_2m,
          time : data.current.time
        },
        daily: days.map((day, i) => {
          return {
            maxTemp: data.daily.temperature_2m_max[i],
            minTemp: data.daily.temperature_2m_min[i],
            day: getDay(data.daily.time[i]),
            weatherCode: data.daily.weather_code[i],
          };
        }),
        hourly: getHourlyData(data.hourly),
      };
    };
    async function fetchData() {
      // fetch('https://api.open-meteo.com/v1/forecast?latitude=19.1641957&longitude=72.8670443&current=temperature_2m%2Crelative_humidity_2m%2Capparent_temperature%2Cprecipitation%2Cweather_code%2Cwind_speed_10m%2Cvisibility%2Cuv_index%2Csurface_pressure&hourly=temperature_2m%2Cweather_code%2Cprecipitation_probability&daily=weather_code%2Ctemperature_2m_max%2Ctemperature_2m_min%2Cprecipitation_sum%2Csunrise%2Csunset&timezone=auto&forecast_days=7').then((res)=> res.json()).then((data) => console.log(data))
      try {
        const response = await axios.get(endpoint);
        const data = await response.data;
        console.log(data);
        dispatch(setData(shapeData(data)));
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="flex justify-between flex-col lg:flex-row gap-8 md:gap-12 lg:gap-0">
      <div className="lg:w-[63%] ">
        <HeroHeading />
        <WeatherStatsGrid />
        <DailyForecast />
      </div>
      <HourlyForecast />
    </div>
  );
}
