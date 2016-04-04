var mongoose = require('mongoose');

// define the Product schema
var productSchema = new mongoose.Schema({
   name: {
       type: String,
       default: '',
       required: 'Name cannot be blank'
   },
    Type: {
        type: String,
        default: '',
        trim: true,
        required: 'Type cannot be blank'
    },
    color: {
        type: String,
        default: '',
        required: 'Color cannot be blank'
    }
});

// public
module.exports = mongoose.model('products', productSchema);