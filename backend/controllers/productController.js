import asyncHandler from 'express-async-handler' //importing Async handler to do error handling in routes rather than using TryCatch
import Product from '../models/productModel.js'

// @desc  Fetch  products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  res.json(products)
})

// @desc  Fetch a single product
// @route GET /api/product/:id
// @access Public

const getProducById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc  DELETE a product
// @route DELETE /api/product/:id
// @access Private/Admin

const deleteProducById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Successfully removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc  Insert  a new product
// @route POST /api/products
// @access Private/Admin

const InsertProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    b_name: 'Sample one',
    b_image: '/images.sample.jpg',
    b_author: 'Sample author',
    price: 864,
    user: req.user._id,
    category: 'Biography',
    countInStock: 56,
    numReviews: 10,
    b_decription: 'sample desc',
  })

  const addedProduct = await product.save()
  res.status(201).json(addedProduct)
})

// @desc  Update  a new product
// @route PuT /api/products/:id
// @access Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    b_name,
    b_image,
    b_author,
    price,
    user,
    category,
    countInStock,
    numReview,
    b_decription,
  } = req.body

  const product = await Product.findById(req.params.id)

  if(product){
    product.b_name = b_name
    product.b_image = b_image
    product.b_author = b_author
    product.price = price
    product.user = user
    product.category = category
    product.countInStock = countInStock 
    product.numReview = numReview
    product.b_decription = b_decription

 

  const updatedProduct = await product.save()
  res.json( updatedProduct) 
}else{
  res.status(404)
  throw new Error('Product not found ') }
})

export { getProducById, getProducts, deleteProducById, InsertProduct,updateProduct  }
