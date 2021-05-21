import express from 'express'
import { getProducById, getProducts } from '../controllers/productController.js'
const router = express.Router()

router.route('/').get(getProducts)

router.route('/:id').get(getProducById)

export default router
