import React from "react";
import { useSelector } from "react-redux";
import { celsiusToFahrenheit, kmphToMph, meterToKm, millimeterToInches } from "../utils/UnitConverter";

export default function WeatherStatsGrid() {
    const {current } = useSelector((state)=> state.weatherData)
  const { temperature, windSpeed, precipitation , visibility} = useSelector((state) => state.unitSystem); 
  const showInfo = [
    { infoName: "feels_like", val : temperature?.isCelsius ? `${current?.feels_like}°` : celsiusToFahrenheit(current?.feels_like) },
    { infoName: "humidity", val : `${current?.humidity}%` },
    { infoName: "wind_speed", val : windSpeed?.isKmph ? `${current?.wind_speed} km/h` : kmphToMph(current?.wind_speed) },
    { infoName: "precipitation", val : precipitation.isMillimeters ? `${current?.precipitation.toFixed()} mm` : millimeterToInches(current?.precipitation) },
    { infoName: "uV_index", val :  current?.uv_index},
  { infoName: "visibility", val : visibility.isMeter ? `${current?.visibility} m` : meterToKm(current?.visibility) },
    { infoName: "surface_pressure", val : `${current?.surface_pressure} hPa` },
  ];
  const formatText = (word) => {
    return word
      .split("_")
      .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
      .join(" ");
  };
  return (
    <>
      {current && (
        <div className="mt-5 md:mt-8 grid grid-cols-2 gap-4 xs:grid-cols-4 xs:gap-3 md:gap-6">
          {showInfo.map((e, i) => {
            return (
              <div
                key={i}
                className="flex flex-col bg-[var(--color-neutral-800)] rounded-xl gap-2.5 py-4.5 px-4 border-1 border-[var(--color-neutral-600)]"
              >
                <span className="text-lg">{formatText(e?.infoName)}</span>
                <span className="text-3xl">
                  {e?.val !== "" ? <>{e.val}</> : "-"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
