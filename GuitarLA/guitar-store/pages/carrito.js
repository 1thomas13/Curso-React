

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import styles from '../styles/Carrito.module.css'

const Carrito = ({carrito,updateAmount,deleteProduct}) => {

  const [total,setTotal] = useState(0)

  useEffect(()=>{
    const calculateTotal = carrito.reduce((total,product) => {
      return total + product.amount * product.precio
    },0)

    setTotal(calculateTotal)

  },[carrito])

  return (
    <Layout page={'carrito de compras'}>
        <h1 className='heading'>Carrito</h1>
        <main className={`contenedor ${styles.contenido}`}>
            <div className={styles.carrito}>
              <h2>Articulos</h2>

                {carrito.length === 0 ? 'Carrito Vacio' : (
                  carrito.map(product=> (
                    <div key={product.id} className={styles.product}>
                      <div>
                        <Image layout='responsive' width={250} height={500} src={product.img} alt={`img ${product.nombre}`} />
                      </div>
                      <div>
                        <p className={styles.nombre}>{product.nombre}</p>
                        <div className={styles.amount}>
                          <p >
                            Cantidad: 
                          </p>
                          <select onChange={e => updateAmount({amount: e.target.value, id: product.id})} value={product.amount} className={styles.select}>
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                              <option value='3'>3</option>
                              <option value='4'>4</option>
                              <option value='5'>5</option>
                              <option value='6'>6</option>
                          </select>
                        </div>
                        <p className={styles.precio}>$<span>{product.precio}</span></p>
                        <p className={styles.subtotal}>
                          Subtotal: $
                          <span>
                            {product.precio * product.amount}
                          </span>
                        </p>
                      </div>
                      <button type='button' onClick={() => deleteProduct(product.id)} className={styles.delete}>
                        X
                      </button>
                    </div>
                  ))
                )}
            </div>
            <div className={styles.resumen}>
              
              {
                total > 0 ? (
                  <>
                    <h3>Resumen del Pedido</h3>
                    <p>Resumen del Pedido</p>
                    <p>Total a Pagar: ${total}</p>
                    <a className={styles.link}>Comprar</a>
                  </>
                ) : 
                <p>
                  No hay productos en el carrito
                </p>
              }
            </div>
        </main>
    </Layout>
    
  )
}

export default Carrito