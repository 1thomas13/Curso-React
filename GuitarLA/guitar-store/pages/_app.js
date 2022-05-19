import '../styles/normalize.css'
import '../styles/globals.css'
import { useEffect, useState } from 'react'


function MyApp({ Component, pageProps }) {

  const [carrito,setCarrito] = useState([])

  useEffect(() => {
    const carritoLS = JSON.parse(localStorage.getItem("carrito")) ?? [];
        if (carritoLS.length !== 0) {
             setCarrito(carritoLS);
        }
  }, []);

  useEffect(()=>{
    localStorage.setItem('carrito', JSON.stringify(carrito))
  },[carrito])


  const updateAmount = (product) =>{
    const updateCarrito = carrito.map(art =>{
      if(art.id === product.id){
        art.amount = product.amount
      }

      return art
    })

    setCarrito(updateCarrito)
  }

  const addCarrito = product =>{

    if(carrito.some(art=> art.id === product.id)){

      const updateCarrito = carrito.map(art =>{
        if(art.id === product.id){
          art.amount = product.amount
        }

        return art
      })

      setCarrito(updateCarrito)

    } else{
      setCarrito([...carrito,product])
    }

  }

  const deleteProduct = id =>{
    const updateCarrito = carrito.filter(art =>{
      return art.id !== id
    })

    setCarrito(updateCarrito)
  }

  return <Component {...pageProps} deleteProduct={deleteProduct} updateAmount={updateAmount} carrito={carrito} addCarrito={addCarrito} />
}

export default MyApp
