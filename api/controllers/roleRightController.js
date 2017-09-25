var roleRightModel = require('../models/roleRightModel');
var async = require('async');

var roleRight = {

  fetchAllRoleRight: function(req, res, next) {
   
    var data = {};
    data.limit=100;
    roleRightModel.fetchAllRoleRight(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }
    	console.log('resrsrsr',result)
      return res.json(result)
      })
  }
}
module.exports = roleRight;