import React, { Fragment } from 'react'
import SingleBook from '../components/BookList/SingleBook'

export default function ReadingList({readingBooks}) {
    if(!readingBooks){
        return(
            <div>
                <h1>you haven't started</h1>
            </div>
        )
    }
    return (
        <div>
            {readingBooks.map((book)=>{
               return <Fragment key={book.id}>
                    <SingleBook book={book}status={'reading'}/>
                </Fragment>
            })}       
        </div>
    )
}
