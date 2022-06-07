
import styled from '@emotion/styled'
import { Fragment } from 'react'
import { Layout } from '../components/layouts/Layout'
import { Form,Camp, InputSubmit, Error } from '../components/ui/Form'
import {css} from '@emotion/react'
import useValidation from '../hooks/useValidation'
import validateCreateAccount from '../validation/validateCreateAccount'
import firebase from '../firebase'
import { useState } from 'react'
import { useRouter } from 'next/router'

const initialState = {
    name:'',
    email:'',
    password:''
}

export default function CreateAccount() {

    const router = useRouter()

    const [err,setErr] = useState(false)

    async function createAccount() {
        try {
            await firebase.createUser(values.name, values.email, values.password)
            router.push('/')
        } catch (error) {
            console.error('Hubo un error al crear un usuario', error.message)
            setErr(error.message)
        }   
    }

    const {values, error,handleBlur, handleChange, handleSubmit} = useValidation(initialState, validateCreateAccount, createAccount)

  return (

    <Layout>
    <Fragment>
        <h1 css={css`
            text-align: center;
            margin-top: 5rem;
        `}>Crear Cuenta </h1>
        <Form onSubmit={handleSubmit} noValidate>
            <Camp>
                <label htmlFor='name'>Nombre</label>
                <input onBlur={handleBlur} value={values.name} onChange={handleChange} type='text' id='name' placeholder='Tu Nombre' name='name'/>
            </Camp>

            {error.name && <Error>{error.name}</Error> }
  
            <Camp>
                <label htmlFor='email'>Email</label>
                <input onBlur={handleBlur} value={values.email} onChange={handleChange} type='email' id='email' placeholder='Tu Email' name='email'/>
            </Camp>

            {error.email && <Error>{error.email}</Error> }

            <Camp>
                <label htmlFor='password'>Contraseña</label>
                <input onBlur={handleBlur} value={values.password} onChange={handleChange} type='password' id='password' placeholder='Tu Contraseña' name='password'/>

            </Camp>

            {error.password && <Error>{error.password}</Error> }
            {err && <Error>{err}</Error>}
            <InputSubmit type='submit' value='Crear Cuenta'/>
        </Form>
    </Fragment>
    </Layout>
  )
}
