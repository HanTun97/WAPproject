const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));
app.use('/public/img', express.static(__dirname + '/public/img'));

app.use('/login', userRouter);

app.use((req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1]
    if(token === 'null'){
        res.json({error: 'No Access Token'});
    } else {
        req.user = token.split('-')[0];
        next();
    }
})

app.use('/shopping', productRouter);

app.use((error, req, res, next)=>{
    res.status(500).json({error: 'Invalid username and password!'});
})


app.listen(3000, () => console.log('listening to 3000...'));
