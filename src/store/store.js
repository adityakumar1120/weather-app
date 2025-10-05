import { configureStore } from "@reduxjs/toolkit";
import dataReducer  from "./weatherdataSlice";
import unitSystemReducer  from "./unitSystemSlice";
import  FetchingStatesReducer  from "./FetchingStates";

export const store = configureStore({
    reducer : {
        weatherData : dataReducer,
        unitSystem : unitSystemReducer,
        fetchingState : FetchingStatesReducer
    }
}) 