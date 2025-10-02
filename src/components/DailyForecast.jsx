import React from 'react'
import sunIcon from '../assets/sun-icon.svg'
import { useSelector } from 'react-redux'
import { getWeatherIcon } from '../utils/WeatherCodes'
export default function DailyForecast() {
    const {daily} = useSelector((state)=> state.weatherData)
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
                        <span>{maxTemp.toFixed()}&deg;</span>
                        <span>{minTemp.toFixed()}&deg;</span>
                    </div>
                </div>
                })}
            </div>
        </div>
    </div>
  )
}
