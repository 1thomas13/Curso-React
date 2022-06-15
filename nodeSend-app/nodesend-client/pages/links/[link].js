import { Layout } from "../../components/Layout";
import axiosClient from "../../config/axios";
import {useState,useContext} from 'react'
import appContext from "../../context/app/appContext";
import {Alert} from '../../components/Alert'
import { useRouter } from 'next/router'

export async function getServerSideProps ({params}){
    const {link} = params

    const res = await axiosClient.get(`/api/links/${link}`)
    
    return {
        props: {
            link: res.data
        }
    }
}

export async function getServerSidePaths (){
    const links = await axiosClient.get('/api/links')

    return {
        paths: links.data.map((link)=> ({
            params:{link: link.url}
        })),
        fallback: false
    }
}


export default ({link}) => {
   
    const router = useRouter()

    const [hasPass, setHasPass] = useState(link.password)
    const [password, setPassword] = useState('')

    const AppContext = useContext(appContext)
    const {showAlert, msgFile} = AppContext

    const {link:url} = router.query

    const validatePass = async(e) => {
        e.preventDefault()
        
        try{
            const data = {
                password
            }
    
            const res = await axiosClient.post(`/api/links/${url}`, data)
            setHasPass(res.data.password)
        }catch(error){
            showAlert(error.response.data.msg)
        }
    }

    return (
        <Layout>
        {hasPass ? (
            <>
                <p className='text-center'>La Este enlace esta protegido por un password, colocalo a continuacion:</p>
                {msgFile && <Alert/>}
                <div className="flex justify-center mt-5">
                        <div className="max-w-lg w-full">
                            <form 
                                onSubmit={e => validatePass(e)}
                                className="bg-white rounded pb-8 mb-4 px-8 pt-6 shadow-md"
                            >

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-black text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input 
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    placeholder="Password del Enlace"
                                    id="password"
                                    type='password' 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <input value='Validar Password' className="cursor-pointer w-full bg-red-500 p-2 text-white uppercase font-bold hover:bg-gray-900 " type='submit' />
                            </form>
                        </div>
                   
                </div>
            </>
        ) : (
            <>
                <h1 className="text-4xl text-center text-gray-700 ">
                    Descarga tu Archivo
                </h1>
                <div className="flex items-center justify-center mt-10">
                    <a href={`${process.env.BACK_URL}/api/files/${link.file}`} className="bg-red-500 text-center px-10 py-3 rounded uppercase cursor-pointer font-bold text-white">
                        Aqui
                    </a>
                </div>
            </>
        )} 
        </Layout>
    )
}
