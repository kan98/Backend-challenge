var Product = require('./schemas/products');

var get_all_products = async function(req) {
    var response = [];
    return Product.find({} , (err, products) => {
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
       return response;
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
        response.product_id = product.product_id;
        response.product_name = product.product_name;
        response.product_type = product.product_type;
        return response;
      }
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
}

var add_product = async function(req) {
  if (req.body.product_id == null
    || req.body.product_name == null
    || req.body.product_type == null) {
  return -1;
  }

  await Product.findOne({ product_id: req.body.product_id })
    .then(profile => {
      if (profile) {
        product_exists = true;
      } else {
        product_exists = false;
      }
    })
    .catch(err => {
      console.log("Error is ", err.message);
  });

  var newProduct = new Product({
    product_id: req.body.product_id,
    product_name: req.body.product_name,
    product_type: req.body.product_type
  });

  if (!product_exists) {
    return await newProduct
      .save()
      .then(() => {
          return true;
      })
      .catch(err => {
          console.log("Error is ", err.message);
          return false;
      });
  } else {
      return false;
  }
}


module.exports = {
    get_all_products: get_all_products,
    get_product: get_product,
    add_product: add_product
};