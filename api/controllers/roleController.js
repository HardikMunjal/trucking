var roleModel = require('../models/roleModel');
var async = require('async');

var role = {

  fetchAllRole: function(req, res, next) {
   
    var data = {};
    data.limit=100;
    roleModel.fetchAllRole(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }
    	console.log('resrsrsr',result)
      return res.json(result)
      })
  },




  fetchRole: function(req, res, next) {
   
    var data = {};
    data.role_id = req.params.role_id ? req.params.role_id : null;

    roleModel.fetchRole(data,function(err, result){
        if(err && err==='Not Found'){
          var message = "role Id Not Found"
         return res.status(410).send(message);
         }
        
        else if(err){
          return res.status(410).send(err.message);
        }
         
         return res.json(result);
      })

  },
  createNewRole: function(req, res, next) {
   
    var data = {};
    
    data.role = req.body;
   
    roleModel.createNewRole(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }
        console.log(result)
        if(!result){
          var message = "Some Error Occurred";
    
          return res.status(400).send(message);
        }
        return res.json("role added successfully");
    })
  },

  updateRole: function(req, res, next) {
      
   var data={};
   data.r_id = req.params.role_id ? req.params.role_id : null;
   data.role=req.body;
    roleModel.updateRole(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }

        console.log(result)
         return res.json("role updated successfully");
    })

  },

  deleteRole: function(req, res, next) {
      
   var data={};
   data.r_id = req.params.role_id ? req.params.role_id : null;
   roleModel.deleteRole(data,function(err, result){
        if(err){
          return res.status(410).send(err.message);
        }
        console.log(result)
        return res.json("role deleted successfully");
    })

  }
}
module.exports = role;