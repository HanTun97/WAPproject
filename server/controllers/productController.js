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

exports.editDown = (req, res) => {
    const editedProd = Product.editDown(req.params.userId, req.params.productId);
    res.status(200).json(editedProd);
}

exports.editUp = (req, res) => {
    const editedProd = Product.editUp(req.params.userId, req.params.productId);
    res.status(200).json(editedProd);
}