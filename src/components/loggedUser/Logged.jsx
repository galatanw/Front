import {BrowserRouter,Link,Routes,Route} from "react-router-dom";
import Books from '../../pages/Books';
import Details from '../../pages/Details';
import Navbar  from './navBar/NavBar';
import ReadingList from '../../pages/ReadingList';
import CompletedList from '../../pages/CompletedList';
import PageNotFound from "../../pages/PageNotFound";

   export default function Logged({TIMER,user,books}) {
     
      return (
        <BrowserRouter>
      <Navbar TIMER={TIMER} userName={user.data.email}/>
    <Routes>
      <Route exact path="/"element={<Books books={books}/>}/>
      <Route exact path="/Reading"element={<ReadingList readingBooks={books.reading} />}/>
      <Route exact path="/Completed"element={<CompletedList completedBooks={books.completed} />}/>
    {books.detailedBook?<Route exact path={'details'+books.detailedBook.id} element={<Details book={books.detailedBook}status={isInList(books,books.detailedBook.id)}/>}/>:null}
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
       )
   }
   
   function isInList(books,id){
   const reading=books?.reading?.findIndex(item=>item.id===id)
   const completed=books?.completed?.findIndex(item=>item.id===id)
if(reading!=-1&&reading!=undefined)return 'reading';
if(completed!=-1&&completed!=undefined) return 'completed';
return 'none'
}
  