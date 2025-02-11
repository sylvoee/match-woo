const blogControler = require('./controllers/blogController');
const userController = require('./controllers/userController');


let express = require('express');
let router = express.Router();

// users
router.post('/register', register);


router.get('/', getBlogPost);

// post request
router.post('/post', postBlog);
// read all user
router.get('/all-users', allUsers);
router.get('/a-user/:id', aUser);
router.put('/edit-user', editUser);
router.delete('/d-user', deleteUser);




module.exports = router ;