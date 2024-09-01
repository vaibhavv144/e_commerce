const express = require('express');
const router = express.Router();
const Review = require('../Models/Review');
const Product = require('../Models/Product');
const { validateReview } = require('../middleware');


router.post('/products/:id/review', validateReview, async (req, res) => {
    try {
        let { id } = req.params;
        let { rating, comment } = req.body;
        const product = await Product.findById(id);
        const review = new Review({ rating, comment });
        product.reviews.push(review);
        await product.save();
        await review.save();
        res.redirect(`/products/${id}`);
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }
})

module.exports = router;