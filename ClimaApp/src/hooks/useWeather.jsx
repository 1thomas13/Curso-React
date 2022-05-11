import React, { useContext } from 'react'
import WeatherContext from '../context/WeatherProvider'

export const useWeather = () => {

  return (
    useContext(WeatherContext)
  )
}
