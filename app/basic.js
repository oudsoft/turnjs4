//basic.js
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

app.use("/", express.static(parentDir + "/samples"));
app.use("/css", express.static(parentDir + "/samples/basic/css"));
app.use("/js", express.static(parentDir + "/samples/basic/js"));
app.use("/pics", express.static(parentDir + "/samples/basic/pics"));
app.use("/pages", express.static(parentDir + "/samples/basic/pages"));

app.get('/view', function(req, res) {
	res.sendFile( parentDir + '/samples/basic/index.html');
})

module.exports = app;