export const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

 export  function getDay(date) {
      return days[new Date(date).getDay()];
    };
 export  function getMonth(date) {
      return months[new Date(date).getMonth()];
    };
 export  function getYear(date) {
      return new Date(date).getFullYear();
    };
 export  function getDate(date) {
      return new Date(date).getDate();
    };