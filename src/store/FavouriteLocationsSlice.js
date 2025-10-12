import { createSlice } from "@reduxjs/toolkit";

const favouriteLocationsSlice = createSlice({
    initialState : (()=>{
        const localval = JSON.parse(localStorage.getItem('favouriteLocations'))
        if(localval){
            return localval
        }
        return []
    })(),
    name: 'favouriteLocations',
    reducers : {
        addLocation : (state , action)=>{
           const isPresent = state.some((place)=>{
                return place.id === action.payload.id
            })
            if(!isPresent){
                state.push(action.payload)
            }
            return state
        },
        deleteLocation : (state , action)=>{
           return state.filter((place)=> place.id !== action.payload.id)
        }
    }
})
export const {addLocation , deleteLocation} = favouriteLocationsSlice.actions
export default favouriteLocationsSlice.reducer