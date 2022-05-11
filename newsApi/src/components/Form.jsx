import React from 'react'
import {FormControl,InputLabel,Select,MenuItem,Button,Box} from '@mui/material'
import useNews from '../hooks/useNews'


const CATEGORIES = [
    { value: 'general', label: 'General'},
    { value: 'business', label: 'Negocios'},
    { value: 'entertainment', label: 'Entretenimiento'},
    { value: 'health', label: 'Salud'},
    { value: 'science', label: 'Ciencia'},
    { value: 'sports', label: 'Deportes'},
    { value: 'technology', label: 'Tecnología'},
]

export const Form = () => {

    const {category,handleChangeCategory} = useNews()

  return (
    <form>
        <FormControl fullWidth>
            <InputLabel>Categoria</InputLabel>
            <Select onChange={handleChangeCategory} value={category} label='categoria'>
                {CATEGORIES.map(category => (
                    <MenuItem 
                        key={category.value}
                        value={category.value}
                    >
                        {category.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </form>
  )
}
