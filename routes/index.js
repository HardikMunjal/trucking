var error = require('./error');
var usrCtlr = require('../api/controllers/userController');
var serCtlr = require('../api/controllers/serviceController');
var authCtlr = require('../api/controllers/authController');


module.exports = function (app) {


  app.all('*', authCtrl.validateCredential, authCtrl.roleInjector)
  //**************** USER BASED API
  app.get('/trk/user', usrCtlr.fetchUsers);
  app.post('/trk/user/:user_id', usrCtlr.updateUser);
  app.put('/trk/user', usrCtlr.createUser);
  app.delete('/trk/user/:user_id', usrCtlr.deleteUser);

  //**************** SERVICE BASED API
  app.get('/trk/service', serCtlr.fetchUsers);
  app.post('/trk/service/:service_id', serCtlr.updateUser);
  app.put('/trk/service', serCtlr.createUser);
  app.delete('/trk/service/:service_id', serCtlr.deleteUser);

}
