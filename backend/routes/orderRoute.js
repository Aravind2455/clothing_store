import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/userAutih.js'
import { allOrders, placeOrder, placeOrderRazorPay, placeOrderStripe, updateStatus, userOrders, verifyRazorPay, verifyStripe } from '../controllers/OrderController.js';
import authUser from '../middleware/userAutih.js';

const orderRouter = express.Router();

//Admin Features !
orderRouter.post('/list' , adminAuth , allOrders );
orderRouter.post('/status'  , adminAuth  , updateStatus  );

//Payment Features !
orderRouter.post('/place' , userAuth , placeOrder );
orderRouter.post('/stripe' , userAuth   , placeOrderStripe );
orderRouter.post('/razorpay' , userAuth  , placeOrderRazorPay );

// User Features !
orderRouter.post('/userOrders' , userAuth , userOrders );

//verify Payment !

orderRouter.post('/verifyStripe' , userAuth , verifyStripe );
orderRouter.post('/verifyRazorpay' , userAuth , verifyRazorPay )


export default orderRouter