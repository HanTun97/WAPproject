const Product = require('../models/product');

exports.getAll = (req, res, next) => {
    res.status(200).json(Product.getAll());
}

exports.getAllCart = (req, res, next) => {
    res.status(200).json(Product.getAllCart(req.params.userId));
}

exports.getById = (req, res, next) => {
    const getID = Product.getById(req.params.userId, req.params.productId);
    if(getID.error){
        res.status(404).json(getID);    
    }else{
        res.status(200).json(getID);
    }
}

exports.edit = (req, res) => {
    const editedProd = Product.edit(req.params.userId, req.params.productId, req.params.qty);
    if(editedProd.error){
        res.status(404).json(editedProd);    
    }else{
        res.status(200).json(editedProd);
    }
}

exports.placeOrder = (req, res) => {
    const editedProd = Product.placeOrder(req.params.userId, req.params.productId, req.params.qty);
    if(editedProd.error){
        res.status(400).json(editedProd);    
    }else{
        res.status(200).json(editedProd);
    }
}