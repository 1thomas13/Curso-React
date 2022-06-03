import {Navigate, Outlet} from 'react-router-dom'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import useAuth from '../hooks/useAuth'

export const ProtectedRoute = () => {

    const {auth,loading} = useAuth()
    
    if(loading) return 'cargando'

  return (
    <>
        {auth._id ? (
          <div className='bg-gray-100'>
            <Header/>
            <div className='md:flex md:min-h-screen'>
              <Sidebar/>
              <main className='flex-1 p-10'>
                <Outlet/>
              </main>
            </div>
          </div>
        ) : <Navigate to="/" />}
    </>
  )
}
