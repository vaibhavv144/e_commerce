const mongoose = require('mongoose');
const Product = require('./Models/Product');

const data = [
    {
        name: 'POCO C51',
        img: "https://m.media-amazon.com/images/I/41lois+jAAL._SY300_SX300_.jpg",
        price: "₹ 5,900",
        desc: "Royal Blue, 6GB RAM, 128GB Storage"
    },
    {
        name: "OnePlus 12",
        img: "https://m.media-amazon.com/images/I/717Qo4MH97L._SX679_.jpg",
        price: "₹ 64,999",
        desc: "Flowy Emerald, 12 GB RAM, 256GB"
    },
    {
        name: "OnePlus Nord CE 3 5G",
        img: "https://m.media-amazon.com/images/I/6175SlKKECL._SX679_.jpg",
        price: "₹ 27,999",
        desc: "Aqua Surge, 12GB RAM, 256GB Storage"
    },
    {
        name: "Realme narzo N55 ",
        img: "https://m.media-amazon.com/images/I/81ogvU1j6qL._SX679_.jpg",
        price: "₹ 8,999",
        desc: "Prime Black, 6GB+128GB) 33W Segment Fastest Charging"
    },
    {
        name: "iQOO Z7 Pro 5G",
        img: "https://m.media-amazon.com/images/I/61Id6WJDWqL._SX679_.jpg",
        price: "₹ 24,999",
        desc: "Blue Lagoon, 8GB RAM, 256GB Storage) | 3D Curved AMOLED Display"
    },
    {
        name: "Oneplus Open",
        img: "https://m.media-amazon.com/images/I/51LByp9EsxL._SX300_SY300_QL70_FMwebp_.jpg",
        price: "₹ 1,39,999",
        desc: "Emerald Dusk, 16GB RAM, 512GB Storage"
    }
]
async function seedDB() {
    await Product.insertMany(data);
    console.log('data seeded');
}

module.exports = seedDB;
