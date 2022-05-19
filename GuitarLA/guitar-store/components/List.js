import { Guitar } from "./Guitar"
import styles from '../styles/List.module.css'

export const List = ({guitars}) => {

    
  return (
    <div className={styles.list}>
       {guitars.map(guitarra => {
           return <Guitar key={guitarra.url} guitarra={guitarra}/>
       })}
    </div>
  )
}
