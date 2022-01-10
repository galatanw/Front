import {useState,createContext,useEffect,useReducer} from 'react'
import {BrowserRouter,Link,Routes,Route} from "react-router-dom";
import axios from 'axios';
import Home from './pages/Home';
import LandPage from './pages/LandPage';
import Books from './pages/Books';
import ReadingList from './pages/ReadingList';
export const SetUserContext=createContext()
export const UsingBooks=createContext()
export default function App() {
  const [user, setUser] = useState(false)
  const [books, dispatch] = useReducer(BooksHandling, null)
  useEffect(()=>{
    if(!user)return
    axios.get("https://www.googleapis.com/books/v1/volumes?q=Business&Economics&language=english&orderBy=newest&printType=books&maxResults=30&key=AIzaSyBIr47Mow3sRWcgdX03UsQi108y5x9OXXc")
    .then((data) => dispatch({ type:"bookList",value:data.data.items}))
    .catch(err=>console.error(err))
  },[user])
  user?console.log(books):null
  return (
     <div>
     {user?
    <UsingBooks.Provider value={dispatch}>
      <ReadingList readingBooks={books?.reading} />
      <Books books={books}/>

     {/* <BrowserRouter> */}
    {/* <Link to={"/"}>home</Link> */}
    {/* <Link to={"/ReadingList"}>Reading List</Link> */}
    {/* <Link to={"/CompletedList"}>Completed List</Link> */}
    {/* <Link to={"/Books"}>Books</Link> */}
    {/* <Routes> */}
      {/* <Route exact path="/"element={<Home/>}/> */}
      {/* <Route exact path="/Books"element={<Books/>}/> */}
    {/* </Routes> */}
  {/* </BrowserRouter> */}
  </UsingBooks.Provider>:
    <SetUserContext.Provider value={setUser}>
  <LandPage/>
  </SetUserContext.Provider>
  }
  </div>
  )
}
function BooksHandling(state,action){
  switch (action.type) {
    case "bookList":
      for (const iterator of action.value) {
        iterator.notes=[]
        iterator.rating=0
      }
      return {...state,bookList:action.value}
  case "completed":
    // const completedindex=completed.findIndex(book=>action.value.id===book.id)
    const reading=[...state.reading]
    const index=reading.findIndex(book=>action.value.id===book.id)
    reading.splice(index,1)
      if(!state?.completed!=undefined)    
  return {...state,reading:reading,completed:[action.value],inCompleted:[action.value.id]}
  else {
    const temp=[...state.completed]
    const inCompleted=[...state.inCompleted]
    temp.unshift(action.value)
    inCompleted.unshift(action.value.id)
    return{...state,reading:reading,completed:temp,inCompleted:inCompleted}
  }
  case "reading":
    console.log('-----------------------------')
    console.log(action.restore);
    let inCompleted=state.inCompleted
    if(action.restore!=undefined&&state?.completed!=undefined){
      if(state.completed.length)
    {inCompleted=[...state.inCompleted]
    const completed=[...state.completed]
    const completedindex=completed.findIndex(book=>action.value.id===book.id)
    const inCompletedIndex=state.inCompleted.indexOf(action.value.id)
    inCompleted.splice(inCompletedIndex,1)
    completed.splice(completedindex,1)}
    }
      if(!state?.reading)    
  return {...state,reading:[action.value],inCompleted:inCompleted,inReading:[action.value.id]}
  else {
    const temp=[...state.reading]
    temp.unshift(action.value)
    const inReading=[...state.inReading]
    inReading.unshift(action.value.id)
    return{...state,reading:temp,inReading:inReading,inCompleted:inCompleted}
  }
    default:
      break;
  }
}