import React, { Fragment } from 'react'
import SingleBook from '../components/books/SingleBook'

export default function CompletedBooks({completedBooks}) {
    if(!completedBooks){
        return(
            <div>
                <h1>you haven't started</h1>
            </div>
        )
    }
    console.log('reading');
    return (
        <div>
            {completedBooks.map((book)=>{
               return <Fragment key={book.id}>
                    <SingleBook book={book}status={'completed'}/>
                </Fragment>
            })}       
        </div>
    )
}
