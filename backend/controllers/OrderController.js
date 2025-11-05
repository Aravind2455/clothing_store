import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';
import razorpay from "razorpay"

const currency = 'inr'
const deliveryCharge = 30

//gateway initialized

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorPayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Placing orders using COD methods :

const placeOrder = async (req, res) => {
    try {
        const { userId, amount, items, address } = req.body;

        const orderData = {
            userId,
            amount,
            items,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: [] });

        return res.json({
            success: true,
            message: "Order Placed",
            newOrder
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// Placing orders using Stripe methods :

const placeOrderStripe = async (req, res) => {
    try {
        const { userId, amount, items, address } = req.body;
        console.log(amount);

        const { origin } = req.headers;

        let totalAmount = 0;

        const ordersData = {
            userId,
            amount,
            items,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }


        const newOrder = new orderModel(ordersData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.productData.name,
                    images: [item.productData.image[0]]
                },
                unit_amount: Math.round(item.productData.price * 100)
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: Math.round(deliveryCharge * 100)
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })

        return res.json({
            success: true,
            session_url: session.url
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error
        })
    }

}


const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: [] })

            res.json({
                success: true
            })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success: false
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// Placing orders using RazorPay methods :

const placeOrderRazorPay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            payment: false,
            paymentMethod: "razorpay",
            date: Date.now()
        }

        const newOrder = await new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorPayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({
                    success: false,
                    message: error
                })
            }

            return res.json({
                success: true,
                order
            })

        })

    } catch (error) {
        console.log();
        console.log(error);
        return res.json({
            success: false,
            message: error
        })
    }
}

const verifyRazorPay = async (req, res) => {

    try {
        const { userId, razorpay_order_id } = req.body
        const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id);

        if (!razorpay_order_id) {
            return res.json({ success: false, message: "Missing razorpay_order_id" });
        }


        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: [] })
            return res.json({
                success: true,
                message: "payment successful"
            })
        }

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })

    }

}


const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({})
        return res.json({
            success: true,
            orders
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId })
        return res.json({
            success: true,
            orders
        })


    } catch (error) {
        console.log(error.message);
        return res.json({
            success: false,
            message: "Couldn't fetch the orders , Try again !"
        })

    }
}


const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status })

        return res.json({
            success: true,
            message: "Status updated"
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export { placeOrder, placeOrderStripe, verifyRazorPay, placeOrderRazorPay, allOrders, userOrders, verifyStripe, updateStatus }

