const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/ForumApp")
  .then(() => console.log("Established a connection to the database"))
  .catch((err) => console.log("Soemthing went wrong", err));
