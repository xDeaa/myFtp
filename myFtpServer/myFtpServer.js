const express = require("express");
const bodyParser = require("body-parser");
const api = express();

const port = parseInt(process.argv[2],10) || 5000;

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

api.listen(port,() => {
    console.log(`Server is running on port ${port} ... `);
  })