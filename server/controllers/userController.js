const User = require('../models/user');

exports.validate = (req, res, next) => {
    const validated = new User(null, req.body.username, req.body.password).validate();
    if(validated.error){
        res.status(401).json(validated);    
    }else{
        res.status(200).json(validated);
    }
}