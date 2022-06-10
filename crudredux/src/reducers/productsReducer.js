
import { Product } from '../components/Product'
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
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR
} from '../types'

//cada reducer tiene su propio state

const initialState = {
    products: [],
    error: null,
    loading: false,
    deleteProduct: null,
    editProduct: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch(action.type) {

        case START_DOWNLOAD_PRODUCTS:
        case ADD_PR0DUCT:
            return {
                ...state,
                loading: action.payload
            }

        case ADD_PR0DUCT_SUCCESS:
            return {
                ...state,
                loading:false,
                products:[...state.products, action.payload]
            }

        case START_DOWNLOAD_ERROR:
        case DELETE_PRODUCT_ERROR:
        case ADD_PR0DUCT_ERROR:
        case EDIT_PRODUCT_ERROR:
            return {
                ...state,
                loading:false,
                error: action.payload
             }
        
        case START_DOWNLOAD_SUCCESS :
            return {
                ...state,
                loading:false,
                error: null,
                products:action.payload
            }
        
        case GET_DELETE_PRODUCT: 
            return {
                ...state,
                deleteProduct: action.payload
            }

        case DELETE_PRODUCT_SUCCESS:
            return  {
                ...state,
                products: state.products.filter((product)=> product.id !== state.deleteProduct),
                deleteProduct: null
            }

        case GET_EDIT_PRODUCT:
            return {
                ...state,
                editProduct: action.payload
            }

        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                editProduct: null,
                products: state.products.map((product) =>
                    product.id === action.payload.id ? product = action.payload :
                    product
                )
            }

        default: 
            return state
    }
}