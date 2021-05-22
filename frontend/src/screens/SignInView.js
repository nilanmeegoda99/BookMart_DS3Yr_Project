import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormC from '../components/Form_layout'
import { useDispatch, useSelector } from 'react-redux'
import Alertmsg from '../components/Alert'
import Buffer from '../components/buffer'
import  {Sign_In}  from '../actions/userActions'

const SignInView = ({ location, history }) => {
  const [email, setUsername] = useState('')
  const [password, setPass] = useState('')

  const dispatch = useDispatch()
  const userSignin = useSelector(state => state.userSignin)
  const { error, userDetails, loading } = userSignin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userDetails) {
      history.push(redirect)
    }
  }, [userDetails, redirect, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(Sign_In(email,password))
  }

  return (
    <FormC>
      <h1>Sign in to the account</h1>
      {error && <Alertmsg variant='danger'>{error}</Alertmsg>}
      {loading && <Buffer />}

      <Form onSubmit={submitHandler}>
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

        <Button type='submit' variant='primary'>
          Log In
        </Button>
      </Form>

      <Row className='my=6'>
        <Col>
          Don't have a account?
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Sign Up
          </Link>
        </Col>
      </Row>
    </FormC>
  )
}

export default SignInView
