var User = require('./schemas/users');
var Product = require('./schemas/products');

var get_profile = async function(req) {
    return await User.findOne({ email: req.body.email })
        .then(profile => {
           response = new Object()
           response.name = profile.name;
           response.email = profile.email; 
           response.member_type = profile.member_type;
           return response;;
    })
}

var purchase_history = async function(req) {
    return await User.findOne({ email: req.body.email })
        .then(profile => {
            var response = [];
            profile.purchases.forEach(function(purchase) {
               var product = Product.findOne({ product_id: purchase.product_id });

               object = new Object()
               object.product_id = purchase.product_id;
               object.product_name = product.product_name;
               object.product_type = product.product_type;
               object.purchase_quantity = purchase.purchase_quantity;
               object.purchase_date = purchase.purchase_date;
               response.push(object);
            })
    })
}

module.exports = {
    get_profile: get_profile,
    purchase_history: purchase_history
};
