//turnjs4.js
const colors = require('colors/safe');
const util = require("util");
const fs = require('fs');

var express = require('express');
var app = express();

/**
 * Express Validator Middleware for Form Validation
 */

const { check, validationResult } = require('express-validator');
/* Fixed expressValidator By
https://stackoverflow.com/questions/56733975/express-validator-error-expressvalidator-is-not-a-function
*/


/**
 * body-parser module is used to read HTTP POST data
 * it's an express middleware that reads form's input 
 * and store it as javascript object
 */
var bodyParser = require('body-parser');
/**
 * bodyParser.urlencoded() parses the text as URL encoded data 
 * (which is how browsers tend to send form data from regular forms set to POST) 
 * and exposes the resulting object (containing the keys and values) on req.body.
 */
app.use(bodyParser.urlencoded({
    limit: '50mb', extended: true
}));
app.use(bodyParser.json({
	limit: '50mb', extended: true
}));

/**
 * This module let us use HTTP verbs such as PUT or DELETE 
 * in places where they are not supported
 */
var methodOverride = require('method-override');

/**
 * using custom logic to override method
 * 
 * there are other ways of overriding as well
 * like using header & using query value
 */
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}))

/**
 * This module shows flash messages
 * generally used to show success or error messages
 * 
 * Flash messages are stored in session
 * So, we also have to install and use 
 * cookie-parser & session modules
 */
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'))
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
        secure: false
    }
}))
app.use(flash());


app.use("/extras", express.static(__dirname + "/extras"));
app.use("/lib", express.static(__dirname + "/lib"));

//var index = require('./app/index.js');
var basic = require('./app/basic.js');
var docs = require('./app/docs.js');
var stevejobs = require('./app/stevejobs.js');
var service = require('./app/service.js');

//app.use('/', index);
app.use('/docs', docs);
app.use('/basic', basic);
app.use('/stevejobs', stevejobs);
app.use('/service', service);

const server = app.listen(7328, "localhost", function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log(colors.green(`Server running at ${host}:${port}`));
})

/*
Dont use port 80, run on other port like 8080 and redirect 80 to that port with this command
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
https://stackoverflow.com/questions/44911171/running-node-app-via-pm2-on-port-80
*/