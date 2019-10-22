//service.js
const colors = require('colors/safe');
const util = require("util");
const fs = require('fs');
const path = require('path');
const url = require('url'); 
const request = require('request-promise');
const express = require('express');
const app = express();

const parentDir = path.normalize(__dirname + "/..");

app.use("/css", express.static(parentDir + "/samples/basic/css"));
app.use("/js", express.static(parentDir + "/samples/basic/js"));
app.use("/pics", express.static(parentDir + "/samples/basic/pics"));
app.use("/pages", express.static(parentDir + "/samples/basic/pages"));

app.get('/', function(req, res) {
	res.sendFile( parentDir + '/samples/basic/index.html');
})

module.exports = app;