var srvcModel = require('../models/serviceModel');

var service = {

  fetchAllService: function(req, res, next) {
   
    var data = {};
    data.limit=100;
    srvcModel.fetchAllService(data,function(err, result){
    	console.log('resrsrsr',result)
         return res.json(result)
      })
  },

  fetchService: function(req, res, next) {
   
    var data = {};
    data.s_id = req.params.service_id ? req.params.service_id : null;

    srvcModel.fetchService(data,function(err, result){
        if(err && err==='Not Found'){
          return res.end("Service Id Not Found")
        }
         return res.json(result);
      })

  },
  createNewService: function(req, res, next) {
   
    var data = {};
    var s_id= true;


    if(!req.body.code || !req.body.name || !req.body.short_name || !req.body.description || !req.body.icon || !req.body.active){
       return res.json("Mandatory parameters are missing")
    }
    data.service = req.body;
    
    srvcModel.createNewService(data,function(err, result){
      if(result){
        console.log(result)
        return res.json("Service added successfully");
      }
    })
  },

  updateService: function(req, res, next) {
      
   var data={};
   data.s_id = req.params.service_id ? req.params.service_id : null;
   data.service=req.body;
    srvcModel.updateService(data,function(err, result){
      if(result){
        console.log(result)
         return res.json("Service updated successfully");
      }
    })

  },

  deleteService: function(req, res, next) {
      
   var data={};
   data.s_id = req.params.service_id ? req.params.service_id : null;
    srvcModel.deleteService(data,function(err, result){
      if(result){
        console.log(result)
         return res.json("Service deleted successfully");
      }
    })

  }
}
module.exports = service;