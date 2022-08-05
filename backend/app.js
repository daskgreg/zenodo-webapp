const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');
app.use(cors());
app.options('*', cors())

//Middleware
app.use(express.json());
app.use(morgan('tiny'));


const usersRoutes = require('./routes/users');
const api = process.env.API_URL;

app.use(`${api}/users`, usersRoutes);

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
    console.log(api);
    console.log('SERVER RUNNING http://localhost:3000');
})