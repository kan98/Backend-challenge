var express = require("express");
var mongoose = require("mongoose");

var User = require('./models/users');
var Product = require('./models/products');
var db = require("./db_setup").myurl;

var express = require('express');
var app = express();
var port = 3000;

app.use(express.json())

mongoose
  .connect(db)
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log("Error is ", err.message);
  });

app.get('/',(req,res)=>{
   res.status(200).send(`Hi Welcome to the Login and Signup API`);
});

app.post("/signup", async (req, res) => {
   var newUser = new User({
     name: req.body.name,
     email: req.body.email,
     password: req.body.password,
     member_type: "standard"
   });
   await newUser
     .save()
     .then(() => {
       res.status(200).send(newUser);
     })
     .catch(err => {
       console.log("Error is ", err.message);
     });
});

app.post("/login", async (req, res) => {
   var loginAttempt = {};
   loginAttempt.email = req.body.email;
   loginAttempt.password = req.body.password;
 
   await User.findOne({ email: loginAttempt.email })
     .then(profile => {
       if (!profile || profile.password != loginAttempt.password) {
         res.send("Login failed: Wrong email and password combination.");
       } else {
           res.send("Login Success!");
       }
     })
     .catch(err => {
       console.log("Error is ", err.message);
     });
});

app.post("/get-profile", async (req, res) => {
   var loginAttempt = {};
   loginAttempt.email = req.body.email;
   loginAttempt.password = req.body.password;
 
   await User.findOne({ email: loginAttempt.email })
     .then(profile => {
       if (!profile || profile.password != loginAttempt.password) {
         res.send("Login failed: Wrong email and password combination.");
       } else {
            response = new Object()
            response.name = profile.name;
            response.email = profile.email; 
            response.member_type = profile.member_type;
            res.send(JSON.stringify(response));
       }
     })
     .catch(err => {
       console.log("Error is ", err.message);
     });
});

app.post("/purchase-history", async (req, res) => {
   var loginAttempt = {};
   loginAttempt.email = req.body.email;
   loginAttempt.password = req.body.password;
 
   await User.findOne({ email: loginAttempt.email })
     .then(profile => {
       if (!profile || profile.password != loginAttempt.password) {
         res.send("Login failed: Wrong email and password combination.");
       } else {
            var response = [];
            profile.purchases.forEach(function(purchase){
               var product = Product.findOne({ product_id: purchase.product_id });

               object = new Object()
               object.product_id = purchase.product_id;
               object.product_name = product.product_name;
               object.product_type = product.product_type;
               object.purchase_quantity = purchase.purchase_quantity;
               object.purchase_date = purchase.purchase_date;
               response.push(object);
            });
            res.send(JSON.stringify(response));
       }
     })
     .catch(err => {
       console.log("Error is ", err.message);
     });
});

app.get("/products", async (req, res) => {
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
   });
   res.send(JSON.stringify(response));
});

app.post("/product", async (req, res) => {
   await Product.findOne({ product_id: req.body.product_id })
     .then(product => {
       if (!product) {
         res.send("No product found by ID.");
       } else {
         response = new Object()
         response.product_id = purchase.product_id;
         response.product_name = product.product_name;
         response.product_type = product.product_type;
         res.send(JSON.stringify(response));
       }
     })
     .catch(err => {
       console.log("Error is ", err.message);
     });
});

app.listen(port,()=>{
   console.log(`Server is listening on port ${port}`)
});