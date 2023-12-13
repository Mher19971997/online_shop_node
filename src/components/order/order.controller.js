const express = require('express');
const OrderService = require('./order.service');
const authMiddleware = require('./../../../middleware/auth.middleware');

const orderRouter = express.Router();

orderRouter.get('/', OrderService.getAllOrders);
orderRouter.post('/:uuid', authMiddleware, OrderService.createOrder);
orderRouter.delete('/:uuid', authMiddleware, OrderService.deleteOrder);

module.exports = orderRouter;
