import Link from 'next/link'
import React from 'react'
import { Layout } from '../components/Layout'
import styles from '../styles/Error404.module.css'

 const Error404 = () => {
  return (
 
        <div className={styles.error}>
            <h1 className='heading'>Pagina no encontrada</h1>
            <Link href='/'>Volver al inicio</Link>
        </div>
       
  )
}

export default Error404
