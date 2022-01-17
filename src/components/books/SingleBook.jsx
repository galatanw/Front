import {useContext,useState} from 'react'

import styles from './singleBook.module.css'
import { UsingBooks } from '../../App'
import {BsPatchCheck,BsPatchCheckFill } from "react-icons/bs"
import { RiDeleteBinLine} from "react-icons/ri"
import { FcReading } from "react-icons/fc";
import StarRating from './Stars'
import {Navigate } from "react-router-dom";
export default function SingleBook({book,status}) {
    const [details, setdetails] = useState(false)
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
          {details?<Navigate to={'/details'+book.id} replace={details}/>:null} 
     {deleteIcon?<div onClick={()=>dispatch({type:'reading',value:book})} title='mark as reading' className={styles.addToReadIcon}><FcReading/></div>:<>
     <div onClick={!statusIcon?()=>dispatch({type:'completed',value:book}):()=>dispatch({type:'reading',value:book,restore:true})} title={statusIcon?'complete/click to unmark ':'reading/mark to complete'} className={styles.addToCompleteIcon}>{statusIcon?<BsPatchCheckFill/>:<BsPatchCheck/>}</div>
    <div onClick={()=>{dispatch({type:'remove',value:book.id,list:statusIcon?'completed':'reading'})}}title='cancel following' className={styles.removeFromListIcon}><RiDeleteBinLine/></div></>}
     <div className={styles.info}>
         <div className={styles.bookImage}>
             <img onClick={()=>{dispatch({type:'details',value:book});setdetails(true)}} src={volumeInfo.imageLinks.thumbnail} title={volumeInfo.title+" cover"} alt={volumeInfo.title+"missing image"}/>
         </div>
          <h5 className={styles.bookAuthor}>"{volumeInfo.authors}"</h5>
            <div className={styles.bookTitle}><h1>{volumeInfo.title}</h1>
            {statusIcon?<div className={styles.bookRating}>
            <StarRating id={book.id} rate={book.rate}/>
            </div>:null}
             <div className={styles.bookDescription}>
                 <h4>{volumeInfo.description?.length!=undefined?
                 volumeInfo.description.slice(0,150):
                 "no description yet"}...</h4>
                 <p> </p>
            </div>  
            <div className={styles.bookMore}>
            <h1>Notes</h1>
            {book.note?.length!=undefined?
                 book.note.slice(0,150)+'...':
                 <h4>'No Notes Yet'</h4>}</div>
            </div>
 </div>
 </div>
    )
}
