import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alertmsg from '../components/Alert'
import Buffer from '../components/buffer'
import { ViewuserInfo, updateUserAccount } from '../actions/userActions'
import {USER_UPDATE_ACC_CLEAN} from '../constants/userConstants'

const UserProfileView = ({ history }) => {

  const [name, setAccUName] = useState('')
  const [email, setUsername] = useState('')
  const [password, setPass] = useState('')
  const [confirmpassword, setConPass] = useState('')
  const [messagePop, setmessagePop] = useState(null)

  const dispatch = useDispatch()

  const userInfo = useSelector((state) => state.userInfo)
  const { error, user, loading } = userInfo

  const userSignin = useSelector((state) => state.userSignin)
  const { userDetails } = userSignin

  const userUpdateAcc = useSelector((state) => state.userUpdateAcc)
  const { success } = userUpdateAcc

  useEffect(() => {
    if (!userDetails) {
      history.push('/login')
    } else {
      if ( !user || !user.name || success) {
        dispatch({type: USER_UPDATE_ACC_CLEAN})
        dispatch(ViewuserInfo('account'))
      } else {
        setAccUName(user.name)
        setUsername(user.email)
      }
    }
  }, [dispatch, userDetails, history,user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmpassword) {
      setmessagePop('Passwords are not matching')
    } else {
      dispatch(updateUserAccount({id:user._id, name, email, password}))
    }
  }

 
  return <Row>
    <Col md={3}>
      <h2>User Account</h2>

      {messagePop && <Alertmsg variant='danger'>{messagePop}</Alertmsg>}
      {error && <Alertmsg variant='danger'>{error}</Alertmsg>}
      {success && <Alertmsg variant='success'>Updated Successfully</Alertmsg>}
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
          <Form.Label>Email</Form.Label>
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

        <Button type='submit' variant='primary' >
          Update Account
        </Button>
      </Form>
    </Col>
    <Col md={9}>
      <h2> Order Table</h2>
    </Col>
  </Row>
  
}

export default UserProfileView
