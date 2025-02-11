const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
require('gitignore');

// accept json data
express.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// middleware
// parse application/jsosn
app.use(bodyParser.json());

mongoose.connect(process.env.DBURL).
then(()=> console.log("Connected to Database"))

// Config route
app.use('/', routes);

const PORT = process.env.PORT || 4000
  app.listen(PORT, ()=>{
    console.log("App is listening to port " + PORT);
  });


