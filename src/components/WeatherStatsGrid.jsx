import React from 'react'
import { useSelector } from 'react-redux'

export default function WeatherStatsGrid() {
  const {current} = useSelector((state)=> state.weatherData)
  console.log(current);
  const showInfo = ['feels_like' , 'humidity', 'wind_speed','precipitation']
  const formatText = (word)=>{
    return word.split('_').map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(' ')
  }
  return <>
  {
    current && <div className="mt-5 md:mt-8 grid grid-cols-2 gap-4 xs:grid-cols-4 xs:gap-3 md:gap-6">
          {
            showInfo.map((e , i)=>{
              return <div key={i} className="flex flex-col bg-[var(--color-neutral-800)] rounded-xl gap-2.5 py-4.5 px-4 border-1 border-[var(--color-neutral-600)]">
            <span className="text-lg">{formatText(e)}</span>
            <span className="text-3xl">{current[e]!=='' ?current[e] : '-'}</span>
          </div>
            })
          }
        </div>
  }
  </>
}
