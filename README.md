# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

- Search for weather information by entering a location in the search bar
- View current weather conditions, including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons ✅
- View an hourly forecast showing temperature changes throughout the day ✅
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size ✅
- See hover and focus states for all interactive elements on the page ✅

### Extra Features
1. Add geolocation detection to automatically show weather for the user's current location on first visit
2. Implement a favorites/saved locations system where users can bookmark frequently checked locations
3. Implement a "Compare Locations" feature to view weather side-by-side for multiple locations
4. Include UV index, visibility, and air pressure data (available via Open-Meteo)
5. Add sunrise/sunset times with visual indicators
6. Add animated weather backgrounds that change based on current conditions
7. Implement voice search functionality
8. Create dark/light mode themes that adapt to the time of day
9. Add progressive web app (PWA) capabilities for mobile installation