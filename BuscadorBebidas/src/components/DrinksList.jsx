import React from 'react'
import { Row } from 'react-bootstrap'
import useDrinks from '../hooks/useDrinks'
import { Drink } from './Drink'

export const DrinksList = () => {

    const {drinks }= useDrinks()

  return (
    <Row className='mt-5'>
        {drinks.map(drink =>{
            return <Drink key={drink.idDrink} drink={drink} />
        })}
    </Row>
  )
}
