var error = require('./error');
var usrCtlr = require('../api/controllers/userController');
var srvcCtlr = require('../api/controllers/serviceController');
var loadCtlr = require('../api/controllers/loadController');
var cstmrCtlr = require('../api/controllers/customerController');
var authCtlr = require('../api/controllers/authController');
var roleCtlr = require('../api/controllers/roleController');
var rightCtlr = require('../api/controllers/rightController');
var areaCtlr = require('../api/controllers/coveringAreaController');
var teamCtlr = require('../api/controllers/teamController');
var roleRightCtlr = require('../api/controllers/roleRightController');

module.exports = function (app) {


    app.post('/authenticate', authCtlr.validateCredential)//, authCtrl.roleInjector)

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


  //************* ROLE BASED API
     app.get('/trk/role', roleCtlr.fetchAllRole);
     app.get('/trk/role/:role_id', roleCtlr.fetchRole);
     app.post('/trk/role', roleCtlr.createNewRole);
     app.post('/trk/role/:role_id', roleCtlr.updateRole);
     app.delete('/trk/role/:role_id',roleCtlr.deleteRole);

  //************** ROLE-RIGHTS BASED API
     app.get('/trk/role-rights', roleRightCtlr.fetchAllRoleRight);

  //************** TEAM BASED API
     app.get('/trk/team', teamCtlr.fetchAllTeam);
     app.get('/trk/team/:team_id', teamCtlr.fetchTeam);
     app.post('/trk/team', teamCtlr.createNewTeam);
     app.post('/trk/team/:team_id', teamCtlr.updateTeam);
     app.delete('/trk/team/:team_id',teamCtlr.deleteTeam);


     //**************** COVERING AREA BASED API
     app.get('/trk/area', areaCtlr.fetchAllCoveringArea);
     app.get('/trk/area/:coveringArea_id', areaCtlr.fetchCoveringArea);
     app.post('/trk/area', areaCtlr.createNewCoveringArea);
     app.post('/trk/area/:coveringArea_id', areaCtlr.updateCoveringArea);
     app.delete('/trk/area/:coveringArea_id',areaCtlr.deleteCoveringArea);

}
