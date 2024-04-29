//from tutorial
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
//until here
const app = require("./app");
const withDB = require("./db");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

// ℹ️ Connects to the database
/*withDB(() => {
  // ℹ️ If connection was successful, start listening for requests
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});*/
//connect to db on mongodb atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
