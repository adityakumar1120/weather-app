import React, { useEffect } from 'react'

export default function useClickOutside(className ,  handler) {
  useEffect(()=>{
    const handleClick = (event)=>{
        if(!event.target.closest(className)){
            handler()
        }
    }
    document.addEventListener('mousedown' , handleClick)
    return ()=> document.removeEventListener('mousedown' , handleClick)
  }, [className, handler])
}
