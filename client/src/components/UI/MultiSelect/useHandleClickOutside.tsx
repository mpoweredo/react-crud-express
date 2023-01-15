import React, { useEffect, useRef } from 'react'

const useHandleClickOutside = (handleClick: () => void) => {
  const refElement = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        refElement.current &&
        !refElement.current.contains(event.target as Node)
      ) {
        handleClick()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [refElement])

  return refElement
}

export default useHandleClickOutside
