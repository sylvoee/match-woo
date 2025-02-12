const blogControler = require('./controllers/blogController');
const userController = require('./controllers/userController');


let express = require('express');
let router = express.Router();

// users
router.post('/register', register);
router.post('/login', login );








module.exports = router ;