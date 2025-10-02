import { configureStore } from "@reduxjs/toolkit";
import dataReducer  from "./weatherdataSlice";

export const store = configureStore({
    reducer : {
        weatherData : dataReducer
    }
}) 