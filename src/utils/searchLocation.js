import axios from "axios";

 export const searchLocation = async (locationName , setLocation) => {
    try {
      if (locationName) {
        const response = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=6&language=en&format=json`
        );
        const data = response.data;
        if (data.results) {
          setLocation(data.results);
          return data.results
          
        } else {
          setLocation('');
          throw new Error([]);
          
        }
    } else {
        setLocation("");
    }
} catch (error) {
    console.log(error);
}
  };