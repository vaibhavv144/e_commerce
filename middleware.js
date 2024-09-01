const { productSchema, reviewSchema } = require('./schema');
const Product = require('./Models/Product')
const validateProduct = (req, res, next) => {
    const { name, img, price, desc } = req.body;
    const { error } = productSchema.validate({ name, img, price, desc });
    if (error) {
        return res.render('error');
    }
    next();
}

const validateReview = (req, res, next) => {
    const { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment });
    if (error) {
        return res.render('error');
    }
    next();
}

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

const isSeller = (req, res, next) => {
    if (!req.user.role) {

        return res.redirect('/products');
    }
    else if (req.user.role !== 'seller') {
        
        return res.redirect('/products');
    }
    next();
}

const isProductAuthor = async (req, res, next) => {
    let { id } = req.params; //product id
    let product = await Product.findById(id); //entire product
    if (!product.author.equals(req.user._id)) {
        // req.flash('error', 'You are not the authorised user');
        return res.redirect('/products');
    }
    next();
}

module.exports = { validateProduct, validateReview ,isLoggedIn,isProductAuthor};