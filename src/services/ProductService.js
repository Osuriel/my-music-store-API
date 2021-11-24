const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

const fetchAllProducts = (req, res) => 
Product.find().then(allProducts =>
    res.send(allProducts)
  ).catch(error => {
    console.log('error fetching products from db');
  })

const ProductService = {
  fetchAllProducts, 
}

module.exports = ProductService