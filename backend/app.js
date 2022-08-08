const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./helpers/error-handler');
const { cookieJwtAuth } = require("./middleware/cookieJwtAuth");
const cookieParser = require("cookie-parser");
const authJwt = require('./helpers/jwt');
require('dotenv/config');

//Middleware
app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(cookieParser());
app.use(cors());
app.options('*', cors());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST PUT, DELETE, OPTIONS");
    next();
})
app.use(express.json());
app.use(morgan('tiny'));

const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const api = process.env.API_URL;

app.use(authJwt());
app.use(`${api}/login`, loginRoutes);
app.use(`${api}/users`,cookieJwtAuth, usersRoutes);



mongoose.connect(process.env.DB_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'zenodoWebApp'
})
.then(()=>{
    console.log('DB CONNECTED')
})
.catch((error)=>{
    console.log(error);
})
app.listen(3000, ()=>{
    console.log('SERVER RUNNING http://localhost:3000');
})