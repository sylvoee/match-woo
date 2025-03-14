const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
require('gitignore');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const cookieParser = require('cookie-parser');

// accept json data
express.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// middleware
// parse application/jsosn
app.use(bodyParser.json());

mongoose.connect(process.env.DBURL).
then(()=> console.log("Connected to Database"))


app.use(cookieParser());
// app.set('trust proxy', 1) // trust first proxy

app.use( session(
  // properiteis
  {
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized:true,
    cookie: { maxAge : 1000 * 3600 *24 * 7}, 
    store : connectMongo.create({mongoUrl : process.env.DBURL, collectionName : 'sessionStore'})
    
   
  }
) )


// Config route
app.use('/', routes);

const PORT = process.env.PORT || 4000
  app.listen(PORT, ()=>{
    console.log("App is listening to port " + PORT);
  });


