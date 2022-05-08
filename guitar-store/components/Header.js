import Link from "next/link"
import Image from "next/image"
import styles from "../styles/Header.module.css"

export const Header = () => {
  return (
    <header className={styles.header}>
       
      <div className="contenedor">
        <div className={styles.bar}>
          <Link href="/" >
            <Image width={400} height={100} src="/img/logo.svg" alt="logo"/>
          </Link>
          <nav className={styles.nav}>
              <Link href='/'>Inicio</Link>
              <Link href='/nosotros'>Nosotros</Link>
              <Link href='/blog'>Blog</Link>
              <Link href='/tienda'>Tienda</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
