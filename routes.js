const dController = require('./controllers/dashBoardController');
const userController = require('./controllers/userController');
const Procted = require('./utils/protectedR');
const profileCon = require('./controllers/profileController');
const messageController = require('./controllers/messageController');
const fileController = require('./controllers/fileControllers');



let express = require('express');
let router = express.Router();

// users
router.post('/register', register);
router.post('/login', login );
router.post('/g-login', getLogin );
router.get('/logout', logout);
router.get('/dashboard',protectedRoute, dashBoard);



router.post('/create-p',protectedRoute, createProfile);
router.get('/get-all-profile',protectedRoute , getAllProfile);
router.get('/get-a-profile/:id', protectedRoute, getAProfile);
router.put('/edit-profile', protectedRoute, editProfile);


// message Routes
router.post('/create-m', protectedRoute, createMessage);
router.get('/get-all-message',  protectedRoute, getAllMessage);
router.get('/get-a-message',  protectedRoute, getAMessage);
router.put('/edit-message', protectedRoute, editMessage);
router.delete('/d-message',  protectedRoute, deleteMessage);


// file routes
router.post('/upload-file', protectedRoute, upload.single('photo'), uploadFile);
router.get('/view-files', protectedRoute, viewFile);
router.get('/view-a-file', protectedRoute, viewAFile);  
router.delete('/delete-photo', protectedRoute, deleteFile);


module.exports = router ;