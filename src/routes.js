var express = require("express");

var authentication = require('./models/authentication');
var user_management = require('./models/user_management');
var products = require('./models/products');

var port = 3000;
var app = express();
app.use(express.json());


module.exports = [
    app.get('/',(req,res)=>{
        res.status(200).send(`Hi, Welcome to the API.`);
    }),
     
    app.post("/signup", async (req, res) => {
      var signup = await authentication.signup(req);
      if (signup === -1) {
        res.status(400).send("Signup failed: Please check your request body.");
      } else if (signup) {
        res.status(200).send("Singup Success!");
      } else {
          res.status(400).send("Signup failed: Please try again.");
      }
    }),
     
    app.post("/login", async (req, res) => {
      var login = await authentication.login(req);
      if (login === -1) {
        res.status(400).send("Authentication failed: Please check your request body.");
      } else if (login) {
        res.status(200).send("Login Success!");
      } else {
        res.status(400).send("Authentication failed: Wrong email and password combination.");
      }
    }),
     
    app.post("/get-profile", async (req, res) => {
      var login = await authentication.login(req);
      if (login === -1) {
        res.status(400).send("Authentication failed: Please check your request body.");
      } else if (login) {
        response = await user_management.get_profile(req);
        res.status(200).send(JSON.stringify(response));
      } else {
        res.status(400).send("Authentication failed: Wrong email and password combination.");
      }
    }),
     
     app.post("/purchase-history", async (req, res) => {
        var login = await authentication.login(req);
        if (login === -1) {
          res.status(400).send("Authentication failed: Please check your request body.");
        } else if (login) {
          response = await user_management.purchase_history(req);
          res.status(200).send(JSON.stringify(response));
        } else {
          res.status(400).send("Authentication failed: Wrong email and password combination.");
        }
     }),
     
    app.get("/products", async (req, res) => {
      response = await products.get_all_products(req);
      res.status(200).send(JSON.stringify(response));
    }),
     
    app.post("/product", async (req, res) => {
      response = await products.get_product(req);
      if (response === -1) {
        res.status(400).send("Error: Please check your request body.");
      } else if (response) {
        res.status(200).send(JSON.stringify(response));
      } else {
        res.status(400).send("No product found by ID.");
      }
    })
];

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
 });