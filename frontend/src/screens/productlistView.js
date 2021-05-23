import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row ,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alertmsg from '../components/Alert'
import Buffer from '../components/buffer'
import  {listProducts, delteProduct}  from '../actions/productActions'


const ProductlistView = ({history, match}) => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading , error , products} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDel , error:errorDel , success:successDel} = productDelete

    const userSignin = useSelector(state => state.userSignin)
    const {userDetails} = userSignin

    useEffect(() => {
        if(userDetails && userDetails.isAdmin){
        dispatch(listProducts())}
        else {
            history.push('/login')
        }
    }, [dispatch, history,userDetails, successDel] )

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure ?')){
          dispatch(delteProduct(id))
        }
    }

    const addProductHandler = (product) => {
        //
    }

    return (
       <>
        <Row className='align-items-center'>
       
       <Col> <h1> Products </h1></Col>

        <Col classname='text-right'>
            <Button className='my-3' onClick={addProductHandler} ><i className='fas fa-plus'></i>Add Product</Button>
        </Col>
        </Row>
        {loadingDel && <Buffer />}
        {errorDel && <Alertmsg variant='danger'>{errorDel}</Alertmsg>}
        {loading ? ( <Buffer />) : error ? (<Alertmsg variant='danger'>{error}</Alertmsg>): (
            <Table striped bordered hover responsive className='table-sm'>

                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Author</th>
                       
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                        <td>{product.b_name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.b_author}</td>

                        <td><LinkContainer to={`/admin/product/${product._id}/edit`}><Button variant='light' className='btn-sm'><i className='fas fa-edit'></i></Button></LinkContainer>
                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}><i className='fas fa-trash'></i>
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

export default ProductlistView
