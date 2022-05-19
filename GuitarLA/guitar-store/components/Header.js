import Link from "next/link"
import Image from "next/image"
import styles from "../styles/Header.module.css"
import {useRouter} from 'next/router'

export const Header = ({guitar}) => {
  
  const router = useRouter()

  return (
    <header className={styles.header}>
       
      <div className="contenedor">
        <div className={styles.bar}>
          <Link href="/" >
            <a>
              <Image priority='true' width={400} height={100} src="/img/logo.svg" alt="logo"/>
            </a>
            
          </Link>
          <nav className={styles.nav}>
              <Link href='/'>Inicio</Link>
              <Link href='/nosotros'>Nosotros</Link>
              <Link href='/blog'>Blog</Link>
              <Link href='/tienda'>Tienda</Link>
              <Link href='/carrito'>
                <a>
                  <Image layout="fixed" width={30} height={25} src='/img/carrito.png' alt="img carrito" />
                </a>
              </Link>
          </nav>
        </div>

        {guitar && (
          <div className={styles.modelo}>
            <h2>Modelo {guitar.nombre}</h2>
            <p>{guitar.descripcion}</p>
            <p className={styles.precio}>${guitar.precio}</p>
            <Link href={`/guitarras/${guitar.url}`}>
              <a className={styles.link}>
                Ver Producto
              </a>
            </Link>
          </div>
        )}

      </div>

      {
        router.pathname === '/' && (
          <div className={styles.guitar}>
             <Image width={500} height={1200} layout='fixed'  src="/img/header_guitarra.png" alt="img header guitar" />
          </div>
         
        )
      }

    </header>
  )
}
