import { createContext, useState } from "react"
import axios from 'axios'

const WeatherContext = createContext()

const WeatherProvider = ({children}) => {

    const [search,setSearch] = useState({
        city:'',
        country:''
    })
    
    const [res,setRes] = useState({})
    const [loading,setLoading] = useState(false)
    const [noResult,setNoResult] = useState('')

    const searchData = e =>{
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const cheackWeather = async(dataForm)=>{
        setLoading(true)
        setNoResult(false)
        setRes(null)
        try {
            const appId = import.meta.env.VITE_API_KEY
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${dataForm.city},${dataForm.country}&limit=1&appid=${appId}`
            
            const {data} = await axios(url) 
            
            const {lat, lon} = data[0]

            const urlWeather= `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            const {data: weather} = await axios(urlWeather)

            setRes(weather)
            
        } catch (error) {
            setNoResult('No hay resultados')
        } finally {
            setLoading(false)
        }
    }


  return (
    <WeatherContext.Provider value={{noResult,loading,res,cheackWeather,search,searchData}}>
    {children}
    </WeatherContext.Provider>
  )
}

export {WeatherProvider}

export default WeatherContext


