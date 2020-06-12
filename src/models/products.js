const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    product_id:{
        type:Number,
        require:true
    },
        product_name:{
        type:String,
        require:true
    },
        product_type:{
        type:String,
        require:true
    },
});

module.exports = Product = mongoose.model('ProductSchema',ProductSchema);