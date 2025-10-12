import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Heading from '../components/Heading';
import SearchBox from '../components/SearchBox';
import DataContainer from '../components/DataContainer';
import { useSearchParams } from 'react-router';
import { getWeatherUsingCoordinates } from '../utils/getWeatherUsingCoordinates';

export default function Home() {
    const [theme, setTheme] = useState('dark')
    const allThemes = ['dark' , 'light' , 'theme-green']
  const [searchParams , setSearchparams] = useSearchParams()
    
    useEffect(()=>{
        document.documentElement.classList.remove(allThemes[0] ,allThemes[1], allThemes[2])
        if(theme !== 'dark'){
        document.documentElement.classList.add(theme)}
    }, [theme])
// const handleClick = (idx, searchQuery , location , setSearchQuery ,dispatch,setLocation , setError) => {
//   setSearchparams({})
//     if (idx !== undefined && location) {
//       getWeatherUsingCoordinates(
//         location[idx].latitude,
//         location[idx].longitude,
//         dispatch,
//         { city: location[idx]?.name, state: location[idx]?.admin1 }
//       );
//       setSearchQuery("");
//       return;
//     }
//     if (searchQuery.trim() && location) {
//       getWeatherUsingCoordinates(
//         location[0].latitude,
//         location[0].longitude,
//         dispatch,
//         { city: location[0]?.name, state: location[0]?.admin1 }
//       );
//       setSearchQuery("");
//       setLocation("");
//     } else {
//       if (searchQuery.trim()) {
//         dispatch(
//           setError({ isError: true, message: "No search result found!" })
//         );
//       }
//       setLocation("");
//     }

//   };
  return (
    <div className='bg-[var(--color-bg)] text-[var(--color-text)] font-dmsans min-h-screen'>
        <div className='mx-auto max-w-[1350px] px-4 xs:px-6 pb-14'>
            <Navbar/>
            <Heading/>
            <SearchBox/>
            <DataContainer/>
        </div>
    </div>
  );

}
