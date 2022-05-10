import { createContext, useState } from "react"
import {getYearDiference,calculateBrand,calculatePlan,formatCash} from '../helpers'

const QuoterContext = createContext()


const QuoterProvider = ({children}) => {

    const [data,setData] = useState({brand:'',year:'',plan:''})

    const handleChangeData = (e) =>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    const [error,setError] = useState('')
    const [res,setRes] = useState(0)
    const [loading,setLoading] = useState(false)

    const cotizarSeguro = () =>{
        let result = 2000
        const diference =  getYearDiference(data.year)

        result -= diference * 3 * result / 100

        result *= calculateBrand(data.brand)

        result *= calculatePlan(data.plan)

        result = result.toFixed(2)

        result = formatCash(result)

        setLoading(true)

        setTimeout(()=>{
            setRes(result)
            setLoading(false)
        },500)
       
    }

    return(
        <QuoterContext.Provider value={{loading,res,cotizarSeguro,data,handleChangeData,setError,error}}>
            {children}
        </QuoterContext.Provider>
    )
}

export{ QuoterProvider}

export default QuoterContext