import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useRouter } from 'next/router'

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

  const router = useRouter()

  const [categories,setCategories] = useState([])
  const [currentCategory,setCurrentCategory] = useState({})
  const [product,setProduct] = useState({})
  const [modal,setModal] = useState(false)
  const [order,setOrder] = useState([])
  const [name,setName] = useState('')
  const [total,setTotal] = useState(0)


  const handleClickCategory = (id) =>{
    const category = categories.filter(cat =>{
      return cat.id == id
    })
   
    setCurrentCategory(category[0])

    router.push('/')
  }

  const getCategories = async () =>{

    const {data} = await axios('/api/categories')
    setCategories(data)
  }

  useEffect(()=>{
    getCategories()
  },[])

  useEffect(()=>{
    setCurrentCategory(categories[0])
  },[categories])

  const handleSetProduct = (product) =>{
    return setProduct(product)
  }

  const handleChangeModal = () =>{
   return setModal(!modal)
  }

  const handleAddOrder = ({categoriaId, ...product}) => {

    if(order.some(productState => productState.id === product.id)){
      const updateOrder = order.map(productState => productState.id === product.id
        ? product : productState
      )

      setOrder(updateOrder)
      toast.success('Guardado Correctamente')
    }else{
      setOrder([...order,product])
      toast.success('Agregado al Pedido')
    }

    setModal(false)
  }

  const handleEditAmount = (id) =>{

    const updateProduct = order.filter(product =>(product.id === id))

    setProduct(updateProduct[0])

    setModal(!modal)
  }

  const handleDeleteProduct = (id) =>{
    const updateProducts = order.filter(product =>(product.id !== id))

    setOrder(updateProducts)
  }

  const getOrder = async(e) =>{
    e.preventDefault()

    try {
      const pedido = order
      const nombre = name
      
      await axios.post('/api/order', {pedido,nombre,total,fecha:Date.now().toString()})
 
      setCurrentCategory(categories[0])
      setOrder([])
      setName('')
      setTotal(0)

      toast.success('Pedido Realizado Correctamente')

      setTimeout(()=>{
        router.push('/')
      },3000)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const newTotal = order.reduce((total,product) => (product.precio * product.amount) + total,0)

    setTotal(newTotal)
  },[order])

  return (
    <QuioscoContext.Provider 
      value={{
        categories,handleAddOrder,total,getOrder,name,setName,handleDeleteProduct,handleEditAmount,order,modal,handleClickCategory,handleChangeModal, currentCategory, product, handleSetProduct
      }}
    >
        {children}
    </QuioscoContext.Provider>
  )
}

export {QuioscoProvider}

export default QuioscoContext