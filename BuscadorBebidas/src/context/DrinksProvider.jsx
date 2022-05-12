import React, { createContext, useState,useEffect } from 'react'
import axios from 'axios'

const DriksContext = createContext()

const DrinksProvider = ({children}) => {

    const [drinks,setDrinks] = useState([])
    const [modal,setModal] = useState(false)
    const [drinkId,setDrinkId] = useState(null)
    const [recipe,setRecipe] = useState({})
    const [loading,setLoading] = useState(false)

    const getDrinks = async (name,category) =>{
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}&c=${category}`

            const {data} = await axios(url)
            setDrinks(data.drinks)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setLoading(true)
        setRecipe({})
        const getRecipe = async()=>{
            if(!drinkId) return

            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`

                const {data} = await axios(url)
                setRecipe(data.drinks[0])
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }   

      getRecipe()
    }, [drinkId])
    

    const handleModalClick = ()=>{
        setModal(!modal)
    }

    const handleDrinkIdClick = (id)=>{
        setDrinkId(id)
    }

  return (
    <DriksContext.Provider value={{loading,recipe,handleDrinkIdClick,modal,drinks,getDrinks,handleModalClick}}>
        {children}
    </DriksContext.Provider>
  )
}

export {
    DrinksProvider
}

export default DriksContext