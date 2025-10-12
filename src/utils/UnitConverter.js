export const celsiusToFahrenheit = (c)=>{
    return `${((c*(9/5))+32).toFixed()}°`
}
export const kmphToMph = (kmph)=>{
    return `${(kmph*0.621371).toFixed()} mph`
}
export const millimeterToInches = (mm)=>{
    return `${(mm*0.0393701).toFixed()} in`
}
export const meterToKm = (mm)=>{
    return `${(mm/1000).toFixed()} Km`
}