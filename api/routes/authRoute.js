const express = require('express');
const { registerController, loginController, testController, updateProfileController } = require('../controllers/authController');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
//router object

const router = express.Router();

//routing
//Register  :: Method->post
router.post('/register', registerController);


//LOGIN  || POST
router.post('/login', loginController);


//protected routes (user)
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})


//protected admin route
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})


//update profile
router.put("/profile-update", requireSignIn, updateProfileController);

//test routes
router.get('/test', requireSignIn, isAdmin, testController);

module.exports = router;