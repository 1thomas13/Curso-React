
import Image from "next/image"
import Link from "next/link"
import { dateFormat } from "../helpers"
import styles from '../styles/Entrada.module.css'

export const Entrada = ({data}) => {

    const {titulo,resumen, img, published_at, id,url} = data
    
  return (
    <article>
        
        <Image width={800} height={600} layout='responsive' alt={`img blog ${titulo}`} src={'http://localhost:1337'+img.url}/>

        <div className={styles.contenido}>
            <h3>{titulo}</h3>
            <p className={styles.fecha}>{dateFormat(published_at)}</p>
            <p className={styles.resumen}>{resumen}</p>

            <Link href={`/blog/${url}`}>
              <a className={styles.link}>Leer Entrada</a>
            </Link>
        </div>
    </article>
  )
}
