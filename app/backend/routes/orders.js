const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, adminAuth } = require('../middleware/auth');

// User routes
router.post('/', auth, orderController.createOrder);
router.get('/my-orders', auth, orderController.getMyOrders);
router.get('/:id', auth, orderController.getOrderById);

// Admin routes
router.get('/', adminAuth, orderController.getAllOrders);
router.put('/:id/status', adminAuth, orderController.updateOrderStatus);
router.get('/stats/overview', adminAuth, orderController.getOrderStats);

module.exports = router;
