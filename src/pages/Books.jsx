import React, {Fragment,useRef,useState,useEffect } from 'react'
import './css/books.css'
import SingleBook from '../components/books/SingleBook'
import { Button } from 'react-bootstrap'
import { RiSearchEyeFill } from 'react-icons/ri'
import {AiOutlineArrowRight,AiOutlineArrowLeft} from 'react-icons/ai'  
import {BiArrowToLeft,BiArrowToRight} from 'react-icons/bi'  


export default function Books({books}) {
    const [searchedBooks,setSearchBooks]=useState(false)
    const [search, setSearch] = useState(null)
    const [page, setPage] = useState(0)
    const input=useRef()
    useEffect(()=>{
if(search==='') return setSearchBooks(false)
searchProcess(search)
},[search])
function movePage(e){
       switch (e.currentTarget.value) {
  case 'fowroad':
      if(page+10>=books.bookList.length)setPage(books.bookList.length-1-10)
      else setPage(page+10)
      break;
  case 'previous':
      if(page-10<=0)setPage(0)
      else setPage(page-10)
      break;
    case 'start':
        setPage(0)
        break
    case 'end':
        setPage(books.bookList.length-1-10)
    break
  default:
      break;
       }
}
    function searchProcess(input){
        const word=new RegExp(input,'ig')
        const BOOKS=[];
        for (let index = 0; index < books.bookList.length; index++) {
            const book= books.bookList[index]
            const compareBook = books.bookList[index].volumeInfo;
            if(compareBook?.title?.match(word))BOOKS.push(book)
            else if(compareBook?.description?.match(word))BOOKS.push(book)
            else if(compareBook?.authors[0]?.match(word))BOOKS.push(book)
            if(BOOKS.length===10){return setSearchBooks(BOOKS)}
        }
        return  BOOKS.length?setSearchBooks(BOOKS):setSearchBooks(false)
    }
    return (
        <Fragment>
    <div>
    <div className="wrap">
   <div className="search">
      <input type="text" ref={input} className="searchTerm" placeholder="What are you looking for?"/>
      <Button onClick={()=>{setSearch(input.current.value)}}  size='sm' type='submit'><RiSearchEyeFill/></Button>
   </div>
</div>
   {searchedBooks?
        <div>
        {searchedBooks.map((book,i)=>{
        let status='none'
   const reading=books?.reading?.findIndex(item=>item.id===book.id)
   const completed=books?.completed?.findIndex(item=>item.id===book.id)
    if(reading!=-1&&reading!=undefined)status='reading';
    if(completed!=-1&&completed!=undefined)status='completed';
   return <Fragment key={book.id}>
       <SingleBook book={book}status={status}/>
       </Fragment>
        })}
    </div>: books.bookList.slice(page,page+10).map((book,i)=>{
        let status='none'
        const reading=books?.reading?.findIndex(item=>item.id===book.id)
        const completed=books?.completed?.findIndex(item=>item.id===book.id)
        if(reading!=-1&&reading!=undefined)status='reading';
        if(completed!=-1&&completed!=undefined)status='completed';
        return <Fragment key={book.id}>
        <SingleBook book={book}status={status}/>
        </Fragment>
   })}
       <button style={{width:'100%'}}onClick={(e)=>movePage(e)} value={'start'} disabled={page===0}>
        <BiArrowToLeft style={{width:'100%'}}/>
       </button>
       <button style={{width:'100%'}} value={'previous'} onClick={(e)=>movePage(e)} disabled={page===0}>  
        <AiOutlineArrowLeft style={{width:'100%'}}/>
       </button>
       <button style={{width:'100%'}}onClick={(e)=>movePage(e)} value={'fowroad'} disabled={page>=books.bookList.length-1-10}>
        <AiOutlineArrowRight style={{width:'100%'}}/>
       </button>
       <button style={{width:'100%'}}onClick={(e)=>movePage(e)} value={'end'} disabled={page>=books.bookList.length-1-10}>
        <BiArrowToRight style={{width:'100%'}}/>
       </button>
        </div>
        </Fragment>

    )
}
