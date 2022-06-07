export default function validateLogin (values) {
    let error = {}

    if(!values.email){
        error.email = 'El Email Es Obligatorio'
        return error
    }

    if(!values.email){
        error.email = 'El Email Es Obligatorio'
        return error

    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        error.email = 'El Email No es Valido'
        return error
    }

    if(!values.password){
        error.password = 'La Contraseña Es Obligatoria'
        return error
        
    } else if  (values.password.length < 6){
        error.email = 'El password debe ser de al menos 6 caracteres'
        return error
    }

    return error
}