const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const request = require('request');
const colors = require('colors');
const cors_sec = require('./routes/corsheaders')
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/trucking');

const http = require('http').Server(app);


// Middlewares for HTTP Request and cors handlers
app.use('/', cors_sec.CrossOriginHeaders);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ 
 	limit: '10mb'
    })); 
app.use(cookieParser());
app.use(router);
require('./routes')(router);



process.on('uncaughtException', function(err,req,res) {
  console.log('Caught unhandled exception: ' + err);
  //process.exit(1);
  });

const server = http.listen(8008, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s'.underline.red, host, port);
});

