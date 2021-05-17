import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from '../components/Rating'

//here we have used props to pass data between two components in a uni directional way
//we can also use 'const Product = ({product}) => instead of using props here'

const Product = (props) => {
  return (
    <Card className='my-3 py-3 rounded'>
      <a href={`/product/${props.product._id}`}>
        <Card.Img src={props.product.b_image} variant='top' />
      </a>

      <Card.Body>
        <a href={`/product/${props.product._id}`}>
          <Card.Title as='div'>
            <strong>{props.product.b_name}</strong>
          </Card.Title>
        </a>

        <Card.Text as='div'></Card.Text>
        <Card.Text as='h3'>${props.product.price}</Card.Text>
        <Rating
          value={props.product.rating}
          text={`${props.product.numReviews} reviews`}
        />
      </Card.Body>
    </Card>
  )
}

export default Product
