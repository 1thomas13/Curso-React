import {
  ADD_PR0DUCT,
  ADD_PR0DUCT_SUCCESS,
  ADD_PR0DUCT_ERROR
} from '../types'

export function addNewProductAction(product) {
  return ()=> {
    console.log(product)
  }
} 