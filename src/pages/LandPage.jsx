import { useState } from "react"
import { Button } from "react-bootstrap"
import HandleUser from "../components/Auth/HandleUser"
import './Landpage.css'
export default function LandPage() {
  
    const [userAction, setAction] = useState({clicked:false,action:"select"})
    const ClickHandle=(bool)=>setAction({clicked:true,action:bool})
    return (
<div id="LandPage">
  <h1 id="title">
    THE BOOK SHELF
  </h1>
  <img src="https://cdn.pixabay.com/photo/2015/06/02/12/59/book-794978__340.jpg" alt="Logo"/>
  <div>
  <Button 
    onClick={()=>ClickHandle(true)} 
    size="lg">
  Login</Button>
  <Button 
    onClick={()=>ClickHandle(false)}
    size="lg">
  Register</Button>
  </div>
      {userAction.clicked?
<div id="UserForm">
        <Button onClick={() =>setAction({clicked:false,action:'select'})} variant="danger" size="lg">close</Button>
       <HandleUser action={userAction.action}/>
  </div>:null
    }
</div>
    )
}
