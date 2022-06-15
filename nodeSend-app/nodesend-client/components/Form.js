import React,{useState,useContext} from 'react'
import appContext from '../context/app/appContext'

export const Form = () => {

    const [hasPassword, setHasPassword] = useState(false)

    const AppContext = useContext(appContext)
    const {addPassword,addMaxDownloads} = AppContext

  return (
    <div className='w-full mt-20 '>
        <div>
            <label className='text-lg text-gray-800'>
                Eliminar tras:
            </label>
            <select onChange={(e) => addMaxDownloads(parseInt(e.target.value) )} className='appearence-none w-full mt-2 bg-white border text-black py-3 px-4 pr-8 rounded fopcues:border-gray-500 focus:outline leading-none border-gray-400'>
                <option value='' selected disabled>--Seleccione--</option>
                <option value='1'>1 Descarga</option>
                <option value='5'>5 Descargas</option>
                <option value='10'>10 Descargas</option>
                <option value='20'>20 Descargas</option>
                <option value='50'>50 Descargas</option>
            </select>
        </div>
        
        <div className='mt-4'>
            <div className='flex justify-between items-center'>
                <label className='text-lg mr-2 text-gray-800'>
                    Proteger con Password
                </label>
                <input onChange={() => setHasPassword(!hasPassword)} type='checkbox'/>
            </div>
            {hasPassword &&  <input 
                onChange={e => addPassword(e.target.value)}
                type='password' 
                placeholder='Ingrese un Password'
                className='appearence-none w-full mt-2 bg-white border text-black py-3 px-4 pr-8 rounded fopcues:border-gray-500 focus:outline leading-none border-gray-400'
            />}
           
        </div>
    </div>
  )
}
