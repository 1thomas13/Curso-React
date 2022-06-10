import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { deleteProductAction, getEditProduct } from '../actions/actionsProduct'
import Swal from 'sweetalert2'

export const Product = ({product}) => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const confirmDelete = id => {

    Swal.fire({
      title: 'Estas seguro?',
      text: "Un producto que se elemina no se puede recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eleminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductAction(id))
        
      }
    })
  }

  const redirectEdit = (product) => {
    dispatch(getEditProduct(product))
    navigate(`/productos/editar/${product.id}`)
  } 

  return (
    <tr>
        <td>{product.name}</td>
        <td><span className='font-weight-bold'>${product.price}</span></td>
        <td className='acciones'>
            <button onClick={() => redirectEdit(product)} type='button' to={`/productos/editar/${product.id}`} className="btn btn-primary mr-2">
                Editar
            </button>

            <button onClick={() => confirmDelete(product.id)} className="btn btn-danger mr-2" type='button'>Eleminar</button>
        </td>
    </tr>
  )
}
