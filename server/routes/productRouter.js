const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

/**
 * @swagger
 *   /shopping/products:
 *     get:
 *       summary: Fetch All Products
 *       tags: [Products]
 *       responses:
 *         "200":
 *           description: The list of all products
 *           contents:
 *             application/json:
 */

router.get('/products', productController.getAll);

/**
 * @swagger
 *   /shopping/users/{userId}/cart:
 *     get:
 *       summary: Fetch User's Cart
 *       tags: [Products]
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: Id of a user
 *       responses:
 *         "200":
 *           description: The list of all products from user's cart
 *           contents:
 *             application/json:
 */

router.get('/users/:userId/cart', productController.getAllCart);

/**
 * @swagger
 *   /shopping/users/{userId}/cart/products/{productId}:
 *     get:
 *       summary: Fetch User's Cart
 *       tags: [Products]
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: Id of a user
 *         - in: path
 *           name: productId
 *           schema:
 *             type: string
 *           required: true
 *           description: Id of a product
 *       responses:
 *         "200":
 *           description: The list of specific products info from user's cart (for add to cart)
 *           contents:
 *             application/json:
 */

router.get('/users/:userId/cart/products/:productId', productController.getById);

/**
 * @swagger
 *   /shopping/users/{userId}/cart/products/{productId}/step-change/{qty}:
 *     put:
 *       summary: Order Quantity change in User's Cart
 *       tags: [Products]
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: Id of a user
 *         - in: path
 *           name: productId
 *           schema:
 *             type: string
 *           required: true
 *           description: Id of a product
 *         - in: path
 *           name: qty
 *           schema:
 *             type: integer
 *           required: true
 *           description: order quantity
 *       responses:
 *         "200":
 *           description: changed quantity and price info of specific products info from user's cart (order quantity changing)
 *           contents:
 *             application/json:
 */

router.put('/users/:userId/cart/products/:productId/step-change/:qty', productController.edit);

/**
 * @swagger
 *   /shopping/users/{userId}/cart/products/{productId}/placeOrder/{qty}:
 *     put:
 *       summary: Place Order from User's Cart
 *       tags: [Products]
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: Id of a user
 *         - in: path
 *           name: productId
 *           schema:
 *             type: string
 *           required: true
 *           description: Id of a product
 *         - in: path
 *           name: qty
 *           schema:
 *             type: integer
 *           required: true
 *           description: place order amount
 *       responses:
 *         "200":
 *           description: The specific message info for Place Order
 *           contents:
 *             application/json:
 */

router.put('/users/:userId/cart/products/:productId/placeOrder/:qty', productController.placeOrder);


module.exports = router;