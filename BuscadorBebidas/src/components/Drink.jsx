import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import useDrinks from '../hooks/useDrinks'

export const Drink = ({drink}) => {

  const {handleModalClick,handleDrinkIdClick} = useDrinks()

  return (
    <Col md={6} lg={3}>
        <Card className='md-4'>
            <Card.Img
                variant='top'
                src={drink.strDrinkThumb}
                alt={`${drink.strDrink} image`}
            />

            <Card.Body>
                <Card.Title>{drink.strDrink}</Card.Title>
                <Button 
                  onClick={()=>
                    {handleModalClick()
                    handleDrinkIdClick(drink.idDrink)
                  }} 
                  variant='warning' 
                  className='w-100 text-uppercase mt-2'>Ver receta
                </Button>
            </Card.Body>
        </Card>

        
    </Col>
  )
}
