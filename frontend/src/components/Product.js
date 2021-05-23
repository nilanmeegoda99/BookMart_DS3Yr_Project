import React from 'react'

//instead of 'a' tag
import { Link } from 'react-router-dom'

import { Card } from 'react-bootstrap'
import Rating from '../components/Rating'

const Product = (props) => {
  return (
    <Card className='my-3 py-3 rounded'>
      <Link to={`/product/${props.product._id}`}>
        <Card.Img src={props.product.b_image} variant='top' fluid='true' />
      </Link>

      <Card.Body>
        <Link to={`/product/${props.product._id}`}>
          <Card.Title as='div'>
            <strong>{props.product.b_name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'></Card.Text>
        <Card.Text as='h5'>LKR {props.product.price}</Card.Text>
        <Rating
          value={props.product.rating}
          text={`${props.product.numReviews} reviews`}
        />
      </Card.Body>
    </Card>
  )
}

export default Product
