import React from 'react'
import downArrow from '../assets/down-arrow.svg'
import sunIcon from '../assets/sun-icon.svg'
export default function HourlyForecast() {
  return (
    <div className='overflow-hidden lg:w-[34.5%] rounded-xl'>
      <div className='bg-[var(--color-neutral-800)] rounded-xl px-6 py-6 max-h-[616px] overflow-y-auto scrollbar'>
      <div className='flex justify-between items-center mb-4'>
        <p className='text-[20px] font-[600]'>Hourly forecast</p>
        <div className="flex items-center gap-2 bg-[var(--color-neutral-600)] py-2 px-4 rounded-[8px] cursor-pointer">
                <span className="text-[var(--color-text)] text-base ">
                  Tuesday
                </span>
                  <img src={downArrow} alt="down-arrow" className=""/>
              </div>
      </div>
      <div className='flex flex-col gap-4 '>
        {new Array(10).fill(0).map(()=>{
          return <div className='flex justify-between items-center bg-[var(--color-neutral-700)] rounded-[8px] p-2 border-1 border-[var(--color-neutral-600)]'>
          <div className='flex justify-between items-center'>
            <img src={sunIcon} alt="icon" className='w-10' />
          <span className='text-lg font-[500]'>3 PM</span> 
          </div>
          <span className='text-base'>20&deg;</span>
        </div>
        })}
      </div>
    </div>
    </div>
  )
}
