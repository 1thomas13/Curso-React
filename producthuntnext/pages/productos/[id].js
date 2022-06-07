import { useRouter } from 'next/router'
import React,{useEffect,useContext,useState} from 'react'
import { FirebaseContext } from '../../firebase'
import { doc,getDoc,updateDoc,deleteDoc } from "firebase/firestore";
import { Layout } from '../../components/layouts/Layout';
import { Error404 } from '../../components/layouts/Error404';
import { css } from '@emotion/react';
import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {es} from 'date-fns/locale'
import {Camp,InputSubmit} from '../../components/ui/Form'
import { Button } from '../../components/ui/Button';

const Container = styled.div`
  max-width: 1200px;
  width: 95%;
  padding: 5rem 0;
  margin: 0 auto;
`
const ContainerProduct = styled.div`
    @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
  
`

const ProductCreator = styled.div`
    padding: .5rem 2rem;
    background-color: #da552f;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`

const Product = () => {
    const [product, setProduct] = useState({});
     const [error, setError] = useState(false);
    const [comment,setComment] = useState({})
    const [queryDatabase, setQueryDatabase] = useState(true);

    const router = useRouter()
    const {query:{id}} = router

    const {firebase, user} = useContext(FirebaseContext)

    useEffect(() => {
        
        if(id && queryDatabase){
            const docRef = doc(firebase.db, `products/${id}`);
            const getProduct = async () => {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data()
                    setQueryDatabase(false)
                    setProduct(data)
                  } else {
                    setError(true)
                    setQueryDatabase(false)
                  }
                
            }
            getProduct()
        }
    }, [id]);

    if(error) return <Error404/>

    if(Object.keys(product).length === 0) return 'Cargando...'

    const voteProduct = async() => {
        if(!user){
            return router.push('/login')
        }
        if(product.haveVoted.includes(user.uid)){
            return
        }

        const haveVoted = [...product.haveVoted, user.uid]

        const total = product.votes +1

        const docRef = doc(firebase.db, `products/${id}`);
        await updateDoc(docRef, {
            votes: total,
            haveVoted: haveVoted
        });

        setProduct({...product, votes:total})
        setQueryDatabase(true)
        
    }

    const changeComment = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    } 

    const isCreator = id => {
        if(product.creator.id === id) {
            return true
        }
    }

    const addComment = async(e) => {
        e.preventDefault()

        if(!user){
            return router.push('/login')
        }
        console.log(user)
        comment.userId = user.uid
        comment.userName = user.displayName

        const newComments = [...product.comments, comment]
       
        const docRef = doc(firebase.db, `products/${id}`);

        await updateDoc(docRef, {
            comments:newComments
        });

        setProduct({...product,comments: newComments})
        setQueryDatabase(true)
    }

    const canDelete = () =>{
        if(!user) return false

        if(product.creator.id === user.uid) return true
    }

    const deleteProduct = async()=> {
        try {
            if(!user) return router.push(`/login`)

            if(product.creator.id !== user.uid) return router.push(`/login`)

            const docRef = doc(firebase.db, `products/${id}`);

            await deleteDoc(docRef);

            router.push(`/`)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Layout>
        <>
            {error && <Error404/>}

            <Container>
                <h1 css={css`text-align:center;
                margin-top:5rem`}>
                    {product.name}
                </h1>
                <ContainerProduct>
                    <div>
                        <p>Publicado hace: {formatDistanceToNow(new Date(product.created), {locale: es})}</p>
                        <p>Por: {product.creator.name} de {product.company}</p>
                        <img src={product.URLimg}/>
                        <p>{product.description}</p>

                        {user && (
                        <>
                            <h2>Agrega tu Comentario</h2>
                            <form onSubmit={addComment}>
                                <Camp>
                                    <input onChange={changeComment} type='text' name='msg' />
                                </Camp>
                                <InputSubmit type='submit' value='Agregar Comentario' />
                            </form>
                        </>)}

                        <h2 css={css`margin:2rem 0`}>Comentarios</h2>
                        {product.comments.length === 0 ? 'Aun no hay Comentarios': (
                            <ul>
                                {product.comments.map((comment,i) => {
                                    return (
                                        <li key={`${comment.userId}-${i}`} css={css`border: 1px solid #e1e1e1; padding:2rem; `}>
                                            <p>{comment.msg}</p>
                                            <p>Escrito por: <span css={css`font-weight:bold`}>{''}{comment.userName}</span></p>
                                            {isCreator(comment.userId) && <ProductCreator>Es Creador</ProductCreator>}
                                        </li>)
                                })}
                            </ul>
                        )}
                        
                    </div>
                    <aside>
                        <Button target="_black" bgColor='true' href={product.url}>
                            Visitar URL
                        </Button>
                        
                        <div css={css`
                        margin-top:5rem;`}>

                            <p css={css`text-align:center;`}>{product.votes} Votos</p>
                            {user && 
                            <Button onClick={voteProduct}>
                                Votar
                            </Button>}
                            
                        </div>
                        
                    </aside>
                </ContainerProduct>
                {
                    canDelete() && <Button onClick={deleteProduct}>Eleminar producto</Button>
                }
            </Container>
        </>
    </Layout>
  )
}

export default Product
