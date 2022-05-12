import React, { useState } from 'react'
import {Button,Form as FormBoostrap,Row,Col,Alert} from 'react-bootstrap'
import useCategories from '../hooks/useCategories'
import useDrinks from '../hooks/useDrinks'

export const Form = () => {

    const {categories} = useCategories()
    const {getDrinks} = useDrinks()
    
    const [alert,setAlert] = useState('')
    const [search,setSearch] = useState({
        name:'',
        category:''
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(search)
        if(Object.values(search).includes('')){
            setAlert('Todos los campos son obligatorios')
            return
        }
        setAlert('')
        getDrinks(search.name,search.category)

    }

  return (
    <FormBoostrap onSubmit={handleSubmit}>

        {alert && <Alert className={'text-center'} variant='danger'>{alert}</Alert>}
        <Row>
            <Col md={6}>
                <FormBoostrap.Group className='mb-3'>
                    <FormBoostrap.Label htmlFor='name'>
                        Nombre Bebida
                    </FormBoostrap.Label>

                    <FormBoostrap.Control onChange={e => setSearch({...search,[e.target.name]:e.target.value})}
                     id='name' typre='text' name='name' 
                     placeholder='Ej: Cafe, Vodka, etc'
                     value={search.name}
                    />
                </FormBoostrap.Group>
            </Col>
            <Col md={6}>
                <FormBoostrap.Group className='mb-3'>
                    <FormBoostrap.Label htmlFor='category'>
                        Categoria Bebida
                    </FormBoostrap.Label>

                    <FormBoostrap.Select onChange={e => setSearch({...search,[e.target.name]:e.target.value})} name='category' id='category'
                        value={search.category}
                    >
                        <option> Seleccione una Categoria </option>
                        {categories.map(category =>(
                            <option key={category.strCategory} value={category.strCategory}>
                                {category.strCategory}
                            </option>
                        ))}
                    </FormBoostrap.Select>
                </FormBoostrap.Group>
            </Col>
        </Row>

        <Row className='justify-content-end'>
            <Col md={3}>
                <Button type='submit' variant='danger' className='text-uppercase w-100'>Buscar Bebidas</Button>
            </Col>
        </Row>
    </FormBoostrap>
  )
}
