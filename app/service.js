//service.js
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

app.use("/extras", express.static(parentDir + "/extras"));
app.use("/lib", express.static(parentDir + "/lib"));

app.use("/css", express.static(parentDir + "/samples/basic/css"));
app.use("/js", express.static(parentDir + "/samples/basic/js"));
app.use("/pics", express.static(parentDir + "/samples/basic/pics"));
app.use("/pages", express.static(parentDir + "/samples/basic/pages"));

//const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
//const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

const publicVapidKey = 'BLR1KlwGuN0G6p9dGk7dAXXQyntqZzZO0LKcPsh2MNsd79DBcOAR4EDHuJdXHUC1rHhfSRtLXAIXO7N0OioNUjg';
const privateVapidKey = '58J6voJuyaaZCePGauRKqFmsHIOu-2JTMrpXgFBb2Ks';
webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);


app.get('/', function(req, res) {
	console.log(JSON.stringify(req.body));
	res.status(200).json({code: 200});
})

app.post('/registernewroom', (req, res) => {
	console.log(JSON.stringify(req.body));
	res.status(200).json({code: 200});	
});


app.get('/messages', (req, res) => {
	console.log(req.session.id); // => WQ8JaxI5nGAgyXM2IT466_zLm_oRGsTa
	console.log(JSON.stringify(req.body)); // => {"endpoint":"https://fcm.googleapis.com/fcm/send/e8eoejqPMQ8:APA91bFifgREW-rZIfeiq0LA-vcPhcAzzcg6JPzoDIo5-xttjs6XbBRJanHkZnlOkd9_86Ew6xM3YXwARRz974H2ecuB72LZ74LdcrNd2LeqZ6po_H_2xWc7ENzq3TNVaY_ykjYbY_5J","expirationTime":null,"keys":{"p256dh":"BH1-84jK4GWmI5BGzgkjeFH53zOEdfD4fksYcmJYwfsjYVEZPpazsjenfFcc6u9DaxhXQD2K77Of3yKfKwcbNxQ","auth":"6a6P9keTMY794bH0PIOzxA"}}
	const subscription = req.body

	res.status(201).json({});

	const payload = JSON.stringify({
		title: 'Push notifications with Service Workers',
	});

	webPush.sendNotification(subscription, payload).catch(error => console.error(error));
});

app.post('/messages', (req, res) => {
	console.log(JSON.stringify(req.body))
	console.log(req.session.id); // => WQ8JaxI5nGAgyXM2IT466_zLm_oRGsTa
	console.log(JSON.stringify(req.headers['subscription'])); // => {"endpoint":"https://fcm.googleapis.com/fcm/send/e8eoejqPMQ8:APA91bFifgREW-rZIfeiq0LA-vcPhcAzzcg6JPzoDIo5-xttjs6XbBRJanHkZnlOkd9_86Ew6xM3YXwARRz974H2ecuB72LZ74LdcrNd2LeqZ6po_H_2xWc7ENzq3TNVaY_ykjYbY_5J","expirationTime":null,"keys":{"p256dh":"BH1-84jK4GWmI5BGzgkjeFH53zOEdfD4fksYcmJYwfsjYVEZPpazsjenfFcc6u9DaxhXQD2K77Of3yKfKwcbNxQ","auth":"6a6P9keTMY794bH0PIOzxA"}}
	const subscription = req.headers['subscription'];

	res.status(201).json({});

	const payload = JSON.stringify({
		title: req.session.id,
		username: req.body.username,
		msg: req.body.msg
	});

	webPush.sendNotification(subscription, payload).catch(error => console.error(error));
});

app.post('/subscribe', (req, res) => {
	console.log(req.session.id); // => WQ8JaxI5nGAgyXM2IT466_zLm_oRGsTa
	console.log(JSON.stringify(req.body)); // => {"endpoint":"https://fcm.googleapis.com/fcm/send/e8eoejqPMQ8:APA91bFifgREW-rZIfeiq0LA-vcPhcAzzcg6JPzoDIo5-xttjs6XbBRJanHkZnlOkd9_86Ew6xM3YXwARRz974H2ecuB72LZ74LdcrNd2LeqZ6po_H_2xWc7ENzq3TNVaY_ykjYbY_5J","expirationTime":null,"keys":{"p256dh":"BH1-84jK4GWmI5BGzgkjeFH53zOEdfD4fksYcmJYwfsjYVEZPpazsjenfFcc6u9DaxhXQD2K77Of3yKfKwcbNxQ","auth":"6a6P9keTMY794bH0PIOzxA"}}
	const subscription = req.body

	res.status(201).json({});

	const payload = JSON.stringify({
		title: 'Push notifications with Service Workers',
	});

	webPush.sendNotification(subscription, payload).catch(error => console.error(error));
});

module.exports = app;