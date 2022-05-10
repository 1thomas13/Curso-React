export const marcas = [
    {id: 1, name:'Europeo' },
    {id: 2, name:'Americano' },
    {id: 3, name:'Asiatico' },
]

const yearMax = new Date().getFullYear()

export const years = Array.from(new Array(20), (value,index)=> yearMax-index)

export const plans = [
    {id: 1, name:'Básico' },
    {id: 2, name:'Completo' }
]
