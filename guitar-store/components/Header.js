import Link from "next/link"

export const Header = () => {
  return (
    <header>
        <div className="contenedor">
            <div>

            </div>
            <nav>
                <Link href='/'>Inicio</Link>
                <Link href='/nosotros'>Nosotros</Link>
                <Link href='/blog'>Blog</Link>
                <Link href='/tienda'>Tienda</Link>
            </nav>
        </div>
    </header>
  )
}
