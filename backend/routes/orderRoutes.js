import express from 'express'
import { createOrder, getOrderByID, updateOrdertoPaid } from '../controllers/orderController.js'
const router = express.Router()
import {shield} from '../middleware/validateTokenMiddleware.js'


router.route('/').post(shield, createOrder)
router.route('/:id').get(shield, getOrderByID)
router.route('/:id/pay').put(shield, updateOrdertoPaid)




export default router