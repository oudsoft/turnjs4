//basic.js
const colors = require('colors/safe');
const util = require("util");
const fs = require('fs');
const path = require('path');
const url = require('url'); 
const request = require('request-promise');
const express = require('express');
const app = express();
const webPush = require('web-push');

const parentDir = path.normalize(__dirname + "/..");

//const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
//const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

const publicVapidKey = 'BLR1KlwGuN0G6p9dGk7dAXXQyntqZzZO0LKcPsh2MNsd79DBcOAR4EDHuJdXHUC1rHhfSRtLXAIXO7N0OioNUjg';
const privateVapidKey = '58J6voJuyaaZCePGauRKqFmsHIOu-2JTMrpXgFBb2Ks';
webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);

app.use("/", express.static(parentDir + "/samples/basic"));
app.use("/css", express.static(parentDir + "/samples/basic/css"));
app.use("/js", express.static(parentDir + "/samples/basic/js"));
app.use("/pics", express.static(parentDir + "/samples/basic/pics"));
app.use("/pages", express.static(parentDir + "/samples/basic/pages"));

app.get('/view', function(req, res) {
	res.sendFile( parentDir + '/samples/basic/index.html');
})

app.post('/subscribe', (req, res) => {
	console.log(JSON.stringify(req.body));
	const subscription = req.body

	res.status(201).json({});

	const payload = JSON.stringify({
		title: 'Push notifications with Service Workers',
	});

	webPush.sendNotification(subscription, payload).catch(error => console.error(error));
});

module.exports = app;