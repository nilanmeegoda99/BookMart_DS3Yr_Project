import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alertmsg from '../components/Alert'
import Buffer from '../components/buffer'
import  {ListUsers}  from '../actions/userActions'


const UserList = ({history}) => {

    const dispatch = useDispatch()

    const userListb = useSelector(state => state.userListb)
    const {loading , users , error} = userListb

    const userSignin = useSelector(state => state.userSignin)
    const {userDetails} = userSignin

    useEffect(() => {
        if(userDetails && userDetails.isAdmin){
        dispatch(ListUsers())}
        else {
            history.push('/login')
        }
    }, [dispatch, history,userDetails] )

    const deleteHandler = (id) => {
        console.log('delete')
    }

    return (
        <>
        <h1> Users </h1>
        {loading ? <Buffer /> : error ? <Alertmsg variant='danger'>{error}</Alertmsg>:(

            <Table striped bordered hover responsive className='table-sm'>

                <thead>
                    <tr>
                        <th>Reg ID</th>
                        <th>Name</th>
                        <th>username</th>
                        <th>Admin</th>
                       
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td><a href={`{mailto:${user.email}`}>{user.email}</a></td>
                        <td>{user.isAdmin ? (
                            <i className='fa fa-check' style ={{color: 'green'}}></i>
                        ): (<i className='fa fa-check' style ={{color: 'red'}}></i>)}</td>

                        <td><LinkContainer to={`/user/${user._id}/edit`}><Button variant='light' className='btn-sm'><i className='fas fa-edit'></i></Button></LinkContainer>
                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}><i className='fas fa-trash'></i>
                            </Button>
                        </td>

                        </tr>
                    ))}
                    
                    
                </tbody>
            </Table>
                
        )}
            
        </>
    )
}

export default UserList
