import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormC from '../components/Form_layout'
import { useDispatch, useSelector } from 'react-redux'
import Alertmsg from '../components/Alert'
import Buffer from '../components/buffer'
import  {AddUser}  from '../actions/userActions'

const AddUserView = ({ location, history }) => {
  
  
  const [name, setAccUName] = useState('')
  const [email, setUsername] = useState('')
  const [password, setPass] = useState('')
  const [confirmpassword, setConPass] = useState('')
  const [messagePop, setmessagePop] = useState(null)

  const dispatch = useDispatch()
  const userCreate = useSelector(state => state.userCreate)
  const { error, userDetails, loading } = userCreate

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userDetails) {
      history.push(redirect)
    }
  }, [userDetails, redirect, history])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmpassword){
        setmessagePop('Passwords are not matching')
    } else {
        dispatch(AddUser(name,email, password))
    }
    
  }

  return (
    <FormC>
      <h1>Create Account</h1>
      
      {messagePop && <Alertmsg variant='danger'>{messagePop}</Alertmsg>}
      {error && <Alertmsg variant='danger'>{error}</Alertmsg>}
      {loading && <Buffer />}

      <Form onSubmit={submitHandler}>

      <Form.Group controlId='name'>
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setAccUName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your username'
            value={email}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter the password'
            value={password}
            onChange={(e) => setPass(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmpassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm your password'
            value={confirmpassword}
            onChange={(e) => setConPass(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Add Me
        </Button>
      </Form>

      <Row className='my=6'>
        <Col>
          Already have a account?
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormC>
  )
}

export default AddUserView
