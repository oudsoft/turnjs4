//docs.js
const colors = require('colors/safe');
const util = require("util");
const fs = require('fs');
const path = require('path');
const url = require('url'); 
const request = require('request-promise');
const express = require('express');
const app = express();

const parentDir = path.normalize(__dirname + "/..");

app.use("/extras", express.static(parentDir + "/extras"));
app.use("/lib", express.static(parentDir + "/lib"));

app.use("/css", express.static(parentDir + "/samples/docs/css"));
app.use("/js", express.static(parentDir + "/samples/docs/js"));
app.use("/pics", express.static(parentDir + "/samples/docs/pics"));
app.use("/pages", express.static(parentDir + "/samples/docs/pages"));

app.get('/', function(req, res) {
	res.sendFile( parentDir + '/samples/docs/index.html');
})

module.exports = app;