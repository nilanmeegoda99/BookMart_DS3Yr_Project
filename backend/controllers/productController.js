import asyncHandler from 'express-async-handler'//importing Async handler to do error handling in routes rather than using TryCatch
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


export {
    getProducById,
    getProducts
}
