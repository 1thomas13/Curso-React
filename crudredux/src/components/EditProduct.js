import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { editProductAction } from "../actions/actionsProduct"
import {Link, useNavigate} from 'react-router-dom'

export const EditProduct = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [product,setProduct] = useState({
        name:'',
        price:''
    })

    const productEdit = useSelector(state => state.products.editProduct)

    useEffect(() => {
        setProduct(productEdit)
    }, [productEdit]);

    const onChangeForm = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const submitEditProduct = e => {
        e.preventDefault()

        dispatch(editProductAction(product)) 
        navigate(`/`)
    }

  return (
    <div className='row justify-content-center'>
        <div className='col-md-8'>
            <div className='card'>
                <div className='card-body'>
                    <h2 className='text-center mb-4 font-weight-bold'>
                        Editar Producto
                    </h2>

                    <form onSubmit={submitEditProduct}>
                        <div className='form-group'>
                            <label>Nombre Producto</label>
                            <input onChange={onChangeForm} value={product.name} type='text'className='form-control' name='name' placeholder='Nombre Producto' />
                        </div>

                        <div className='form-group'>
                            <label>Precio Producto</label>
                            <input onChange={onChangeForm} value={product.price} type='number'className='form-control' name='price' placeholder='Precio Producto' />
                        </div>

                        <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                            Guardar Cambios
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
