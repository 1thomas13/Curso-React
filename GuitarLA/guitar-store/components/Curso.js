import Link from 'next/link'
import React from 'react'
import styles from '../styles/Curso.module.css'

export const Curso = ({cursos}) => {

    const {titulo,contenido,img} = cursos
    const image = `http://localhost:1337${img[0].url}`

  return (
    <section>
        <div className={`contenedor  ${styles.grid}`}>
            <div className={styles.contenido}>
                <h2 className='heading'>{titulo}</h2>
                <p className={styles.text}>{contenido}</p>

                
                    <a className={styles.link} href='#'>
                        Mas Informacion
                    </a>
                
            </div>
        </div>

        <style jsx>{`
            section {
                padding: 10rem 0;
                margin-top: 10rem;
                background-image:linear-gradient(to right, rgb(0 0 0 / .65), rgb(0 0 0 / .7)), url(${image});
                background-size: cover;
                background-position: 50%;
            }
        `}</style>
    </section>
  )
}
