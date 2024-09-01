const mongoose = require('mongoose');
const Review=require('./Review')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String,
        required: true,
        trim:true
    },
    price: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required:true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

productSchema.post('findOneAndDelete', async function (product) {
    if (product.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: product.reviews } })
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;