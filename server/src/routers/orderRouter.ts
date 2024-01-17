import express from 'express';
import { changeOrderStatus, findOrdersByRestaurantId, incomingOrder } from '../controllers/order.contoller';

const orderrouter = express.Router();

orderrouter.post('/incoming', incomingOrder);
orderrouter.put('/status', changeOrderStatus);
// orderrouter.put('/chef/:orderId', addChefToOrder);
orderrouter.get('/restaurant', findOrdersByRestaurantId);

export default orderrouter;