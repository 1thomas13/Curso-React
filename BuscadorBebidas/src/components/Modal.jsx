import React from 'react'
import { Image, Modal as ModalBootstrap} from 'react-bootstrap'
import useDrinks from '../hooks/useDrinks'

export const Modal = () => {

    const {handleModalClick,modal,recipe,loading} = useDrinks()

    const showIngredients = () =>{
        let ingredients = []
    
        for(let i = 1;i<16;i++){
            
            if(recipe[`strIngredient${i}`]){
                ingredients.push(
                    <li>
                        {recipe[`strIngredient${i}`]} 
                        {recipe[`strMeasure${i}`]}
                    </li>
                )
            }
        }
        return ingredients
    }
   
  return (
    !loading && (<ModalBootstrap show={modal} onHide={handleModalClick}>
        <Image src={recipe.strDrinkThumb} alt={`${recipe.strDrink} image`} />

        <ModalBootstrap.Header>
            <ModalBootstrap.Title>{recipe.strDrink}</ModalBootstrap.Title>
        </ModalBootstrap.Header>

        <ModalBootstrap.Body>
            <div className='p-3'>
                <h2>Instrucciones</h2>
                {recipe.strInstructions}

                <h2>Ingredientes</h2>
                {showIngredients()}
            </div>
        </ModalBootstrap.Body>
    </ModalBootstrap>
  ))
}
