import React, { useState } from "react";
import {Link} from "react-router-dom";

import {ImBooks }from 'react-icons/im'

import {RiLogoutCircleRLine }from 'react-icons/ri'

import { Button,Navbar,Container,Nav} from "react-bootstrap";

const NavBar = () => {
return <>
<Navbar collapseOnSelect expand="lg" bg="dark" variant>
  <Container>
  <Navbar.Brand as={Link} to={'/'}><ImBooks/>BOOK-SHELF</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link as={Link} to={'/Books'}>Books</Nav.Link>
      <Nav.Link as={Link} to={'/Reading'}>Reading</Nav.Link>
      <Nav.Link as={Link} to={'/Completed'}>Completed</Nav.Link>
    </Nav>
    <Nav>
  <Navbar.Brand as={Button}><RiLogoutCircleRLine bg={'dark'}/></Navbar.Brand>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
</>
};

export default NavBar;
