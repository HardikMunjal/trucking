var error = require('./error');
var usrCtlr = require('../api/controllers/userController');
var serCtlr = require('../api/controllers/serviceController');
var cstmrCtlr = require('../api/controllers/customerController');
var authCtlr = require('../api/controllers/authController');


module.exports = function (app) {


  //app.all('*', authCtrl.validateCredential, authCtrl.roleInjector)
  //**************** USER BASED API
    app.get('/trk/user', usrCtlr.fetchAllUser);
    app.get('/trk/user/:user_id', usrCtlr.fetchUser);
    app.post('/trk/user', usrCtlr.createNewUser);
    app.post('/trk//:user_id', usrCtlr.updateUser);
    app.delete('/trk/user/:user_id',usrCtlr.deleteUser);

  //**************** SERVICE BASED API
  // app.get('/trk/service', serCtlr.fetchUsers);
  // app.post('/trk/service/:service_id', serCtlr.updateUser);
  // app.put('/trk/service', serCtlr.createUser);
  // app.delete('/trk/service/:service_id', serCtlr.deleteUser);

    //**************** CUSTOMER BASED API
     app.get('/trk/customer', cstmrCtlr.fetchAllCustomer);
     app.get('/trk/customer/:customer_id', cstmrCtlr.fetchCustomer);
     app.post('/trk/customer', cstmrCtlr.createNewCustomer);
     app.post('/trk/customer/:customer_id', cstmrCtlr.updateCustomer);
     app.delete('/trk/customer/:customer_id',cstmrCtlr.deleteCustomer);
  // app.put('/trk/service', serCtlr.createUser);
  // app.delete('/trk/service/:service_id', serCtlr.deleteUser);

}
