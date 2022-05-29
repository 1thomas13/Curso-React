
import {
    ADD_PR0DUCT,
    ADD_PR0DUCT_SUCCESS,
    ADD_PR0DUCT_ERROR
} from '../types'

//cada reducer tiene su propio state

const initialState = {
    products: [],
    error: null,
    loading: false
}

export default function(state = initialState,action) {
    switch(action.type) {
        default: 
            return state
    }
}