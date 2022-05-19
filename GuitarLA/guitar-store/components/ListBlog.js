
import { Entrada } from './Entrada'
import styles from '../styles/Blog.module.css'

export const ListBlog = ({blogs}) => {
  return (
    <>
         <h2 className='heading'>Blog</h2>

        <div className={styles.blog}>
        {
            blogs.map(data=>{
            return <Entrada data={data} key={data.id}/>
            })
        }
        </div>
    </>
  )
}
