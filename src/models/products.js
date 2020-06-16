var Product = require('./schemas/products');

var get_all_products = async function(req) {
    var response = [];
    Product.find({} , (err, products) => {
       if(err) {
          console.log("Error is ", err.message);
       }
 
       products.map(product => {
          object = new Object()
          object.product_id = product.product_id;
          object.product_id = product.product_id;
          object.product_name = product.product_name;
          response.push(object);
       })
       return products;
    });
}

var get_product = async function(req) {
    if (req.body.product_id == null) {
    return -1;
    }

    return await Product.findOne({ product_id: req.body.product_id })
    .then(product => {
      if (!product) {
        return false;
      } else {
        response = new Object()
        response.product_id = purchase.product_id;
        response.product_name = product.product_name;
        response.product_type = product.product_type;
        return response;
      }
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
}


module.exports = {
    get_all_products: get_all_products,
    get_product: get_product
};