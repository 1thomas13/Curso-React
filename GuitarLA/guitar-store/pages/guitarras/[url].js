
import Image from 'next/image'
import { useState } from 'react'
import { Layout } from '../../components/Layout'
import styles from '../../styles/Guitar.module.css'


const Product = ({guitar,addCarrito}) => {

    const {img,descripcion,nombre,precio,id}= guitar[0]

    const [amount,setAmount] = useState(1)

    const handleSubmit = (e) =>{
        e.preventDefault()

        if(amount<1) {
           return  alert('Cantidad no valida')
        }

        const guitarSelected = {
            id,
            img:'http://localhost:1337'+img[0].url,
            nombre,
            precio,
            amount
        }
        console.log(guitarSelected)
        addCarrito(guitarSelected)
    } 

  return (
    <Layout page={`Guitarra ${nombre}`}>
        <div className={styles.guitar}>
            <Image alt={`img guitarra ${nombre}`} layout='responsive' width={180} height={350} src={'http://localhost:1337'+img[0].url}/>
            <div className={styles.contenido}>
                <h3>{nombre}</h3>
                <p className={styles.descripcion}>{descripcion}</p>
                <p className={styles.precio}>${precio}</p>
                
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>Cantidad:</label>
                    <select value={amount} onChange={e => setAmount(parseInt(e.target.value))}>
                        <option value='0'>Seleccione</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                    </select>
                    <input type='submit' value='Agregar Al Carrito' />
                </form>
            </div>
        </div>
    </Layout>
  )
}

export async function getServerSideProps ({query:{url}}){

    const urlGuitar = `${process.env.API_url}/guitarras?url=${url}`

    const res = await fetch(urlGuitar)
    const guitar = await res.json()

    return {
        props:{
            guitar
        }
    }
}


export default Product