import axios from "axios";
import { days, getDay } from "./getDateInfo";
import { setData } from "../store/weatherdataSlice";
import { setError, setLoading } from "../store/FetchingStates";
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
const shapeData = (data,city , state) => {
    return {
      city,
      state,
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
export async function getWeatherUsingCoordinates(latitude , longitude , dispatch , {city , state}) {
  try {
    dispatch(setLoading(true))
    dispatch(setError(false))
        const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,visibility,uv_index,surface_pressure&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset&timezone=auto&forecast_days=7`;
        const response = await axios.get(endpoint);
        const data = await response.data;
        dispatch(setData(shapeData(data ,city , state)));
        dispatch(setLoading(false))
      } catch (error) {
        dispatch(setLoading(false))
        dispatch(setError({isError : true , message : 'something went wrong'}))
      }
    }