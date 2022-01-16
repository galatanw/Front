import { useContext } from "react";
import {Link} from "react-router-dom";
import {ImBooks }from 'react-icons/im'
import {IoMdNavigate }from 'react-icons/io'
import { SetUserContext } from "../../../App";
import {RiLogoutCircleRLine,RiUserStarLine }from 'react-icons/ri'
import { Button,Navbar,Container,Nav} from "react-bootstrap";
import { UsingBooks } from "../../../App";
const NavBar = ({userName,TIMER}) => {
  const dispatch=useContext(UsingBooks)
  const setUser=useContext(SetUserContext)
  const style={display: 'block',
    padding: '0.5rem 1rem',
    color: '#0d6efd',
    textDecoration: 'none',
    transition: 'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out'}
return <>
<Navbar collapseOnSelect expand="lg" bg="dark" variant>
  <Container>
  <Navbar.Brand as={Link} to={'/'}><ImBooks/>BOOK-SHELF</Navbar.Brand>
  <Navbar.Toggle style={{background:'white'}} aria-controls="responsive-navbar-nav" ><IoMdNavigate/></Navbar.Toggle>
  <Navbar.Collapse id="responsive-navbar-nav" >
    <Nav className="me-auto">
      <Nav.Link as={Link} to={'/'}>Books</Nav.Link>
      <Nav.Link as={Link} to={'/Reading'}>Reading</Nav.Link>
      <Nav.Link as={Link} to={'/Completed'}>Completed</Nav.Link>
    </Nav>
    <Nav>
  <p style={style}><RiUserStarLine/>{userName}</p>
  <Navbar.Brand onClick={()=>{dispatch({type:'logOut',userName:userName,timer:TIMER});setUser(false)}} as={Button}><RiLogoutCircleRLine/></Navbar.Brand>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
</>
};

export default NavBar;
