import React from 'react'

export const NewProduct = () => {
  return (
    <div className='row justify-content-center'>
        <div className='col-md-8'>
            <div className='card'>
                <div className='card-body'>
                    <h2 className='text-center mb-4 font-weight-bold'>
                        Agregar Nuevo Producto
                    </h2>

                    <form>
                        <div className='form-group'>
                            <label>Nombre Producto</label>
                            <input type='text'className='form-control' name='name' placeholder='Nombre Producto' />
                        </div>

                        <div className='form-group'>
                            <label>Precio Producto</label>
                            <input type='number'className='form-control' name='price' placeholder='Precio Producto' />
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
