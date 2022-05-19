import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/Guitar.module.css'

export const Guitar = ({guitarra}) => {

    const {img,descripcion,nombre,precio,url} = guitarra
  
  return (
    <div className={styles.guitar}>
        <Image alt={`img guitarra ${nombre}`} layout='responsive' width={180} height={350} src={'http://localhost:1337'+img[0].url}/>
        <div className={styles.contenido}>
            <h3>{nombre}</h3>
            <p className={styles.descripcion}>{descripcion}</p>
            <p className={styles.precio}>${precio}</p>
            <Link href={`/guitarras/${url}`}>
                <a className={styles.link}>Ver producto</a>
            </Link>
        </div>
    </div>
  )
}
