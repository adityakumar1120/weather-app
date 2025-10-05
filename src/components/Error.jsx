import React from "react";
export default function Error({message}) {
  return <>
  {
    message === 'No search result found!' ? <p className="font-bold text-3xl text-center">No search result found!</p> :
    <div className="flex justify-center">
     <div className="max-w-[550px] flex flex-col items-center gap-6">
        <img className="w-6" src='./error.svg' alt="" />
      <p className="font-bold text-5xl">Something went wrong</p>
      <p className="text-center">
        We couldn’t connect to the server (API error). Please try again in a few
        moments.
      </p>
    </div>
   </div>
  }
  </>
}
