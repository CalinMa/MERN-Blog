import { useState, useEffect } from 'react'

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup function that resets the timeout if value changes
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}