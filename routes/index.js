var error = require('./error');
var userInfo = require('./userInfo');

module.exports = function (app) {

  app.post('/create/user', team.createUser);
}
