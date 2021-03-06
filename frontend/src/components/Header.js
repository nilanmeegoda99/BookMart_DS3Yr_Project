/*ES7 snippets here we will be using rafce(react arrow function export) the difference of this is it createsa a variable and export itdown to the 
header*/

import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import {signout} from '../actions/userActions'

const Header = () => {

  const dispatch = useDispatch()

  const userSignin = useSelector((state) => state.userSignin)
  const { userDetails } = userSignin

  const signouthandler = () => {
      dispatch(signout())
  }

  return (
    <header>
      <Navbar bg='light' variant='blue' expand='lg' collapseOnSelect>
        <Container>
          {/* Instead of normal Link we have used LinkContainer*/}
          <LinkContainer to='/'>
            <Navbar.Brand>BookMart</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'>CART</i>
                </Nav.Link>
              </LinkContainer>
              {userDetails ? (
                  <NavDropdown title={userDetails.name} id='accountname'><LinkContainer to='/account'><NavDropdown.Item>Account</NavDropdown.Item></LinkContainer>
                  <NavDropdown.Item onClick={signouthandler}>Sign Out</NavDropdown.Item></NavDropdown>


              ) :<LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fas fa-user'> SIGN IN</i>
                </Nav.Link>
              </LinkContainer>}

              <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                <NavDropdown.Item href='#action/3.2'>
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href='#action/3.3'>
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
