var mongoose = require("mongoose");
var db = require("./db_setup").myurl;

require("./routes");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log("Error is ", err.message);
  });