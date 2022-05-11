import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
const NewsContext = createContext()


const NewsProvider = ({children}) => {

    const [category,setCategory] = useState('general')
    const [news,setNews] = useState([])
    const [page,setPage] = useState(1)
    const [totalNews,setTotalNews] = useState(0)

    useEffect(()=>{
        const getApi = async ()=>{
            try {
                const url = `https://newsapi.org/v2/top-headlines?country=AR&page=${page}&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`

                const {data} = await axios(url)
                setNews(data.articles)
                setTotalNews(data.totalResults)
            } catch (error) {
                console.log(error)
            }
        }
        getApi()

    },[page])

    useEffect(()=>{
        const getApi = async ()=>{
            try {
                const url = `https://newsapi.org/v2/top-headlines?country=AR&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`

                const {data} = await axios(url)
                setNews(data.articles)
                setTotalNews(data.totalResults)
                setPage(1)
            } catch (error) {
                console.log(error)
            }
        }
        getApi()

    },[category])

    const handleChangeCategory = e =>{
        setCategory(e.target.value)
    }

    const handleChangePage= (e,value) =>{
        setPage(value)
    }

  return (
    <NewsContext.Provider value={{page,handleChangePage,totalNews,news,handleChangeCategory,category}}>
        {children}
    </NewsContext.Provider>
  )
}

export {NewsProvider}

export default NewsContext