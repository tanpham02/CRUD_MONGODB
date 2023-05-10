const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection')

const app = express();

dotenv.config({path: '.env'});
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('dev'));

//mongodb connect
connectDB();

//parser request to body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json())

//set view engine
app.set('view engine', 'ejs');
// app.set('views', path.resolve(__dirname, 'views/ejs'));

// load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

app.use( express.static(path.resolve(__dirname, 'views')));



//load router
app.use('/', require('./server/routes/router'));

//Middlewares
app.use(express.json())


// server setup
app.listen(PORT, ()=> {console.log(`Server is running on http://localhost:${PORT}`)});
