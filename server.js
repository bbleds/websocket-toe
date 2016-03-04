"use strict";

// -------- Dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// -------- Middleware
app.use(express.static("public"));



app.get("/", (request, response) => {
    response.sendFile("index.html");
});

app.listen(PORT, () => {
  console.log("We are listening ");
});


// app.get("/", (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
