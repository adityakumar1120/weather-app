import { createSlice } from "@reduxjs/toolkit";

 const FetchingStates = createSlice({
    name : 'fetchingState',
    initialState : {
        isLoading : false,
        error : {
            isError : false,
            message : ''
        }
    },
    reducers : {
        setLoading : (state , action)=>{
            return {...state , isLoading : action.payload}
        },
        setError : (state , action)=>{
            return {...state , error : {isError : action.payload.isError , message : action.payload.message}}
        },
    }
})
export const {setLoading , setError} = FetchingStates.actions 
export default FetchingStates.reducer