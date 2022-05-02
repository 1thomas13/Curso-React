import React from 'react'

export const Filters = ({filter,setFilter}) => {

    

  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className='campo'>
                <label>Filtrar Gastos</label>
                <select value={filter} onChange={(e)=> setFilter(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscriptciones</option>
                    <option value="gastos">Gastos Varios</option>
                </select>
            </div>
        </form>
    </div>
  )
}
