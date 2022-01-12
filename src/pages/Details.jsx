import {useContext} from 'react'
import* as styles from './Details.module.css'
import {BsPatchCheck,BsPatchCheckFill } from "react-icons/bs"
import {FcReading } from "react-icons/fc"
import {RiDeleteBinLine } from "react-icons/ri"
import { UsingBooks } from '../App'
import StarRating from '../components/books/Stars'
export default function Details({book,status}) {
    const dispatch=useContext(UsingBooks)
    let statusIcon;
    let didntRead=true;
    switch (status) {
        case 'completed':
            statusIcon=true
            didntRead=false;
            break;
        case 'reading':
        statusIcon=false
         didntRead=false;
            break
        default:
            statusIcon;
         didntRead=true;
            break;
    }
    // console.log(status);
    const {volumeInfo}=book
    return (
      <div className={styles.container}>
       <div className={styles.imageContainer}>
           <img src={volumeInfo.imageLinks.smallThumbnail} alt={volumeInfo.title+" image"}/>
        </div>
        <StarRating id={book.id} rate={book.rate}/>
        <div className={styles.listContainer}>
          <h3>inList:{}</h3>
           { didntRead?<div onClick={()=>dispatch({type:'reading',value:book})} ><FcReading/></div>:
           <>
           <span onClick={!statusIcon?()=>dispatch({type:'completed',value:book}):()=>dispatch({type:'reading',value:book,restore:true})}>{statusIcon?<BsPatchCheckFill/>:<BsPatchCheck/>}
           </span><span onClick={()=>{dispatch({type:'remove',value:book.id,list:statusIcon?['completed','inCompleted']:['reading','inReading']})}} className={styles.removeFromListIcon}><RiDeleteBinLine/></span></>}
        </div>
        <div className={styles.infoContainer}>
        <h2>Autor:  {volumeInfo.authors}</h2>
        <h2>Title:  {volumeInfo.title}</h2>
        </div>
        <div className={styles.descriptionContainer}>
            <p>{volumeInfo.description}</p>
        </div>
        
        <div className={styles.notesContainer}>
            <h1>Notes</h1>
            <textarea value={book.note}  onChange={(e)=>dispatch({type:'notes' ,value:book.id,note:e.target.value})} name="" id=""  rows="15"></textarea>
        </div>
    </div>
    )
}
