import React, { useState } from 'react'
import { addNewProductAction } from '../actions/actionsProduct'
const {useDispatch,useSelector} = require('react-redux')

export const NewProduct = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)

    const dispatch = useDispatch()

    const addProduct =  (product) => dispatch(addNewProductAction(product))

    const submitNewProduct =(e) =>{

        if(name.trim() === '' || price.trim() <= 0){
            return
        }

        e.preventDefault()

        addProduct({name,price})
    }


  return (
    <div className='row justify-content-center'>
        <div className='col-md-8'>
            <div className='card'>
                <div className='card-body'>
                    <h2 className='text-center mb-4 font-weight-bold'>
                        Agregar Nuevo Producto
                    </h2>

                    <form onSubmit={submitNewProduct}>
                        <div className='form-group'>
                            <label>Nombre Producto</label>
                            <input type='text'className='form-control' name='name' placeholder='Nombre Producto' value={name} onChange={e =>setName(e.target.value)} />
                        </div>

                        <div className='form-group'>
                            <label>Precio Producto</label>
                            <input type='number'className='form-control' name='price' placeholder='Precio Producto' value={price} onChange={e =>setPrice(Number(e.target.value))} />
                        </div>

                        <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                            Agregar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
