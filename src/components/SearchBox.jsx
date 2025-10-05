import React, { useEffect, useRef, useState } from "react";
import searchIcon from "../assets/search-icon.svg";
import axios from "axios";
import { getWeatherUsingCoordinates } from "../utils/getWeatherUsingCoordinates";
import { useDispatch } from "react-redux";
import { setError } from "../store/FetchingStates";
import { searchLocation } from "../utils/searchLocation";
import Error from "./Error";
export default function SearchBox() {
  const [inputVal, setInputVal] = useState("");
  const [location, setLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);

const dispatch = useDispatch()
//   const searchLocation = async (locationName) => {
//     try {
//       if (locationName) {
//         const response = await axios.get(
//           `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=6&language=en&format=json`
//         );
//         const data = response.data;
//         if (data.results) {
//           setLocation(data.results);
//         } else {
//           throw new Error('not found');
//         }
//     } else {
//         setLocation("");
//     }
// } catch (error) {
//     console.log(error);
// }
//   };

  const handleClick = (idx , searchQuery)=>{
      if(idx !== undefined && location){
        getWeatherUsingCoordinates(location[idx].latitude , location[idx].longitude , dispatch , {city : location[idx]?.name , state : location[idx]?.admin1})
      setInputVal('')
      return
      }
        if(searchQuery && location){
          getWeatherUsingCoordinates(location[0].latitude , location[0].longitude , dispatch , {city : location[0]?.name , state : location[idx]?.admin1})
      setInputVal('')
      setLocation('')
      console.log('chl');
    } else{
      if(inputVal){
        dispatch(setError({isError : true , message : 'No search result found!'}))
      }
      setLocation('')
        }
    }
    useEffect(() => {
     location ? setIsOpen(true) : setIsOpen(false)
  }, [location]);

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
      let timeOut 
      if(inputVal){
        timeOut = setTimeout(async()=>{
        searchLocation(inputVal , setLocation);
      },300)
      }else{
        setLocation('')
      }
      return () => clearTimeout(timeOut)
  }, [inputVal]);
  return (
    <div>
      <div className="flex flex-col xs:flex-row items-center max-w-[650px] mx-auto justify-between gap-2 xs:gap-4 pb-8 md:pb-12">
        <div ref={wrapperRef} className="xs:w-[78%] self-stretch relative">
          <form onSubmit={e =>{
            e.preventDefault()
            handleClick(undefined , inputVal)
          }} className="flex items-center bg-[var(--color-neutral-800)] pl-6  gap-2 rounded-xl  hover:bg-[var(--color-neutral-700)] cursor-pointer focus-within:[box-shadow:0_0_0_3px_var(--color-neutral-900),0_0_0_5px_var(--color-text)] focus-within:hover:bg-[var(--color-bg)] focus-within:bg-[var(--color-bg)] ">
           <svg className="svg-icon" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.8438 18.8203C20.0391 19.0156 20.0391 19.3281 19.8438 19.4844L18.9453 20.3828C18.7891 20.5781 18.4766 20.5781 18.2812 20.3828L13.5547 15.6562C13.4766 15.5391 13.4375 15.4219 13.4375 15.3047V14.7969C11.9922 16.0078 10.1562 16.75 8.125 16.75C3.63281 16.75 0 13.1172 0 8.625C0 4.17188 3.63281 0.5 8.125 0.5C12.5781 0.5 16.25 4.17188 16.25 8.625C16.25 10.6562 15.4688 12.5312 14.2578 13.9375H14.7656C14.8828 13.9375 15 14.0156 15.1172 14.0938L19.8438 18.8203ZM8.125 14.875C11.5625 14.875 14.375 12.1016 14.375 8.625C14.375 5.1875 11.5625 2.375 8.125 2.375C4.64844 2.375 1.875 5.1875 1.875 8.625C1.875 12.1016 4.64844 14.875 8.125 14.875Z" fill="#D4D3D9"/>
</svg>

            <input
            onFocus={e => setIsOpen(true)}
            value={inputVal}
              type="text"
              placeholder="Search for a place..."
              className="w-full py-4 text-[var(--color-text)] placeholder-[var(--color-text)] border-0 outline-0 cursor-pointer"
              onChange={(e) => setInputVal(e.target.value)}
            />
          </form>
          {/* location dropDown */}
          {isOpen && location && (
            <div
              className={`auto-suggestion gap-0.5 flex-col absolute top-full bg-[var(--color-neutral-800)] w-full left-0 mt-2 rounded-xl p-2 `}
            >
              {location.map((place , i) => (
                <p onClick={(e) => {
                    handleClick(i) 
                    setIsOpen(false)
                    }} key={i} className="font-medium hover:bg-[var(--color-neutral-700)] py-2.5 px-2 border-1 border-transparent hover:border-[var(--color-neutral-600)] rounded-xl cursor-pointer">
                  {`${place.name} ${place?.admin1 ? `, ${place.admin1}` : ""}`}
                </p>
              ))}
            </div>
          )}
        </div>
        <button onClick={e => handleClick(undefined , inputVal)} className="bg-[var(--color-blue-500)] hover:bg-[var(--color-blue-700)] rounded-xl text-xl px-4 py-2 cursor-pointer self-stretch xs:w-[20%] focus-visible:[box-shadow:0_0_0_3px_var(--color-neutral-900),0_0_0_5px_var(--color-blue-500)] focus-visible:outline-0 text-[var(--color-text)]">
          Search
        </button>
      </div>
    </div>
  );
}
