const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');
const { validateProduct, isLoggedIn, isProductAuthor } = require('../middleware');
router.get('/products', isLoggedIn, async (req, res) => {
        try {
                const products = await Product.find();
                res.render('products/index', { products });
        }
        catch (e) {
                res.status(500).render('error', { err: e.message });
        }
})

router.get('/product/new', isLoggedIn, (req, res) => {
        try {
                res.render('products/new');
        }
        catch (e) {
                res.status(500).render('error', { err: e.message });
        }

})

router.post('/products', isLoggedIn, validateProduct, async (req, res) => {
        try {
                const { name, img, price, desc } = req.body;
                const newProduct = await Product.create({ name, img, price, desc, author: req.user._id });
                res.redirect('/products');
        }
        catch (e) {
                res.status(500).render('error', { err: e.message });
        }

})

router.get('/products/:id', isLoggedIn, async (req, res) => {

        try {
                const { id } = req.params;
                const foundProduct = await Product.findById(id).populate('reviews');
                res.render('products/show', { foundProduct });
        }
        catch (e) {
                res.status(500).render('error', { err: e.message });
        }

})

router.get('/products/:id/edit', isLoggedIn, async (req, res) => {

        try {
                const { id } = req.params;
                const foundProduct = await Product.findById(id);
                res.render('products/edit', { foundProduct });
        }
        catch (e) {
                res.status(500).render('error', { err: e.message });
        }

})

router.patch('/products/:id', isLoggedIn, validateProduct, async (req, res) => {
        try {
                const { id } = req.params;
                const { name, price, img, desc } = req.body;
                await Product.findByIdAndUpdate(id, { name, img, price, desc });
                res.redirect('/products');
        }
        catch (e) {
                res.status(500).render('error', { err: e.message });
        }

})



router.delete('/products/:id', isLoggedIn, isProductAuthor, async (req, res) => {

        try {
                let { id } = req.params;
                const product = await Product.findById(id);
                await Product.findByIdAndDelete(id);
                res.redirect('/products');
        }
        catch (e) {
                res.status(500).render('error', { err: e.message });
        }

})
module.exports = router;