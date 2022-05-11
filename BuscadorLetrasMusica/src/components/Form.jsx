import {useState} from 'react'
import { useLyrics } from '../hooks/useLyrics'

export const Form = () => {

    const {setAlert,searchLyric} =  useLyrics()

    const [search,setSearch] = useState({
        artist:'',
        song:''
    })

    const handleSubmit=(e)=>{
        e.preventDefault()

        if(Object.values(search).includes('')){
            setAlert('Coloca nombre de artista y canción')
            return
        }
        searchLyric(search)
        
    }

  return (
    <form onSubmit={handleSubmit}>
        <legend>Busca por Artistas y Canción</legend>
        <div className='form-grid'>
            <div>
                <label>Artista</label>
                <input 
                    onChange={e => setSearch({...search, [e.target.name]: e.target.value})} 
                    value={search.artist} type='text' name='artist' 
                    placeholder='Nombre Artista'
                />
            </div>

            <div>
                <label>Canción</label>
                <input 
                    onChange={e => setSearch({...search, [e.target.name]: e.target.value})} 
                    value={search.song} type='text' name='song' 
                    placeholder='Nombre Canción'
                />
            </div>
            <input type='submit'></input>
        </div>
    </form>
  )
}
