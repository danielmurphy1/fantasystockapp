const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const axios = require("axios");
require("dotenv").config();

app.use("/", express.static(path.join(__dirname, "client/build")));


app.listen(port, () => {
    console.log(`Listening on port: ${port}.`);
});



