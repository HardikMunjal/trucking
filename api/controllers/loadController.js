var loadModel = require('../models/loadModel');

var load = {

  fetchAllLoad: function(req, res, next) {
   
    var data = {};
    data.limit=100;
    loadModel.fetchAllLoad(data,function(err, result){
    	console.log('resrsrsr',result)
         return res.json(result)
      })

  },

  fetchLoad: function(req, res, next) {
   
    var data = {};
    data.l_id = req.params.load_id ? req.params.load_id : null;

    loadModel.fetchLoad(data,function(err, result){
        if(err && err==='Not Found'){
          return res.end("Load Id Not Found")
        }
         return res.json(result);
      })

  },
  createNewLoad: function(req, res, next) {
   
    var data = {};
    var l_id= true;


    // if(!req.body.type || !req.body.name){
    //    return res.json("Mandatory parameters are missing")
    // }
    data.load = req.body;
    
    loadModel.createNewLoad(data,function(err, result){
      if(result){
        console.log(result)
        return res.json("Load added successfully");
      }
    })
  },

  updateLoad: function(req, res, next) {
      
   var data={};
   data.l_id = req.params.load_id ? req.params.load_id : null;
   data.load=req.body;
    loadModel.updateLoad(data,function(err, result){
      if(result){
        console.log(result)
         return res.json("Load updated successfully");
      }
    })

  },

  deleteLoad: function(req, res, next) {
      
   var data={};
   data.l_id = req.params.load_id ? req.params.load_id : null;
    loadModel.deleteLoad(data,function(err, result){
      if(result){
        console.log(result)
         return res.json("Load deleted successfully");
      }
    })

  }
}
module.exports = load;