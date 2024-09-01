const express = require('express')
const router = express.Router();
const User = require('../Models/User');
const passport = require('passport');
router.get('/register', (req, res) => {
    res.render('auth/signup');
})

router.post('/register', async (req, res) => {
    let { email, password, username, role } = req.body;
    const user = new User({ email, username, role });
    const newUser = await User.register(user, password);
    // res.send(newUser);
    req.login(newUser, function (err) {
        if (err) { return next(err) }
        return res.redirect('/products');
    })
})

router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureMessage: true
    }),
    (req, res) => {
        res.redirect('/products');
    })

router.get('/logout', (req, res) => {
    () => {
        req.logout();
    }
    res.redirect('/login');
})

module.exports = router;