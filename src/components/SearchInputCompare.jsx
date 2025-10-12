import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setError } from "../store/FetchingStates";
import { searchLocation } from "../utils/searchLocation";
import useClickOutside from "../hooks/useClickOutside";
import { Mic, MicOff } from "lucide-react";
import { useSearchParams } from "react-router";
import axios from "axios";
export default function SearchInputCompare({setLocationInfo}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechLocation, setSpeechLocation] = useState("");
  const dispatch = useDispatch();
  const [searchParams , setSearchparams] = useSearchParams()
  async function getWeatherUsingCoordinates(latitude , longitude , {city , state}) {
    console.log(city,state);
  try {
    // dispatch(setLoading(true))
    // dispatch(setError(false))
        const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,visibility,uv_index,surface_pressure&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset&timezone=auto&forecast_days=7`;
        const response = await axios.get(endpoint);
        const data = await response.data;
        console.log(data);
        setLocationInfo({...data , state , city})
        // dispatch(setData(shapeData(data ,city , state)));
        // dispatch(setLoading(false))
      } catch (error) {
        // dispatch(setLoading(false))
        console.log(error);
        // dispatch(setError({isError : true , message : 'something went wrong'}))
      }
    }
  const handleClick = (idx, searchQuery) => {
  setSearchparams({})
    if (idx !== undefined && location) {
      getWeatherUsingCoordinates(
        location[idx].latitude,
        location[idx].longitude,
        { city: location[idx]?.name, state: location[idx]?.admin1 }
      );
      setSearchQuery("");
      return;
    }
    if (searchQuery.trim() && location) {
        console.log({ city: location[0]?.name, state: location[0]?.admin1 });
      getWeatherUsingCoordinates(
        location[0].latitude,
        location[0].longitude,
        { city: location[0]?.name, state: location[0]?.admin1 }
      );
      setSearchQuery("");
      setLocation("");
    } else {
      if (searchQuery.trim()) {
        dispatch(
          setError({ isError: true, message: "No search result found!" })
        );
      }
      setLocation("");
    }

  };
  useEffect(() => {
    console.log(location);
    location ? setIsOpen(true) : setIsOpen(false);
  }, [location]);
  useClickOutside(".search-dropdown-wrapper", () => setIsOpen(false));

  useEffect(() => {
    let timeOut;
    if (searchQuery.trim()) {
      timeOut = setTimeout(async () => {
        searchLocation(searchQuery, setLocation);
      }, 300);
    } else {
      setLocation("");
    }
    return () => clearTimeout(timeOut);
  }, [searchQuery]);
  const searchSpeechWeather = async (searchQuery) => {
    if (!searchQuery.trim()) {
      return;
    }
    const latsAnsLongs = await searchLocation(searchQuery, setLocation);
    console.log(latsAnsLongs , speechLocation);
    console.log(latsAnsLongs)
    if(latsAnsLongs){
      console.log(latsAnsLongs[0].latitude , latsAnsLongs[0].longitude);
      getWeatherUsingCoordinates(
        latsAnsLongs[0].latitude,
        latsAnsLongs[0].longitude,
        { city: latsAnsLongs[0]?.name, state: latsAnsLongs[0]?.admin1 }
      );
  setSearchparams({})
      setLocation('')
    }else{
      dispatch(
          setError({ isError: true, message: "No search result found!" })
        );
    }
  };
  useEffect(() => {
    const speechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!speechRecognition) {
      return;
    }
    const recognition = new speechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onstart = ()=>{
      setIsListening(true)
    }
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery('')
      setSearchQuery(transcript)
      searchSpeechWeather(transcript)
    };
    recognition.onend = ()=>{
      setSearchQuery('')
      setIsListening(false)
    }
    if(isListening){
      recognition.start();
    }else{
      recognition.stop();
    }
    return ()=> recognition.stop()
  }, [isListening]);
    useEffect(()=>{
    const handleClick = ()=>{
        setIsListening(false)
    }
    document.addEventListener('mousedown' , handleClick)
    return ()=> document.removeEventListener('mousedown' , handleClick)
  }, [])
  return (
    <div>
      <div className="flex flex-col xs:flex-row items-center max-w-[650px] mx-auto justify-between gap-2 xs:gap-4 pb-8 md:pb-12">
        <div className="search-dropdown-wrapper xs:w-[78%] self-stretch relative">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClick(undefined, searchQuery);
            }}
            className="flex items-center bg-[var(--color-neutral-800)] pl-6  gap-2 rounded-xl  hover:bg-[var(--color-neutral-700)] cursor-pointer focus-within:[box-shadow:0_0_0_3px_var(--color-neutral-900),0_0_0_5px_var(--color-text)] focus-within:hover:bg-[var(--color-bg)] focus-within:bg-[var(--color-bg)] "
          >
            <svg
              className="svg-icon"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.8438 18.8203C20.0391 19.0156 20.0391 19.3281 19.8438 19.4844L18.9453 20.3828C18.7891 20.5781 18.4766 20.5781 18.2812 20.3828L13.5547 15.6562C13.4766 15.5391 13.4375 15.4219 13.4375 15.3047V14.7969C11.9922 16.0078 10.1562 16.75 8.125 16.75C3.63281 16.75 0 13.1172 0 8.625C0 4.17188 3.63281 0.5 8.125 0.5C12.5781 0.5 16.25 4.17188 16.25 8.625C16.25 10.6562 15.4688 12.5312 14.2578 13.9375H14.7656C14.8828 13.9375 15 14.0156 15.1172 14.0938L19.8438 18.8203ZM8.125 14.875C11.5625 14.875 14.375 12.1016 14.375 8.625C14.375 5.1875 11.5625 2.375 8.125 2.375C4.64844 2.375 1.875 5.1875 1.875 8.625C1.875 12.1016 4.64844 14.875 8.125 14.875Z"
                fill="#D4D3D9"
              />
            </svg>

            <input
              onFocus={(e) => setIsOpen(true)}
              value={searchQuery}
              type="text"
              placeholder="Search for a place..."
              className="w-full py-4 text-[var(--color-text)] placeholder-[var(--color-text)] border-0 outline-0 cursor-pointer"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
              <div className="relative flex items-center justify-center">
      {/* Pulse animation */}
      {isListening && (
        <span className="absolute inline-flex h-16 w-16 rounded-full bg-blue-400 opacity-75 animate-ping"></span>
      )}

      {/* Inner glowing ring */}
      {isListening && (
        <span className="absolute inline-flex h-14 w-14 rounded-full bg-blue-500 opacity-30 blur-md"></span>
      )}

      {/* Main button */}
      <span
        onClick={e => setIsListening(prev => !prev)}
        className={`relative z-10 flex items-center justify-center w-10 h-10 mr-2 rounded-full transition-all duration-300 ${
          isListening
            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-400/40 scale-110"
            : "bg-gray-700 hover:bg-gray-800 text-gray-100"
        }`}
      >
        {isListening ? <Mic /> : <MicOff />}
      </span>
    </div>
          </form>
          {/* location dropDown */}
          {isOpen && location && (
            <div
              className={`auto-suggestion gap-0.5 flex-col absolute top-full bg-[var(--color-neutral-800)] w-full left-0 mt-2 rounded-xl p-2 z-90 text-[var(--color-text)]`}
            >
              {location.map((place, i) => (
                <p
                  onClick={(e) => {
                    handleClick(i);
                    setIsOpen(false);
                  }}
                  key={i}
                  className="font-medium hover:bg-[var(--color-neutral-700)] py-2.5 px-2 border-1 border-transparent hover:border-[var(--color-neutral-600)] rounded-xl cursor-pointer"
                >
                  {`${place.name} ${place?.admin1 ? `, ${place.admin1}` : ""}`}
                </p>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={(e) => handleClick(undefined, searchQuery)}
          className="bg-[var(--color-blue-500)] hover:bg-[var(--color-blue-700)] rounded-xl text-xl px-4 py-2 cursor-pointer self-stretch xs:w-[20%] focus-visible:[box-shadow:0_0_0_3px_var(--color-neutral-900),0_0_0_5px_var(--color-blue-500)] focus-visible:outline-0 text-[var(--color-text)]"
        >
          Search
        </button>
      </div>
    </div>
  );
}
