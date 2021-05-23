import asyncHandler from 'express-async-handler' //importing Async handler to do error handling in routes rather than using TryCatch
import Order from '../models/orderModel.js'

// @desc  insert new order
// @route POST /api/orders
// @access Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingPrice,
    paymentMethod,
    itemsPrice,
    shippingAddress,
    totalPrice,
  } = req.body

  // console.log(req.body);

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('Empty Order list')
    return
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingPrice,
      paymentMethod,
      itemsPrice,
      shippingAddress,
      totalPrice,
    })

    const finalizeOrder = await order.save()
    res.status(201).json(finalizeOrder)
  }
})

// @desc  fetch order  by a id
// @route GET /api/orders/:id
// @access Private
const getOrderByID = asyncHandler(async (req, res) => {
 const order = await Order.findById(req.params.id).populate('user', 'name email')

 if(order) {
   res.json(order)
 }else{
   res.status(404)
   throw new Error('Invalid Order')
 }

})

// @desc  Update order to paid
// @route GET /api/orders/:id/pay
// @access Private

const updateOrdertoPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
 
  if(order) {
    order.isPaid =true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)

  }else{
    res.status(404)
    throw new Error('Invalid Order')
  }
 
 })


export { createOrder, getOrderByID, updateOrdertoPaid }
