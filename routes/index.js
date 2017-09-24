var error = require('./error');
var usrCtlr = require('../api/controllers/userController');
var srvcCtlr = require('../api/controllers/serviceController');
var loadCtlr = require('../api/controllers/loadController');
var cstmrCtlr = require('../api/controllers/customerController');
var authCtlr = require('../api/controllers/authController');
var roleCtlr = require('../api/controllers/roleController');
var rightCtlr = require('../api/controllers/rightController');


module.exports = function (app) {


  //app.all('*', authCtrl.validateCredential, authCtrl.roleInjector)
  //**************** USER BASED API
    app.get('/trk/user', usrCtlr.fetchAllUser);
    app.get('/trk/user/:user_id', usrCtlr.fetchUser);
    app.post('/trk/user', usrCtlr.createNewUser);
    app.post('/trk/user/:user_id', usrCtlr.updateUser);
    app.delete('/trk/user/:user_id',usrCtlr.deleteUser);

  //**************** SERVICE BASED API
    app.get('/trk/service', srvcCtlr.fetchAllService);
    app.get('/trk/service/:service_id', srvcCtlr.fetchService);
    app.post('/trk/service', srvcCtlr.createNewService);
    app.post('/trk/service/:service_id', srvcCtlr.updateService);
    app.delete('/trk/service/:service_id',srvcCtlr.deleteService);

    //  //**************** LOAD BASED API
    app.get('/trk/load', loadCtlr.fetchAllLoad);
    app.get('/trk/load/:load_id', loadCtlr.fetchLoad);
    app.post('/trk/load', loadCtlr.createNewLoad);
    app.post('/trk/load/:load_id', loadCtlr.updateLoad);
    app.delete('/trk/load/:load_id',loadCtlr.deleteLoad);

    //**************** CUSTOMER BASED API
     app.get('/trk/customer', cstmrCtlr.fetchAllCustomer);
     app.get('/trk/customer/:customer_id', cstmrCtlr.fetchCustomer);
     app.post('/trk/customer', cstmrCtlr.createNewCustomer);
     app.post('/trk/customer/:customer_id', cstmrCtlr.updateCustomer);
     app.delete('/trk/customer/:customer_id',cstmrCtlr.deleteCustomer);
  // app.put('/trk/service', serCtlr.createUser);
  // app.delete('/trk/service/:service_id', serCtlr.deleteUser);

  //**************** RIGHT BASED API
     app.get('/trk/right', rightCtlr.fetchAllRight);
     app.get('/trk/right/:right_id', rightCtlr.fetchRight);
     app.post('/trk/right', rightCtlr.createNewRight);
     app.post('/trk/right/:right_id', rightCtlr.updateRight);
     app.delete('/trk/right/:right_id',rightCtlr.deleteRight);


     app.post('/trk/role', roleCtlr.createNewRole);

}
