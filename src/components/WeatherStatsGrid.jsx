import React from 'react'

export default function WeatherStatsGrid() {
  return (
    <div className="mt-5 md:mt-8 grid grid-cols-2 gap-4 xs:grid-cols-4 xs:gap-3 md:gap-6">
          <div className="flex flex-col bg-[var(--color-neutral-800)] rounded-xl gap-2.5 py-4.5 px-4 border-1 border-[var(--color-neutral-600)]">
            <span className="text-lg">Feels Like</span>
            <span className="text-3xl">18&deg;</span>
          </div>
          <div className="flex flex-col bg-[var(--color-neutral-800)] rounded-xl gap-2.5 py-4.5 px-4 border-1 border-[var(--color-neutral-600)]">
            <span className="text-lg">Feels Like</span>
            <span className="text-3xl">18&deg;</span>
          </div>
          <div className="flex flex-col bg-[var(--color-neutral-800)] rounded-xl gap-2.5 py-4.5 px-4 border-1 border-[var(--color-neutral-600)]">
            <span className="text-lg">Feels Like</span>
            <span className="text-3xl">18&deg;</span>
          </div>
          <div className="flex flex-col bg-[var(--color-neutral-800)] rounded-xl gap-2.5 py-4.5 px-4 border-1 border-[var(--color-neutral-600)]">
            <span className="text-lg">Feels Like</span>
            <span className="text-3xl">18&deg;</span>
          </div>
        </div>
  )
}
