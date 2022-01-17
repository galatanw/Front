import {useState,createContext,useEffect,useReducer} from 'react'
import {GOOGLE_BOOK_Key} from './KEYS'
import axios from 'axios';
import LandPage from './pages/AuthLandPage';
import Logged from './components/loggedUser/Logged';
import StillLogged from './components/StillLogged'; 
const url=`https://www.googleapis.com/books/v1/volumes?q=Business&Economics&language=english&orderBy=newest&printType=books&maxResults=30&key=${GOOGLE_BOOK_Key}`
export const SetUserContext=createContext()
export const UsingBooks=createContext()
export default function App() {
  const [user, setUser] = useState(false)
  const [books, dispatch] = useReducer(BooksHandling, false)
  let TIMER;
    useEffect(()=>{
      console.log(GOOGLE_BOOK_Key);
// see if there is a user auth on localStorage
      const Auth=localStorage.getItem('Auth')?JSON.parse(localStorage.getItem('Auth')):null
if(Auth&&!user){ 
  const expires=Auth.experationTimeBook    
  const now=new Date().getTime()
  // is the user auth  experationTimeBook is still valid
  if(expires>now ){
    setUser(Auth)
    TIMER=setTimeout(logOut,expires-now)
    const activeUser=localStorage.getItem(Auth.data.email)
    if(activeUser!==null){
    returningUser(activeUser)  
  }  
    }
  }
  // if the user auth is not valid or simply not exists on localStorage
  else{
  if(!user)return dispatch({type:'logOut'})
    const activeUser=localStorage.getItem(user.data.email)
    if(activeUser!==null){
    returningUser(activeUser) 
    const twentyMinInMs=60*20*1000
    TIMER=setTimeout(logOut,twentyMinInMs)
    }
    // if the user has no localStorage data
    else newUser()}},[user])
  window.onbeforeunload =()=>settingUserLocalStorage(books,user.data.email)

 return (
<div>
       <SetUserContext.Provider value={setUser}>
     {user&&books?
    <UsingBooks.Provider value={dispatch}>
      <Logged TIMER={TIMER} user={user} books={books}/>
      <div>footer</div>
  </UsingBooks.Provider>
  :!user?
  <LandPage/>:<StillLogged userName={user.data.email}/>}
</SetUserContext.Provider>
  </div>
  )


  function logOut(){
    dispatch({type:'logOut',userName:user.data.email,timer:TIMER})
    setUser(false)
  }
  async function newUser(){
  try{
    const books=await axios.get(url) 
    const twentyMinInMs=60*20*1000
    dispatch({ type:"bookList",value:books.data.items})
    TIMER=setTimeout(logOut,twentyMinInMs)
    return 
      }
      catch(err){
        console.error(err);
}}
async function returningUser(activeUser){
  try{
    const books=await axios.get(url) 
    const data=JSON.parse(activeUser)
    dispatch({ type:"activeUser",value:books.data.items,reading:data.reading,completed:data.completed })
    return 
      }
      catch(err){
        console.error(err);
      }
    }}



function BooksHandling(state,action){
  let books=state?.bookList!==undefined?[...state.bookList]:null
  let completed=state?.completed!==undefined?[...state.completed]:undefined
  let reading=state?.reading!==undefined?[...state.reading]:undefined
  let index;
  switch (action.type) {
    case 'activeUser':
  reading=[]
  completed=[]
    for (let index = 0; index < action.value.length; index++) {
      const element = action.value[index];
      if(action.completed[element.id]!==undefined){
      element.rate=action.completed[element.id].rate
      element.note=action.completed[element.id].note
        completed.push(element)
      }
      if(action.reading[element.id]!==undefined){
      element.rate=action.reading[element.id].rate
      element.note=action.reading[element.id].note
      reading.push(element)
    }
  }
    return {bookList:action.value,reading:reading,completed:completed}


    case "bookList":
      return {...state,bookList:action.value}
  case 'details':
      return{...state,detailedBook:action.value}  
  case 'detailsOnClose':
    return{...state,detailedBook:false}
  
  
      case "completed":
    index=reading.findIndex((item)=>item.id===action.value.id)
    reading.splice(index,1)
    if(state?.completed===undefined||state?.completed?.length===0)    
    return {...state,reading:reading,completed:[action.value]}
    completed.unshift(action.value)
    return{...state,reading:reading,completed:completed}
  
  
  
    case "reading":
    if(action.restore===true){
      if(state.completed.length)
    {
     index=completed.findIndex((item)=>item.id===action.value.id)
      completed[index].rate=0
      completed.splice(index,1)
    ;}
    }
      if(state?.reading===undefined )    
  return {...state,reading:[action.value],completed:completed}
    reading.unshift(action.value)
    return{...state,reading:reading,completed:completed}
  
  
  
    case 'remove':
    const list=[...state[action.list]]
    index=list.findIndex((item)=>item.id===action.value)
    if(action.list==='completed')list[index].rate=0
    list.splice(index,1)
    return {...state,[action.list]:list}

    
    case 'notes':
    index=state.bookList.findIndex((item)=>item.id===action.value)
    books[index].note=action.note
    return{...state,bookList:books}

    case 'rating':
    index=state.bookList.findIndex((item)=>item.id===action.id)
    books[index].rate=action.value
    return{...state,bookList:books}
    case 'logOut':
    if(action.userName===undefined)return null
    if(action.timer!==undefined)clearTimeout(action.timer)
    localStorage.removeItem('Auth')
    if(completed!==undefined||reading!==undefined)settingUserLocalStorage(state,action.userName)
    return null
    
    default:
      break;
  }
}

function settingUserLocalStorage(books,user){
  if(!books)return 
   if(!books?.completed?.length&&!books?.reading?.length) return
    let completed={},reading={}
    if(!books?.completed?.length){}
    else {for (let index = 0; index < books.completed.length; index++) {
      const book= books.completed[index]
      completed[book.id]={rate:book.rate,note:book.note}
    }}
    if(!books?.reading?.length);
    else {
    for (let index = 0; index < books.reading.length; index++) {
      const book= books.reading[index]
      reading[book.id]={rate:book.rate,note:book.note}
    }  
  }
  localStorage.setItem(user,JSON.stringify({completed:completed,reading:reading  }))
}


