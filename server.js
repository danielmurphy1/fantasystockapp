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



{
    "name": "client",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
      "@testing-library/jest-dom": "^5.11.9",
      "@testing-library/react": "^11.2.5",
      "@testing-library/user-event": "^12.7.0",
      "cra-build-watch": "^3.4.0",
      "react": "^17.0.1",
      "react-dom": "^17.0.1",
      "react-scripts": "4.0.2",
      "web-vitals": "^1.1.0"
    },
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject",
      "watch": "cra-build-watch"
    },
    "eslintConfig": {
      "extends": [
        "react-app",
        "react-app/jest"
      ]
    },
    "browserslist": {
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ],
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    }
  }