import {useContext} from 'react'
import * as styles from './singleBook.module.css'
import { UsingBooks } from '../../App'
import {BsPatchCheck,BsPatchCheckFill } from "react-icons/bs"
import { RiDeleteBinLine} from "react-icons/ri"
import { FcReading } from "react-icons/fc";
import StarRating from './Stars'

export default function SingleBook({book,status}) {
    let statusIcon;
    let deleteIcon=true;
    switch (status) {
        case 'completed':
            statusIcon=true
            deleteIcon=false;
            break;
        case 'reading':
        statusIcon=false
         deleteIcon=false;
            break
        default:
            break;
    }
    const {volumeInfo}=book 
    const dispatch = useContext(UsingBooks)
    return ( 
      <div className={styles.container}>
     {deleteIcon?<div onClick={()=>dispatch({type:'reading',value:book})} className={styles.addToReadIcon}><FcReading/></div>:<>
     <div onClick={!statusIcon?()=>dispatch({type:'completed',value:book}):()=>dispatch({type:'reading',value:book,restore:true})} className={styles.addToCompleteIcon}>{statusIcon?<BsPatchCheckFill/>:<BsPatchCheck/>}</div>
    <div onClick={()=>{dispatch({type:'remove',value:book.id,list:statusIcon?['completed','inCompleted']:['reading','inReading']})}} className={styles.removeFromListIcon}><RiDeleteBinLine/></div></>}
     <div className={styles.info}>
         <div className={styles.bookImage}>
             <img src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title+" image"}/>
         </div>
          <h5 className={styles.bookAuthor}>"{volumeInfo.authors}"</h5>
            <div className={styles.bookTitle}><h1>{volumeInfo.title}</h1>
            {statusIcon?<div className={styles.bookRating}>
            <StarRating id={book.id} rate={book.rate}/>
            </div>:null}
             <div className={styles.bookDescription}>
                 <h4>{book.description?.length!=undefined?
                 volumeInfo.description.slice(0,Math.floor(300/2)):
                 "no description yet"}...</h4>
                 <p> </p>
            </div>  
            <div className={styles.bookMore}>
            <h1>Notes</h1>
            {volumeInfo.note?.length!=undefined?
                 volumeInfo.note.slice(0,Math.floor(100/2)):
                 <h4>'No Notes Yet'</h4>}</div>
            </div>
 </div>
 </div>
    )
}
