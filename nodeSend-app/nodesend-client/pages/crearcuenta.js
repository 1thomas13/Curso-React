import { Layout } from "../components/Layout";
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext.js";
import { Alert } from "../components/Alert";

export default function CreateAccount() {

    const authContext = useContext(AuthContext)
    const {msg, newUser} = authContext

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('El nombre es Obligatorio'),
            email: Yup.string()
                .required('El email es Obligatorio')
                .email('El Email no es Valido'),
            password: Yup.string()
                .required('El password  es Obligatorio')
                .min(6,'El password debe contener al menos 6 caracteres'),
        })
        ,
        onSubmit: values => {
            newUser(values)
        }
    })

  return (
    <Layout >
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
            <h2 className="text-4xl font-sans font-bold text-center my-4 text-gray-800">
                Crear Cuenta
            </h2>
            {msg && <Alert/>}
            <div className="flex justify-center mt-5">
                <div className="max-w-lg w-full">
                    <form onSubmit={formik.handleSubmit} className="bg-white rounded pb-8 mb-4 px-8 pt-6 shadow-md">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-black text-sm font-bold mb-2">
                                Nombre
                            </label>
                            <input 
                                placeholder="Nombre de Usuario"
                                id="name"
                                type='text' 
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="my-2 bg-gray-200 border-red-500 text-red-700 p-4 border-l-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.name}</p>
                                </div>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-black text-sm font-bold mb-2">
                                Email
                            </label>
                            <input 
                                placeholder="Email de Usuario"
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='email' 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />

                            {formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-gray-200 border-red-500 text-red-700 p-4 border-l-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-black text-sm font-bold mb-2">
                                Password
                            </label>
                            <input 
                                placeholder="Password de Usuario"
                                id="password"
                                type='password' 
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />

                            {formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-gray-200 border-red-500 text-red-700 p-4 border-l-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null}
                        </div>

                        <input value='Crear Cuenta' className="cursor-pointer w-full bg-red-500 p-2 text-white uppercase font-bold hover:bg-gray-900 " type='submit' />
                    </form>
                </div>
            </div>
        </div>
    </Layout>
  )
}
