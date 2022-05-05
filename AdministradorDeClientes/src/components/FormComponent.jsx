import React from 'react'
import {Formik,Form,Field} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { Alert } from './Alert'
import { Spinner } from './Spinner'

export const FormComponent = ({client={},loading=false}) => {

  const navigate = useNavigate()

  const newClientSchema =  Yup.object().shape({
    name: Yup.string()
              .min(4,'El nombre debe poseer mas de 3 caracteres')
              .max(20,'El nombre es demasiado largo')
              .required('El nombre del cliente es obligatorio'),

    company: Yup.string()
                .required('El nombre de la empresa es obligatorio'),

    email: Yup.string()
              .email('Email no valido')
              .required('El email es obligatorio'),

    numberPhone: Yup.number()
                    .typeError('El número no es válido')
                    .integer('Numero no válido')
                    .positive('Numero no válido'),
  })

  const handleSubmit = async(values)=>{
    try {
      
     if(client.id){
      const url = `http://localhost:4000/clientes/${client.id}`

      await fetch(url, {
        method:'PUT',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(values)
      })

     }
     else{
      const url = 'http://localhost:4000/clientes'

      await fetch(url, {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(values)
      })

    }

    navigate('/clientes')

    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    loading ? <Spinner/> : (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase '>
          {client?.name ? ' Editar Cliente' : 'Agregar Cliente'}
        </h1>

        <Formik validationSchema={newClientSchema} 
          onSubmit={ async (values,{resetForm})=>{
            await handleSubmit(values)
            
            resetForm()
          }}
          initialValues={{
            name: client?.name ?? '',
            company: client?.company ?? '',
            email: client?.email ?? '',
            numberPhone: client?.numberPhone ?? '',
            notes: client?.notes ?? ''
        }}
        enableReinitialize={true}>
          {({errors,touched})=>(
          <Form className='mt-10'>
                <div className='mb-4'>
                    <label className='text-gray-800' htmlFor='name'>Nombre:</label>
                    <Field id='name' 
                      className='mt-2 block w-full p-3 bg-gray-50' type='text'
                      placeholder='Nombre del cliente' name='name'
                    />
                    {errors.name && touched.name ? (
                      <Alert>{errors.name}</Alert>
                    ) : null}
                </div>
               
                <div className='mb-4'>
                    <label className='text-gray-800' htmlFor='company'>Empresa:</label>
                    <Field id='company' 
                      className='mt-2 block w-full p-3 bg-gray-50' type='text'
                      placeholder='Empresa del cliente' name='company'
                    />
                    {errors.company && touched.company ? (
                      <Alert>{errors.company}</Alert>
                    ) : null}
                </div>

                <div className='mb-4'>
                    <label className='text-gray-800' htmlFor='email'>Email:</label>
                    <Field id='email' 
                      className='mt-2 block w-full p-3 bg-gray-50' type='email'
                      placeholder='Email del cliente' name='email'
                    />
                    {errors.email && touched.email ? (
                      <Alert>{errors.email}</Alert>
                    ) : null}
                </div>

                <div className='mb-4'>
                    <label className='text-gray-800' htmlFor='numberPhone'>Telefono:</label>
                    <Field id='numberPhone' 
                      className='mt-2 block w-full p-3 bg-gray-50' type='tel'
                      placeholder='Telefono del cliente' name='numberPhone'
                    />
                    {errors.numberPhone && touched.numberPhone ? (
                      <Alert>{errors.numberPhone}</Alert>
                    ) : null}
                </div>

                <div className='mb-4'>
                    <label className='text-gray-800' htmlFor='notes'>Notas:</label>
                    <Field id='notes' as='textarea'
                      className='mt-2 block w-full p-3 bg-gray-50 h-40'  type='text'
                      placeholder='Notas del cliente' name='notes'
                    />
                </div>

                <input type='submit'
                 value={client?.name ? ' Editar Cliente' : 'Agregar Cliente'} 
                 className='hover:cursor-pointer mt-5 w-full uppercase font-bold text-lg bg-blue-800 p-3 text-white'
                />
            </Form>)}
            
        </Formik>
    </div>)
  )
}
