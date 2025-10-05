import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Heading from '../components/Heading';
import SearchBox from '../components/SearchBox';
import DataContainer from '../components/DataContainer';

export default function Home() {
    const [theme, setTheme] = useState('dark')
    const allThemes = ['dark' , 'light' , 'theme-green']
    useEffect(()=>{
        document.documentElement.classList.remove(allThemes[0] ,allThemes[1], allThemes[2])
        if(theme !== 'dark'){
        document.documentElement.classList.add(theme)}
    }, [theme])

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
