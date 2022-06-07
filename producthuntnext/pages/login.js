

import styled from '@emotion/styled'
import { Fragment } from 'react'
import { Layout } from '../components/layouts/Layout'
import { Form,Camp, InputSubmit, Error } from '../components/ui/Form'
import {css} from '@emotion/react'
import useValidation from '../hooks/useValidation'
import validateLogin from '../validation/validateLogin'
import firebase from '../firebase'
import { useState } from 'react'
import { useRouter } from 'next/router'

const initialState = {
  email:'',
  password:''
}

export default function Login() {

  const router = useRouter()

  const [err,setErr] = useState(false)

  async function login() {
      try {
        const user = await firebase.login(values.email, values.password)

        router.push('/')

      } catch (error) {
        console.error('Hubo un error al autenticar un usuario', error.message)
        setErr(error.message)
      }   
  }

  const {values, error,handleBlur, handleChange, handleSubmit} = useValidation(initialState, validateLogin, login)

return (

  <Layout>
  <Fragment>
      <h1 css={css`
          text-align: center;
          margin-top: 5rem;
      `}>
        Iniciar Sesión 
      </h1>
      <Form onSubmit={handleSubmit} noValidate>
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
          <InputSubmit type='submit' value='Inicar Sesión'/>
      </Form>
  </Fragment>
  </Layout>
)}
