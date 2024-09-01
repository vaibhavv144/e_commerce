const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const seedDB = require('./seed')
const productRoutes = require('./Routes/product')
const reviewRoutes = require('./Routes/review');
const userRoutes = require('./Routes/auth');
const cartRoutes = require('./Routes/cart');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./Models/User');
const session = require('express-session');


mongoose.connect('mongodb://127.0.0.1:27017/mega')
    .then(() => {
        console.log("db successfully connected")
    })
    .catch((err) => {
        console.log("db not connected");
        console.log(err);
    });
    
let configSession = {
    secret: 'Keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 24 * 7 * 60 * 60 * 1000,
        maxAge: 24 * 7 * 60 * 60 * 1000
    }
}

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session(configSession));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})


// passport
passport.use(new LocalStrategy(User.authenticate()));
// seedDB();
app.use(productRoutes);
app.use(reviewRoutes);
app.use(userRoutes);
app.use(cartRoutes);
app.listen(8080, () => {
    console.log('connected')
})