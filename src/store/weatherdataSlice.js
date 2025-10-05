import { createSlice } from "@reduxjs/toolkit";

 const weatherDataSlice = createSlice({
    name : 'weatherData',
    initialState : {},
    reducers : {
        setData : (state , action)=>{
            return action.payload
        }
    }
})

export const {setData} = weatherDataSlice.actions
export default weatherDataSlice.reducer
