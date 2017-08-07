import express from 'express';
import routes from './order-endpoints';

const router = express.Router();
//Api methods.
router.get('/getOrder/:orderIdentifier?', routes.getOrder);
router.get('/getOrders', routes.getOrders);
router.get('/getOrderDiff/:orderId', routes.getOrderDiff);
router.put('/cancelOrder', routes.cancelOrder);

//test route
router.get('/test', function (req, res) {
	res.send({ 'Message': 'Test Route' });
});

export default router;
