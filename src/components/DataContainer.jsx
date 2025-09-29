import React from "react";
import HeroHeading from "./HeroHeading";
import Dropdown from "./Dropdown";
import WeatherStatsGrid from "./WeatherStatsGrid";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";

export default function DataContainer() {
  const data = [0, 46, 14, 17];
  return (
    <div className="flex justify-between flex-col lg:flex-row gap-8 md:gap-12 lg:gap-0">
      <div className="lg:w-[63%] ">
        <HeroHeading />
        <WeatherStatsGrid/>
        <DailyForecast/>
      </div>
      <HourlyForecast/>
    </div>
  );
}
