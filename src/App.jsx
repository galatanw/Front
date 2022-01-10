import {useState,createContext} from 'react'
import {BrowserRouter,Link,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import LandPage from './pages/LandPage';
export const SetUserContext=createContext()
export default function App() {
  const [user, setUser] = useState(false)
  return (
     <div>
     {user?
     <BrowserRouter>
    <Link to={"/"}>home</Link>
    <Link to={"/ReadingList"}>Reading List</Link>
    <Link to={"/CompletedList"}>Completed List</Link>
    <Link to={"/Books"}>Books</Link>
    <Routes>
      <Route exact path="/"element={<Home/>}/>
      {/* <Route exact path="/ReadingList"element={}/> */}
    </Routes>
       
  </BrowserRouter>:
    <SetUserContext.Provider value={setUser}>
  <LandPage/>
  </SetUserContext.Provider>
  }
  </div>
  )
}
