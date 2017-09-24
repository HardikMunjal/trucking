var rightModel = require('../models/rightModel');
var async = require('async');

var Right = {

  fetchAllRight: function(req, res, next) {
   
    var data = {};
    data.limit=100;
    rightModel.fetchAllRight(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }
    	console.log('resrsrsr',result)
      return res.json(result)
      })
  },

  fetchRight: function(req, res, next) {
   
    var data = {};
    data.right_id = req.params.right_id ? req.params.right_id : null;

    rightModel.fetchRight(data,function(err, result){
        if(err && err==='Not Found'){
          var message = "Right Id Not Found"
         return res.status(410).send(message);
         }
        
        else if(err){
          return res.status(410).send(err.message);
        }
         
         return res.json(result);
      })

  },
  createNewRight: function(req, res, next) {
   
    var data = {};
    
    data.Right = req.body;
   
    rightModel.createNewRight(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }
        console.log(result)
        if(!result){
          var message = "Some Error Occurred";
    
          return res.status(400).send(message);
        }
        return res.json("Right added successfully");
    })
  },

  updateRight: function(req, res, next) {
      
   var data={};
   data.c_id = req.params.Right_id ? req.params.Right_id : null;
   data.Right=req.body;
    rightModel.updateRight(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }

        console.log(result)
         return res.json("Right updated successfully");
    })

  },

  deleteRight: function(req, res, next) {
      
   var data={};
   data.c_id = req.params.Right_id ? req.params.Right_id : null;
   rightModel.deleteRight(data,function(err, result){
        if(err){
          return res.status(410).send(err.message);
        }
        console.log(result)
        return res.json("Right deleted successfully");
    })

  }
}
module.exports = Right;