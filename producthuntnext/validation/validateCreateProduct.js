export default function validateCreateAccount (values) {
    let error = {}

    if(!values.name){
        error.name = 'El Nombre Es Obligatorio'
        return error
    }

    if(!values.company){
        error.company = 'Nombre de Empresa Es Obligatorio'
        return error
    }

    if(!values.url){
        error.url = 'La url del Producto es Obligatoria'
        return error
        
    } else if  (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)){
        error.url = 'URL no valida'
        return error
    }

    if(!values.description){
        error.description = 'Agrega una Descripcion del Producto'
        return error
    }

    return error
}