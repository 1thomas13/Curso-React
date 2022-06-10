import React, { Fragment, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getProductsAction } from '../actions/actionsProduct'
import { Product } from './Product'

const Products = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const loadingProducts = () => dispatch(getProductsAction())
        loadingProducts()
    }, []);

    const products = useSelector(state => state.products.products)
    const error = useSelector(state => state.products.error)

    const loading = useSelector(state => state.products.loading)

  return (
    <Fragment>
        <h2 className='text-centter my-5'>Listado de Productos</h2>
        {error ? <p className='font-weight-bold alert alert-danger text-center mt-4'>
            Hubo un Error
        </p> : null}
        {loading ? <p className='text-center'>Cargando...</p> : null}
        <table className='table table-striped'>
            <thead className='bg-primary table-dark'>
                <tr>
                    <th scope='col'> 
                        Nombre
                    </th>
                    <th scope='col'> 
                        Precio
                    </th>
                    <th scope='col'> 
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {products.length === 0  ? 'Aun no hay Productos' : (
                    products.map(product => (
                        <Product key={product.id} product={product} />
                    ))

                )}
            </tbody>
        </table>
    </Fragment>
  )
}


export default Products