import React from 'react'
import { useSelector } from 'react-redux'
import { getWeatherIcon } from '../utils/WeatherCodes'
import { celsiusToFahrenheit } from '../utils/UnitConverter'
export default function DailyForecast() {
    const {weatherData : {daily} , unitSystem : {temperature}} = useSelector((state)=> state)
  return (
    <div className='mt-8 md:mt-12'>
        <div>
            <p className='font-bold text-[20px] mb-5'>Daily forecast</p>
            <div className='grid sm:grid-cols-7 xs:grid-cols-4 grid-cols-3 gap-2 '>
                {daily && daily.map(({maxTemp , minTemp , day , weatherCode}, i) => {
                    return <div className='bg-[var(--color-neutral-800)] flex flex-col items-center rounded-xl px-2 py-4 gap-1.5 border-1 border-[var(--color-neutral-600)]' key={i}>
                    <span className='text-lg'>{day.slice(0,3)}</span>
                    <img src={`/weatherIcons/${getWeatherIcon(weatherCode).icon}.svg`} alt={`${getWeatherIcon(weatherCode).desc}`} className='w-15'/>
                    <div className='flex justify-between w-full'>
                        <span>{temperature.isCelsius ? `${maxTemp.toFixed()}°` : celsiusToFahrenheit(maxTemp.toFixed())}</span>
                        <span>{temperature.isCelsius ? `${maxTemp.toFixed()}°` : celsiusToFahrenheit(maxTemp.toFixed())}</span>
                    </div>
                </div>
                })}
            </div>
        </div>
    </div>
  )
}
