const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const request = require('request');
const colors = require('colors');
const cors_sec = require('./routes/corsheaders')
const mongoose = require('mongoose');
var xlsxj = require("xlsx-to-json");
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/trucking');
var orderModel = require('./api/models/orderModel');
var customerModel = require('./api/models/customerModel');
var userModel = require('./api/models/userModel');

const http = require('http').Server(app);


// Middlewares for HTTP Request and cors handlers
app.use('/', cors_sec.CrossOriginHeaders);


app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.bodyParser({ keepExtensions: true, uploadDir: '/uploads' }));
app.use(bodyParser.json({ 
 	limit: '10mb'
    })); 
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



//************************************ BULK UPLOAD FUNCTIONALITY ************************************
  var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });
    var upload = multer({ //multer settings
                    storage: storage,
                    fileFilter : function(req, file, callback) { //file filter
                        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                            return callback(new Error('Wrong extension type'));
                        }
                        callback(null, true);
                    }
                }).any();

    var fileHandler;
    /** API path that will upload the files */
    app.post('/upload', function(req, res) {

        
        var exceltojson;
        var imported_filename;
        upload(req,res,function(err){
            if(err){
                 console.log(err)
                 res.json({error_code:101,err_desc:err});
                 return;
            }
            console.log('number of files',req.files[0]);

            imported_filename = req.files[0].originalname;



            fileHandler=req.files[0];
            /** Multer gives us file info in req.file object */

            if(!fileHandler){
                res.json({error_code:1,err_desc:"No file passed"});
                return;
            }
            /** Check the extension of the incoming file and 
             *  use the appropriate module
             */
            if(fileHandler.originalname.split('.')[fileHandler.originalname.split('.').length-1] === 'xlsx'){
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            try {
             
         
            exceltojson({
                    input: fileHandler.path, //the same path where we uploaded our file
                    output: null, //since we don't need output.json
                    lowerCaseHeaders:true,
                    sheet: "YOBEL_SCM"


            
          }, function(err, result) {
            if(err) {
              console.error(err);
            }else {
              var bulkOrders=[];
              var orderB={};
              console.log(result)
              result.forEach(function(order, index) {

                orderB.order_num=order.pedido;
                orderB.client_name=order.cliente;
                orderB.client_id=order.coc_cli;
                orderB.product_id=order.producto;
                orderB.qty= order.cantidad;
                orderB.imported_filename = imported_filename;

                if(orderB.order_num && orderB.product_id){
                  bulkOrders.push(orderB);
                }
                
                orderB={};
              });
              var data ={};
              data.raw= bulkOrders;
              
              orderModel.createNewBulkOrders(data,function(err, result){

                  if(result){
                    console.log(result)
                    return res.json("Orders added successfully");
                  }else{
                    return res.json(err);
                  }

                })
              //res.json(bulkOrders);
            }
          }); 
            } catch (e){
                res.json({error_code:1,err_desc:"Corupted excel file"});
            }
        })
    }); 


    app.post('/upload/customer', function(req, res) {

        
        var exceltojson;
        upload(req,res,function(err){
            if(err){
                 console.log(err)
                 res.json({error_code:101,err_desc:err});
                 return;
            }
            console.log('number of files',req.files[0])

            fileHandler=req.files[0];
            /** Multer gives us file info in req.file object */

            if(!fileHandler){
                res.json({error_code:1,err_desc:"No file passed"});
                return;
            }
            /** Check the extension of the incoming file and 
             *  use the appropriate module
             */
            if(fileHandler.originalname.split('.')[fileHandler.originalname.split('.').length-1] === 'xlsx'){
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            try {
             
         
            exceltojson({
                    input: fileHandler.path, //the same path where we uploaded our file
                    output: null, //since we don't need output.json
                    lowerCaseHeaders:true,
                    sheet: "MASTER CUSTOMER BPCS"
            
          }, function(err, result) {
            if(err) {
              console.error(err);
            }else {
              var bulkCustomers=[];
              var customerB={};
              console.log(result)
              
              result.forEach(function(customer, index) {

              if(customer.customer){

                customerB.name=customer['customer name'];
                customerB.country=customer['country'];
               // customerB.city=order.coc_cli;
                customerB.address=customer['address'];
                customerB.industry= customer['industry'];
                customerB.telephone1= customer['telephone1'];
                customerB.postal_code= customer['postal code'];
                bulkCustomers.push(customerB);
                customerB={};
               }
              });
              //return res.json(bulkCustomers)
              var data ={};
              data.raw= bulkCustomers;
              
              customerModel.createNewBulkCustomers(data,function(err, result){

                  if(result){
                    console.log(result)
                    return res.json("Customers added successfully");
                  }else{
                    return res.json(err);
                  }
                })
              //res.json(bulkOrders);
            }
          }); 
            } catch (e){
                res.json({error_code:1,err_desc:"Corupted excel file"});
            }
        })
    }); 

     app.post('/upload/user', function(req, res) {

        
        var exceltojson;
        upload(req,res,function(err){
            if(err){
                 console.log(err)
                 res.json({error_code:101,err_desc:err});
                 return;
            }
            console.log('number of files',req.files[0])

            fileHandler=req.files[0];
            /** Multer gives us file info in req.file object */

            if(!fileHandler){
                res.json({error_code:1,err_desc:"No file passed"});
                return;
            }
            /** Check the extension of the incoming file and 
             *  use the appropriate module
             */
            if(fileHandler.originalname.split('.')[fileHandler.originalname.split('.').length-1] === 'xlsx'){
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            try {
             
         
            exceltojson({
                    input: fileHandler.path, //the same path where we uploaded our file
                    output: null, //since we don't need output.json
                    lowerCaseHeaders:true,
                    sheet: "Clientes Retail"
            
          }, function(err, result) {
            if(err) {
              console.error(err);
            }else {
              var bulkUsers=[];
              var userB={};
              console.log(result)
             // return res.json(result)
              
              result.forEach(function(user, index) {

              if(user.cod_consultora){

                userB.fullname=user['nombre'];
                userB.password='exo#123';
               // customerB.city=order.coc_cli;
                userB.user_id=user['cod_consultora'];
                userB.industry= user['industry'];
                userB.telephones= [{"number": "4",
                "type": "mobile"}];
                userB.email= user['cod_consultora']+'exo.com';
                userB.telephones[0].number=user['telefono'];
                bulkUsers.push(userB);
                userB={};
               }
              });
              //return res.json(bulkCustomers)
              var data ={};
              data.raw= bulkUsers;
              
              userModel.createNewBulkUsers(data,function(err, result){

                  if(result){
                    console.log(result)
                    return res.json("Users added successfully");
                  }else{
                    return res.json(err);
                  }
                })
              //res.json(bulkOrders);
            }
          }); 
            } catch (e){
                res.json({error_code:1,err_desc:"Corupted excel file"});
            }
        })
    }); 


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




 

  
   