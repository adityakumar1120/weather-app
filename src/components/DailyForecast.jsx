import React from 'react'
import sunIcon from '../assets/sun-icon.svg'
export default function DailyForecast() {
  return (
    <div className='mt-8 md:mt-12'>
        <div>
            <p className='font-bold text-[20px] mb-5'>Daily forecast</p>
            <div className='grid sm:grid-cols-7 xs:grid-cols-4 grid-cols-3 gap-2 '>
                {Array.from({ length: 7 }).map((_, e) => {
                    return <div className='bg-[var(--color-neutral-800)] flex flex-col items-center rounded-xl px-2 py-4 gap-1.5 border-1 border-[var(--color-neutral-600)]' key={e}>
                    <span className='text-lg'>Tue</span>
                    <img src={sunIcon} alt="icon" className='w-15'/>
                    <div className='flex justify-between w-full'>
                        <span>20&deg;</span>
                        <span>20&deg;</span>
                    </div>
                </div>
                })}
            </div>
        </div>
    </div>
  )
}
