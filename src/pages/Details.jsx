import {useContext,useEffect} from 'react'
import'./css/Details.css'
import {BsPatchCheck,BsPatchCheckFill } from "react-icons/bs"
import {FcReading } from "react-icons/fc"
import {RiDeleteBinLine } from "react-icons/ri"
import { UsingBooks } from '../App'
import StarRating from '../components/books/Stars'

export default function Details({book,status}) {
    const dispatch=useContext(UsingBooks)
    let statusIcon;
    let didntRead=true;
    console.log(status);
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
         didntRead=true;    
            break;
    }
    const {volumeInfo}=book
            useEffect(() => {
            
            return () => {
                dispatch({type:'detailsOnClose'})
            }
        }, [])

    return (
      <div id='container'>
            <div id="imgContainer">
           <img src={volumeInfo.imageLinks.smallThumbnail} alt={volumeInfo.title+" image"}/>
    </div>
    <div id="infoContainer">
        <h2>Autor:  {volumeInfo.authors}</h2>
        <h2>Title:  {volumeInfo.title}</h2>
            {status==='none'?<div onClick={()=>dispatch({type:'reading',value:book})} ><FcReading/></div>:<>
             <div onClick={!statusIcon?()=>dispatch({type:'completed',value:book}):()=>dispatch({type:'reading',value:book,restore:true})} >{statusIcon?<BsPatchCheckFill/>:<BsPatchCheck/>}</div>
            <div onClick={()=>{dispatch({type:'remove',value:book.id,list:statusIcon?'completed':'reading'})}}><RiDeleteBinLine/></div></>}
        {status==='completed'?<StarRating id={book.id} rate={book.rate}/>:null}
    </div>
    <div id="description">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dignissimos ab, quae nam maxime illo impedit corrupti ratione officia ipsam obcaecati, laudantium totam quis nesciunt, eius aperiam alias voluptatem nostrum.
        Atque quam repudiandae quisquam aperiam iusto commodi reprehenderit asperiores unde nostrum enim, quidem accusantium in praesentium, exercitationem animi repellendus odio nemo eum? Id, corporis ipsam voluptates porro nam quibusdam reiciendis?
        Aliquid laborum temporibus culpa unde quibusdam quia perferendis, quos omnis sapiente minima amet eveniet, fugit ad explicabo. Atque illum rem repellat dicta! Ex, numquam provident possimus qui molestias inventore modi.
        Similique commodi maiores assumenda error explicabo libero aspernatur iste ea provident eum id reiciendis dolor dolorum, suscipit ullam magni illum quis ab quibusdam asperiores et facere expedita voluptatum atque. Hic.
        Adipisci omnis, tempora modi unde consequatur magnam mollitia quae assumenda cupiditate iste similique voluptas laudantium quos architecto dolorem fugit dicta ratione illum, consectetur iure repudiandae et vero incidunt! Fugit, voluptates?
        Voluptate dolores laudantium natus eius, eos consequuntur ipsa tempore expedita quae voluptatibus facilis pariatur deleniti mollitia corrupti minima adipisci hic repellat. Nam animi recusandae, minima similique cupiditate adipisci dolores natus!
        Modi facere possimus tempora velit exercitationem. Ipsum nostrum debitis optio cum odit maxime, asperiores error doloremque natus fugiat similique minus cumque repellendus neque quae vitae, assumenda commodi? Quaerat, natus enim!
        Exercitationem, delectus. Libero sit cupiditate deserunt error facere laborum ipsam velit, aspernatur neque reprehenderit aliquam. Odio iure nihil repellat corrupti amet recusandae, ea quasi facere voluptatibus? Est eius nostrum numquam?
        Qui quisquam maxime exercitationem animi, suscipit assumenda, ipsum facere eligendi doloribus facilis vitae numquam at? Libero ad, veniam mollitia itaque inventore facere eaque perferendis iure molestias ex? Neque, ipsum ipsam?
        Quidem, iusto. Placeat, tenetur. Vitae repellat doloribus enim laboriosam nam nihil tenetur omnis voluptas mollitia modi, eligendi temporibus. Corporis itaque nulla quam optio! Doloribus atque repellendus saepe vitae veniam rerum!
        Culpa veritatis consectetur molestias hic, laborum facere omnis neque consequatur cumque inventore minima nam rerum illum amet, placeat ad vero debitis sit illo? Sunt porro quod, ea sapiente optio reprehenderit!
        Rem natus placeat saepe perferendis. Explicabo pariatur, atque reprehenderit quas voluptates quia ad temporibus, officiis, assumenda facilis laboriosam ipsum optio unde expedita laudantium doloremque molestias error ducimus exercitationem porro ut!</p>
    </div>
    <h2>Notes</h2>
    <textarea value={book.note}  onChange={(e)=>dispatch({type:'notes' ,value:book.id,note:e.target.value})}  rows="15"></textarea>
    </div>
    )
}
