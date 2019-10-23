//stevejobs.js
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

app.use("/samples", express.static(parentDir + "/samples"));
app.use("/css", express.static(parentDir + "/samples/steve-jobs/css"));
app.use("/js", express.static(parentDir + "/samples/steve-jobs/js"));
app.use("/pics", express.static(parentDir + "/samples/steve-jobs/pics"));
app.use("/pages", express.static(parentDir + "/samples/steve-jobs/pages"));
app.use("/fonts", express.static(parentDir + "/samples/steve-jobs/fonts"));

app.get('/view', function(req, res) {
	res.sendFile( parentDir + '/samples/steve-jobs/index.html');
});

module.exports = app;