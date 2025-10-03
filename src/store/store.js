import { configureStore } from "@reduxjs/toolkit";
import dataReducer  from "./weatherdataSlice";
import unitSystemReducer  from "./unitSystemSlice";

export const store = configureStore({
    reducer : {
        weatherData : dataReducer,
        unitSystem : unitSystemReducer,
    }
}) 