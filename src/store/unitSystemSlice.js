import { createSlice } from "@reduxjs/toolkit";

const unitSystemSlice = createSlice({
    name: 'unitSystemSlice',
    initialState: {
        oldSystemMetricVal : true,
        isSystemMetric: true,
        temperature: {
            isCelsius: true,
            isFahrenheit: false
        },
        windSpeed: {
            isKmph: true,
            isMph: false,

        },
        precipitation: {
            isMillimeters: true,
            isInches: false,

        }
    },
    reducers: {
        changeSystem: (state, action) => {
            const newState = { ...state, isSystemMetric: !state.oldSystemMetricVal , oldSystemMetricVal : !state.oldSystemMetricVal};

            if (newState.isSystemMetric) {
                newState.temperature = { isCelsius: true, isFahrenheit: false };
                newState.windSpeed = { isKmph: true, isMph: false };
                newState.precipitation = { isMillimeters: true, isInches: false };
            } else {
                newState.temperature = { isCelsius: false, isFahrenheit: true };
                newState.windSpeed = { isKmph: false, isMph: true };
                newState.precipitation = { isMillimeters: false, isInches: true };
            }

            return newState;
        },
        changeOneUnit : (state , action)=>{
            const [systemTrue , trueUnit] = action?.payload?.trueUnit?.split('.')
            const [systemFalse , falseUnit] = action?.payload?.falseUnit?.split('.')
            state[systemTrue][trueUnit] = true
            state[systemFalse][falseUnit] = false
            state.isSystemMetric = null
        }
    }
})
export const { changeSystem , changeOneUnit } = unitSystemSlice.actions
export default unitSystemSlice.reducer