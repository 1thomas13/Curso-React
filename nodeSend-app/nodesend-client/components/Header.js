import React from 'react'
import Link from 'next/link'
import AuthContext from "../context/auth/authContext.js";
import appContext from "../context/app/appContext";
import { useContext,useEffect } from "react";
import {useRouter} from 'next/router'

export const Header = () => {

  const authContext = useContext(AuthContext)
  const {userAuthenticated, user, logout} = authContext

  const AppContext = useContext(appContext)
  const {resetState} = AppContext

  const router = useRouter()

  const redirect = () => {
    router.push('/')
    resetState()
  }

  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
      <img onClick={()=> redirect()} className='w-64 mb-8 md:mb-0 cursor-pointer' src='/logo.svg'/>
        <div>
          {user ? (
            <div className='flex items-center'> 
              <p className='mr-2'>Hola {user.name}</p>
              <button onClick={()=>logout()} type='button' className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'>Cerrar Sesion</button>
            </div>
          ) : (
            <>
              <Link href={'/login'}>
              <a className='mr-2 bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase'>
                Iniciar Sesion
              </a>
              </Link>
              <Link href={'/crearcuenta'}>
                <a className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'>
                  Crear Cuenta
                </a>
              </Link>
            </>
          )}
         
        </div>
    </header>
  )
}
