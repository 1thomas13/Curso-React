
import styled from '@emotion/styled'
import { Fragment } from 'react'
import { Layout } from '../components/layouts/Layout'
import { Form,Camp, InputSubmit, Error } from '../components/ui/Form'
import {css} from '@emotion/react'
import useValidation from '../hooks/useValidation'
import validateCreateProduct from '../validation/validateCreateProduct'
import firebase from '../firebase'
import { useState,useContext } from 'react'
import { useRouter } from 'next/router'
import { FirebaseContext } from '../firebase'
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import Error404 from '../components/layouts/Error404'

const {db} = firebase

const initialState = {
    name:'',
    company:'',
    img:'',
    url:'',
    description:''
}


export default function AddProduct() {

  const [uploading, setUploading] = useState(false);
  const [URLimg, setURLimg] = useState('');

  const router = useRouter()

  const [err,setErr] = useState(false)

  const {values, error,handleBlur, handleChange, handleSubmit} = useValidation(initialState, validateCreateProduct, createProduct)

  const {user,firebase} = useContext(FirebaseContext)

  const {name,company, url, description} = values

  const handleImageUpload = e => {
    // Se obtiene referencia de la ubicación donde se guardará la imagen
    const file = e.target.files[0];
    const imageRef = ref(firebase.storage, 'products/' + file.name);
    // Se inicia la subida
    setUploading(true);
    const uploadTask = uploadBytesResumable(imageRef, file);

    // Registra eventos para cuando detecte un cambio en el estado de la subida
    uploadTask.on('state_changed', 
        // Muestra progreso de la subida
        snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Subiendo imagen: ${progress}% terminado`);
        },
        // En caso de error
        error => {
            setUploading(false);
            console.error(error);
        },
        // Subida finalizada correctamente
        () => {
            setUploading(false);
            getDownloadURL(uploadTask.snapshot.ref).then(url => {
                console.log('Imagen disponible en:', url);
                setURLimg(url);
            });
        }
    );
  };

  async function createProduct() {
    try {
        if(!user){
          return router.push('/login')
        }

        const product = {
          name,
          company,
          url,
          description,
          URLimg,
          votes: 0,
          comments: [],
          created: Date.now(),
          creator: {
            id:user.uid,
            name:user.displayName
          },
          haveVoted:[]
        }

        const products = await addDoc(collection(db, "products"), (product));
        return router.push('/')
    } catch (error) {
        console.error('Hubo un error al agregar un Producto', error.message)
        setErr(error.message)
    }   
  }

return (

  <Layout> 
    {!user ? <Error404/> :( 
  <Fragment>
      <h1 css={css`
          text-align: center;
          margin-top: 5rem;
      `}>
        Nuevo Producto
      </h1>
      <Form onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend>Informacion General</legend>
          <Camp>
              <label htmlFor='name'>Nombre</label>
              <input onBlur={handleBlur} value={name} onChange={handleChange} type='text' id='name' placeholder='Nombre ' name='name'/>
          </Camp>

          {error.name && <Error>{error.name}</Error> }

          <Camp>
              <label htmlFor='company'>Empresa</label>
              <input onBlur={handleBlur} value={company} onChange={handleChange} type='text' id='company' placeholder='Empresa' name='company'/>
          </Camp>

          {error.company && <Error>{error.company}</Error> }

          <Camp>
            <label htmlFor='img'>Imagen</label>
            <input
                accept="image/*"
                type="file"
                id="image"
                name="img"
                onChange={handleImageUpload}
            />
          </Camp>

          {error.img && <Error>{error.img}</Error> }

          <Camp>
              <label htmlFor='url'>URL</label>
              <input onBlur={handleBlur} value={url} onChange={handleChange} type='url' id='url' placeholder='URL del Producto' name='url'/>
          </Camp>

          {error.url && <Error>{error.url}</Error> }
        </fieldset>
        <fieldset>
          <legend>Sobre Tu Producto</legend>

          <Camp>
              <label htmlFor='description'>Descripcion</label>
              <textarea onBlur={handleBlur} value={description} onChange={handleChange} type='description' id='description' placeholder='Descripcion' name='description'/>
          </Camp>

          {error.description && <Error>{error.description}</Error> }

        </fieldset>
         
          {err && <Error>{err}</Error>}
          <InputSubmit type='submit' value='Crear Producto'/>
      </Form>
  </Fragment>
  )}
  </Layout>
  
)
}
