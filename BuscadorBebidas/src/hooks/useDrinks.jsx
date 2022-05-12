import React, { useContext } from 'react'
import DriksContext from '../context/DrinksProvider'

const useDrinks = () => {
  return (
    useContext(DriksContext)
  )
}

export default useDrinks