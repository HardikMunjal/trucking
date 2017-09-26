var CoveringAreaModel = require('../models/coveringAreaModel');
var async = require('async');

var CoveringArea = {

  fetchAllCoveringArea: function(req, res, next) {
   
    var data = {};
    data.limit=100;
    CoveringAreaModel.fetchAllCoveringArea(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }
    	console.log('resrsrsr',result)
      return res.json(result)
      })
  },

  fetchCoveringArea: function(req, res, next) {
   
    var data = {};
    data.coveringArea_id = req.params.coveringArea_id ? req.params.coveringArea_id : null;

    CoveringAreaModel.fetchCoveringArea(data,function(err, result){
        if(err && err==='Not Found'){
          var message = "CoveringArea Id Not Found"
         return res.status(410).send(message);
         }
        
        else if(err){
          return res.status(410).send(err.message);
        }
         
         return res.json(result);
      })

  },
  createNewCoveringArea: function(req, res, next) {
   
    var data = {};
    
    data.CoveringArea = req.body;
   
    CoveringAreaModel.createNewCoveringArea(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }
        console.log(result)
        if(!result){
          var message = "Some Error Occurred";
    
          return res.status(400).send(message);
        }
        return res.json("CoveringArea added successfully");
    })
  },

  updateCoveringArea: function(req, res, next) {
      
   var data={};
   data.c_id = req.params.CoveringArea_id ? req.params.CoveringArea_id : null;
   data.CoveringArea=req.body;
    CoveringAreaModel.updateCoveringArea(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }

        console.log(result)
         return res.json("CoveringArea updated successfully");
    })

  },

  deleteCoveringArea: function(req, res, next) {
      
   var data={};
   data.c_id = req.params.CoveringArea_id ? req.params.CoveringArea_id : null;
   CoveringAreaModel.deleteCoveringArea(data,function(err, result){
        if(err){
          return res.status(410).send(err.message);
        }
        console.log(result)
        return res.json("CoveringArea deleted successfully");
    })

  }
}
module.exports = CoveringArea;