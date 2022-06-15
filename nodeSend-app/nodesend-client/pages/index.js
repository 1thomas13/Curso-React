import { Layout } from "../components/Layout";
import AuthContext from "../context/auth/authContext.js";
import { useContext,useEffect } from "react";
import {useRouter} from 'next/router'
import Link from 'next/link'
import { Dropzone } from "../components/Dropzone";
import appContext from "../context/app/appContext";
import {Alert} from '../components/Alert'

export default function Home() {

  const authContext = useContext(AuthContext)
  const {userAuthenticated} = authContext
  
  const AppContext = useContext(appContext)
  const {msgFile, url} = AppContext

  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if(token){
      userAuthenticated()
    }
    
  }, []);

  return (
    <Layout >
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <>
            <p className="text-center text-2xl mt-10">
              <span className="uppercase font-bold text-3xl text-red-700">Tu URL es: </span> 
              {`${process.env.FRONT_URL}/links/${url}`}
            </p>
            <button onClick={()=> navigator.clipboard.writeText(`${process.env.FRONT_URL}/links/${url}`)} type='button' className="mt-10 cursor-pointer w-full bg-red-500 p-2 text-white uppercase font-bold hover:bg-gray-900 " >
              Copiar Enlace
            </button>
          </>
        ) : (
          <>
          {msgFile && <Alert/>}
          <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
            
            <Dropzone/>
            
            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
              <h2 className="text-4xl font-sans font-bold my-4 text-gray-800">
                Compartir Archivos de Forma sencilla y privada
              </h2>
              <p className="text-lg leading-loose">
                <span className="text-red-500 font-bold">ReactNodeSend</span> te permite compartir archivos con cifrado de extremo a extremo y un archivo que es eliminado después de ser descargado. Así que puedes mantener lo que compartes en privado y asegurarte de que tus cosas no permanezcan en línea para siempre.
              </p>
              <Link href="/crearcuenta">
                <a className="text-red-500 font-bold text-lg hover:text-red-700">Crea una cuenta para mayores beneficios</a>
              </Link>
            </div>
          </div>
          </>
        )}
      </div>
    </Layout>
  )
}
