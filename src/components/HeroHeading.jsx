import React from 'react'
import heroBg from '../assets/hero-bg-desktop.svg';
import sunIcon from '../assets/sun-icon.svg'
import { useSelector } from 'react-redux';
import { getWeatherIcon } from '../utils/WeatherCodes';
import {getDate, getDay, getMonth, getYear} from '../utils/getDateInfo';
import { celsiusToFahrenheit } from '../utils/UnitConverter';
export default function HeroHeading() {
  const {weatherData : {current} , unitSystem : {temperature}} = useSelector((state)=> state)
 const  getDayMonthYear = (isoTime)=>{
    const day = getDay(isoTime)
    const date = getDate(isoTime)
    const month = getMonth(isoTime)
    const year = getYear(isoTime)
    // Tuesday, Aug 5, 2025
    return `${day}, ${month} ${date}, ${year}`
  }
  
  return (
    <>
    {
      current && <div style={{backgroundImage : `url(${heroBg})`}} className="bg-center bg-cover flex flex-col sm:flex-row items-center justify-between rounded-2xl py-4 px-4 sm:py-7  md:py-14">
      
        <div>
            <p className='text-2xl xs:text-3xl font-bold mb-2'>Berlin, Germany</p>
            <p className='text-base text-[#ffffffc7] text-center sm:text-left'>{getDayMonthYear(current.time)}</p>
        </div>
        <div className='flex items-center justify-between w-full sm:w-fit'>
            <img src={`/weatherIcons/${getWeatherIcon(current.weather_code).icon}.svg`} alt={`${getWeatherIcon(current.weather_code).desc}`}  className='h-30' />
            <p className='text-6xl xs:text-8xl leading-[-2px]'>{temperature.isCelsius ? `${current.temperature.toFixed()}°` : celsiusToFahrenheit(current.temperature.toFixed())}</p>
        </div> 
    </div>
    }
    </>
  )
}
/*
To set the background image of a div in Tailwind, use the `bg-[url('path')]` utility. 
Make sure the path is correct relative to the public folder, or use an inline style for imported images.

Example with Tailwind (for public assets):
<div className="bg-[url('/assets/hero-bg-desktop.svg')] h-60"></div>

If you want to use the imported image (heroBg), use inline style:
<div style={{ backgroundImage: `url(${heroBg})` }} className="h-60"></div>
*/