import React from 'react'
import { SummaryProduct } from '../components/SummaryProduct'
import { useQuiosco } from '../hooks/useQuiosco'
import { Layout } from '../layout/Layout'

export default function Resumen  () {

    const {order} = useQuiosco()

    return (
    <Layout page={'resumen'}>
        <h1 className='text-4xl font-black'>
            Resumen
        </h1>
        <p className='text-2xl my-10'>Revisa tu Pedido</p>

        {
            order.length === 0 ? (
                <p className='text-center text-2xl'>
                    No hay Elementos En Tu Pedido
                </p>
            ) : 
                order.map(product =>(
                    <SummaryProduct key={product.id} product={product}/>
                ))

            }

    </Layout>
     
    )
  }