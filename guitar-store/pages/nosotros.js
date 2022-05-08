
import { Layout } from '../components/Layout'
import Image from 'next/image'
import styles from '../styles/AboutUs.module.css'

const AboutUs = () => {
  return (
   
      <Layout page={'Nosotros'}> 

      <main className='contenedor'>
        <h2 className='heading'> Nosotros</h2>
        

          <div className={styles.content}>

            <Image layout='responsive' width={600} height={450} src="/img/nosotros.jpg" alt='img-about-us'/>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac augue vitae metus condimentum ornare. Quisque vel est quis ipsum placerat    suscipit eget et nunc. Donec id nunc mauris. Vivamus sagittis luctus porttitor. Integer nisl sem, bibendum eget tortor ut, ultricies scelerisque    primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec sit amet urna at neque aliquet consequat. Cras vitae commodo est.

              quis mollis mi, vitae hendrerit enim. Praesent quis posuere tortor. Quisque lobortis est in est faucibus viverra. Donec id vehicula risus, fermentum porta libero. Praesent vel aliquam nisl. Etiam sollicitudin ultrices justo. Donec non orci ex. Praesent eleifend nisi nisi.
              </p>
            </div>
        </div>
      </main>
      </Layout>
  )
}

export default AboutUs
