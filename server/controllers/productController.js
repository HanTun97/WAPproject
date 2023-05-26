const Product = require('../models/product');

exports.getAll = (req, res, next) => {
    res.status(200).json(Product.getAll());
}

exports.getAllCart = (req, res, next) => {
    res.status(200).json(Product.getAllCart(req.params.userId));
}

exports.getById = (req, res, next) => {
    res.status(200).json(Product.getById(req.params.userId, req.params.productId));
}

exports.edit = (req, res) => {
    const editedProd = Product.edit(req.params.userId, req.params.productId, req.params.qty);
    res.status(200).json(editedProd);
}

exports.placeOrder = (req, res) => {
    const editedProd = Product.placeOrder(req.params.userId, req.params.productId, req.params.qty);
    res.status(200).json(editedProd);
}