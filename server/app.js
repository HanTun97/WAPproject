const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');

const app = express();
app.use(cors());
app.use(express.json());


const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");
const options = require('./swagger');
const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
)

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

app.use((req, res, next)=>{
    res.status(404).json({error: 'File Not Found'});
})

app.use((error, req, res, next)=>{
    if(error)
        res.status(500).json({error: "No Authorization"});
    else
        res.status(500).json({error: error});
})


app.listen(3000, () => console.log('listening to 3000...'));
