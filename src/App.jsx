import {useState,createContext,useEffect,useReducer} from 'react'
import {GOOGLE_BOOK_Key} from '../KEYS' 
const url=`https://www.googleapis.com/books/v1/volumes?q=Business&Economics&language=english&orderBy=newest&printType=books&maxResults=30&key=${GOOGLE_BOOK_Key}`
import axios from 'axios';
import LandPage from './pages/LandPage';
import Logged from './components/loggedUser/Logged';
export const SetUserContext=createContext()
export const UsingBooks=createContext()
export default function App() {
  const [user, setUser] = useState(false)
  const [books, dispatch] = useReducer(BooksHandling, false)
const axiosBo =async ()=>{
  try{
    const books=await axios.get(url) 
    dispatch({ type:"bookList",value:books.data.items})
      }
      catch(err){
        console.error(err);
      }
    }

  useEffect(()=>{
    if(!user)return dispatch({type:'logOut'})
    const ActiveUser=localStorage.getItem(user.data.email)
    if(ActiveUser!=null)return dispatch({ type:"activeUser",value:JSON.parse(ActiveUser) })
    axiosBo()

  },[user])
  window.onbeforeunload = function() {
    localStorage.setItem(user.data.email,JSON.stringify(books))
}
 return (
   <div>
       <SetUserContext.Provider value={setUser}>
     {user&&books?
    <UsingBooks.Provider value={dispatch}>
      <Logged user={user} books={books}/>
  </UsingBooks.Provider>
  :
  <LandPage/>
}
</SetUserContext.Provider>
  </div>
  )
}


function BooksHandling(state,action){
  const books=state?.bookList!=undefined?[...state.bookList]:null
  const completed=state?.completed!=undefined?[...state.completed]:undefined
  const inCompleted=state?.inCompleted!=undefined?[...state.inCompleted]:undefined
  const reading=state?.reading!=undefined?[...state.reading]:undefined
  const inReading=state?.inReading!=undefined?[...state.inReading]:undefined
  let index;
  switch (action.type) {
    case 'activeUser':
      // const {read,complete}=action.value
      // state.booksList.filter((item)=>{
        // item.id===books.id
      // })
      return action.value


    case "bookList":
      return {...state,bookList:action.value}
  case 'details':
      return{...state,detailedBook:action.value}  
  
  
  
      case "completed":
    index=inReading.indexOf(action.value.id)
    reading.splice(index,1)
    inReading.splice(index,1)
    if(state?.completed===undefined||state?.completed?.length===0)    
    return {...state,reading:reading,completed:[action.value],inCompleted:[action.value.id],inReading:inReading}
    completed.unshift(action.value)
    inCompleted.unshift(action.value.id)
    return{...state,reading:reading,completed:completed,inCompleted:inCompleted,inReading:inReading}
  
  
  
    case "reading":
    if(action.restore===true){
      if(state.completed.length)
    {
    console.log(action.value,completed);
     index=inCompleted.indexOf(action.value.id)
      inCompleted.splice(index,1)
      completed[index].rate=0
      completed.splice(index,1)
    ;}
    }
      if(state?.reading===undefined )    
  return {...state,reading:[action.value],inCompleted:inCompleted,inReading:[action.value.id],completed:completed}
    reading.unshift(action.value)
    inReading.unshift(action.value.id)
    return{...state,reading:reading,inReading:inReading,inCompleted:inCompleted,completed:completed}
  
  
  
    case 'remove':
    const list=[...state[action.list[0]]]
    const inList=[...state[action.list[1]]]
     index=inList.indexOf(action.value)
    if(action.list[0]==='completed')list[index].rate=0
    
    list.splice(index,1)
    inList.splice(index,1)
    return {...state,[action.list[0]]:list,[action.list[1]]:inList}
  
  
  
    case 'notes':
    index=state.bookList.findIndex((item)=>item.id===action.value)
    books[index].note=action.note
    return{...state,bookList:books}


    case 'rating':
    index=state.bookList.findIndex((item)=>item.id===action.id)
    books[index].rate=action.value
    return{...state,bookList:books}
    case 'logOut':
        return null
    case 'details':
    return{...state,detailedBook:action.value}
    default:
      break;
  }
}

