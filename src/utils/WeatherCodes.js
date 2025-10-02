// Mapping of weather codes to descriptions & icon names
export const weatherCodeMap = {
  0: { desc: "Clear sky", icon: "sunny" },
  1: { desc: "Mainly clear", icon: "sunny" },
  2: { desc: "Partly cloudy", icon: "partly-cloudy" },
  3: { desc: "Overcast", icon: "overcast" },
  45: { desc: "Fog", icon: "fog" },
  48: { desc: "Depositing rime fog", icon: "fog" },
  51: { desc: "Light drizzle", icon: "drizzle" },
  53: { desc: "Moderate drizzle", icon: "drizzle" },
  55: { desc: "Dense drizzle", icon: "drizzle" },
  61: { desc: "Slight rain", icon: "rain" },
  63: { desc: "Moderate rain", icon: "rain" },
  65: { desc: "Heavy rain", icon: "rain" },
  71: { desc: "Slight snow fall", icon: "snow" },
  73: { desc: "Moderate snow fall", icon: "snow" },
  75: { desc: "Heavy snow fall", icon: "snow" },
  77: { desc: "Snow grains", icon: "snow" },
  80: { desc: "Rain showers", icon: "rain" },
  81: { desc: "Moderate rain showers", icon: "rain" },
  82: { desc: "Violent rain showers", icon: "rain" },
  85: { desc: "Slight snow showers", icon: "snow" },
  86: { desc: "Heavy snow showers", icon: "snow" },
  95: { desc: "Thunderstorm", icon: "thunder" },
  96: { desc: "Thunderstorm with hail", icon: "thunder" },
  99: { desc: "Thunderstorm with heavy hail", icon: "thunder" }
};

// Function to get description & icon safely
export function getWeatherIcon(code) {
  return weatherCodeMap[code] || { desc: "Unknown", icon: "sunny" };
}
