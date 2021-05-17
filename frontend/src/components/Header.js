/*ES7 snippets here we will be using rafce(react arrow function export) the difference of this is it createsa a variable and export itdown to the 
header*/

import React from 'react'
import {Navbar, Nav, Container, NavDropdown, Button, Form, FormControl} from 'react-bootstrap'

const Header = () => {
    return (
        <header>
           <Navbar bg="light" variant="blue" expand="lg" collapseOnSelect>
             <Container>
              <Navbar.Brand href="/">BookMart</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto"> 
                  <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i> CART</Nav.Link>
                  <Nav.Link href="/login"><i className='fas fa-user'> SIGN IN</i></Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
   
    </Navbar.Collapse>
  </Container>
</Navbar>
        </header>
    )
}

export default Header
