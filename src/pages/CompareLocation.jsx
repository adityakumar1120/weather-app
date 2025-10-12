import { useState } from 'react';
import WeatherLocation from '../components/WeatherLocation'
import { Link } from 'react-router';


function CompareLocation() {
    const [location1, setLocation1] = useState({})
    const [location2, setLocation2] = useState({})
  return (
    <div className="min-h-screen bg-[var(--color-bg)] font-dmsans">
      <div className="container mx-auto max-w-[1350px] px-4 py-8 md:py-12 xs:px-6 pb-14">
        <div className="relative text-center mb-8 md:mb-12">
          <h1 className=" text-3xl md:text-5xl font-bold text-[var(--color-text)] mb-2 md:mb-4">
            Compare Weather
          </h1>
          <p className="text-[var(--color-neutral-300)] text-sm md:text-lg">
            See how weather conditions differ across two cities
          </p>
          <div className='absolute text-[var(--color-text)] top-5 left-0'>
           <Link  to={"/"}>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-house-icon lucide-house"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start relative">
          <WeatherLocation
            locationNumber={1}
            setLocation={setLocation1}
            location={location1}

          />

          <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-blue-600 text-white font-bold text-xl px-6 py-3 rounded-full shadow-lg">
              VS
            </div>
          </div>

          <div className="flex lg:hidden items-center justify-center my-4">
            <div className="bg-blue-600 text-white font-bold text-xl px-6 py-3 rounded-full shadow-lg">
              VS
            </div>
          </div>

          <WeatherLocation
            locationNumber={2}
            setLocation={setLocation2}
            location={location2}

          />
        </div>
      </div>
    </div>
  )
}

export default CompareLocation
