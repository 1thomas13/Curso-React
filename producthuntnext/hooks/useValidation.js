import { useState,useEffect } from "react"


const useValidation = (stateInit,validation,fn) => {

    const [values,setValues] = useState(stateInit)

    const [error,setError] = useState({})

    const [submitForm,setSubmitForm] = useState(false)

    useEffect(() => {
        if(submitForm){
            const getErrors = Object.keys(error).length === 0

            if(getErrors){
                fn()
            }
        }

        setSubmitForm(false)
    }, [error]);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const errorsValidate = validation(values)
        setError(errorsValidate)

        setSubmitForm(true)
    }

    const handleBlur = () => {
        console.log(values)
        const errorsValidate = validation(values)
        setError(errorsValidate)
    }

  return {
      values,error,handleChange,handleSubmit,handleBlur
  }
}

export default useValidation