import React from 'react'

export default function CompletedList({completedBooks}) {
    if(!completedBooks){
        return(
            <h1>finish your book</h1>
        )
    }
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
