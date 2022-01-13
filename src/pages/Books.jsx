import React, {Fragment,useRef,useState,useEffect } from 'react'
import './books.css'
import SingleBook from '../components/books/SingleBook'
import { Button } from 'react-bootstrap'
import { RiSearchEyeFill } from 'react-icons/ri'
export default function Books({books}) {
    const [searchedBooks,setSearchBooks]=useState(false)
    const [search, setSearch] = useState(null)
    const [page, setPage] = useState(0)
    const input=useRef()
    useEffect(()=>{
if(search==='') return setSearchBooks(false)
searchProcess(search)
},[search])
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
   if(books.inReading?.indexOf(book.id)!=-1&&books.inReading!=undefined){status='reading';}
   if(books.inCompleted?.indexOf(book.id)!=-1&&books.inCompleted!=undefined){status='completed'}
   return <Fragment key={book.id}>
       <SingleBook book={book}status={status}/>
       </Fragment>
        })}
    </div>: books.bookList.slice(page,page+10).map((book,i)=>{
       let status='none'
       if(books?.inReading?.indexOf(book.id)!=-1&&books?.inReading!=undefined){status='reading';}
       if(books?.inCompleted?.indexOf(book.id)!=-1&&books?.inCompleted!=undefined){status='completed'}
       return <Fragment key={book.id}>
        <SingleBook book={book}status={status}/>
        </Fragment>
   })}
   <select name="" id="" onChange={(e)=>{
       switch (e.target.value) {
  case '1':
      setPage(0)
      break;
  case '2':
      setPage(10)
      break
  case '3':
      setPage(20)
  default:
      break;
       }
       setPage
   }}>
       <option value="1">1</option>
       <option value="2">2</option>
       <option value="3">3</option>
   </select>
        </div>
        </Fragment>

    )
}
