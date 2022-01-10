import React, {Fragment } from 'react'
import SingleBook from '../components/BookList/SingleBook'
export default function Books({books}) {
    return (
              <div>
            {books?books.bookList.map((book,i)=>{
                let status='none'
                if(books?.inReading?.indexOf(book.id)!=-1&&books?.inReading!=undefined){status='reading';}
                if(books?.inCompleted?.indexOf(book.id)!=-1&&books?.inCompleted!=undefined){status='completed'}
                return <Fragment key={book.id}>
                 <SingleBook book={book}status={status}/>
                 </Fragment>
            }):null}
        </div>
    )
}
