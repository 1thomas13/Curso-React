import {
  ADD_PR0DUCT,
  ADD_PR0DUCT_SUCCESS,
  ADD_PR0DUCT_ERROR,
  START_DOWNLOAD_PRODUCTS,
  START_DOWNLOAD_SUCCESS,
  START_DOWNLOAD_ERROR,
  GET_DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  GET_EDIT_PRODUCT,
  START_EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR
} from '../types'

import axiosClient from '../config/axios'
import Swal from 'sweetalert2'
import { EditProduct } from '../components/EditProduct'

export function addNewProductAction(product) {
  return async(dispatch)=> {
    dispatch(addProduct())

    try {
      await axiosClient.post('/productos', product)

      dispatch(addProductSuccess(product))
      
      Swal.fire('Correcto', 'El Producto se Agrego Correctamente', 'success')
    } catch (error) {
      console.log(error)
      dispatch(addProductError(true))

      Swal.fire({icon:'error', title:'Hubo un Error', text:'Hubo un error, intenta de nuevo' })
    }
  }
} 

const addProduct = () => ({
  type: ADD_PR0DUCT,
  payload: true
})

const addProductSuccess = (product) => ({
  type:   ADD_PR0DUCT_SUCCESS,
  payload: product
})

const addProductError = (state) => ({
  type:  ADD_PR0DUCT_ERROR,
  payload: state
})

export function getProductsAction () {
  return async(dispatch) => {
    dispatch(downloadProducts())

    try {
      const res = await axiosClient.get('/productos')

      dispatch(downloadProductsSuccess(res.data))


    } catch (error) {
      dispatch(downloadProductsError())
      console.log(error)
    }
  }
}

const downloadProducts = () => ({
  type:START_DOWNLOAD_PRODUCTS,
  payload:true
})

const downloadProductsSuccess = (products) => ({
  type:START_DOWNLOAD_SUCCESS,
  payload:products
})

const downloadProductsError = (products) => ({
  type:START_DOWNLOAD_ERROR,
  payload: true
})

export function deleteProductAction(id) {
  return async(dispatch) => {
    dispatch(getProductDelete(id))
    
    try {
      await axiosClient.delete(`/productos/${id}`)
      dispatch(deleteProductSuccss())

      Swal.fire(
        'Producto Eleminado!',
        'El producto se elemino Correctamente.',
        'success'
      )

    } catch (error) {
      dispatch(deleteProductError())
    }
  }
}

const getProductDelete = id => ({
  type:GET_DELETE_PRODUCT,
  payload:id
})

const deleteProductSuccss = () => ({
  type:DELETE_PRODUCT_SUCCESS,
})

const deleteProductError = () => ({
  type: DELETE_PRODUCT_ERROR,
  payload:true
})

export function getEditProduct(product){
  return (dispatch) => {
    dispatch(getProductAction(product))
  }
}

const getProductAction = (product) => ({
    type: GET_EDIT_PRODUCT,
    payload: product
})

export function editProductAction(product) {
  return async(dispatch) => {
    dispatch(editProduct())

    try {
      await axiosClient.put(`/productos/${product.id}`, product)
      
      dispatch(editProductSuccess(product))

    } catch (error) {
      dispatch(editProductError)
      console.log(error)
    }
  }
}

const editProduct = () => ({
  type: START_EDIT_PRODUCT
})

const editProductSuccess = (product) => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload: product
})

const editProductError = () => ({
  type:EDIT_PRODUCT_ERROR,
  payload:true
})