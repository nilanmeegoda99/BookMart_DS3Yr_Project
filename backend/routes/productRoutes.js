import express from 'express'
import { getProducById, getProducts, deleteProducById } from '../controllers/productController.js'
import {shield, admin} from '../middleware/validateTokenMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts)

router.route('/:id').get(getProducById).delete(shield, admin, deleteProducById)

export default router
