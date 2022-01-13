import {BrowserRouter,Link,Routes,Route} from "react-router-dom";
import Home from '../../pages/Home';
import Books from '../../pages/Books';
import Details from '../../pages/Details';
import Navbar  from '../../components/navBar/NavBar';
import ReadingList from '../../pages/ReadingList';
import CompletedList from '../../pages/CompletedList';
import {useEffect} from 'react'

   export default function Logged({user,books}) {
     
     useEffect(() => {
       return () => {
         localStorage.setItem(user.data.email,JSON.stringify(books))
        }
      }, [])
      return (
        <BrowserRouter>
      <Navbar userName={user.data.email}/>
    <Routes>
      <Route exact path="/books"element={<Books books={books}/>}/>
      <Route exact path="/Reading"element={<ReadingList readingBooks={books.reading} />}/>
      <Route exact path="/Completed"element={<CompletedList completedBooks={books.completed} />}/>
    {books.detailedBook?<Route exact path={'details'+books.detailedBook.id} element={<Details book={books.detailedBook}status={ isInList(books,books.detailedBook.id)}/>}/>:null}
    </Routes>
    </BrowserRouter>
       )
   }
   
   function isInList(books,id){
if(books?.inReading?.indexOf(id)!=-1&&books?.inReading!=undefined)return 'reading';
if(books?.inCompleted?.indexOf(id)!=-1&&books?.inCompleted!=undefined) return 'completed';
return 'none'
}
  