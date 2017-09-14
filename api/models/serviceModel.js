var request = require('request');
var Service = require('../schemas/serviceSchema');


var sModel = {


  fetchAllService: function(data,cb){
    
     Service.find({}).limit(data.limit).lean().exec(function(err, result){

      if(err){
        return cb(err)
      }else{
        console.log(result)
        var extensibleService = result;
    
        extensibleService.forEach(function(ser, index) {
          ser.customer_num=5;
        });

        return cb(null,extensibleService);
      }
    })
  },

  fetchService: function(data,cb){
    
    var service=[];
    Service.find({_id:data.s_id}).exec(function(err, result){

      if(err){
        console.log("Error:", err);
        return cb(err)
      }else{
        console.log(result)
        service=result[0];
        var extensibleService = service.toObject();
        extensibleService.customer_num=5;
        return cb(null,extensibleService);
      
      }
    })
  },
  
  createNewService: function(data,cb){
      var json = data.service;
      var service = new Service(json)
      service.save(function(err, result){
            return cb(null,result);
      })
    },
 
  updateService: function(data,cb){
      
       Service.update({_id: data.s_id}, data.service, function(err, result) {
        console.log(err,result)
        if (err) {
          return cb(err);
        }
        return cb(null,result);
      });
      
    },

   deleteService: function(data,cb){
      
      Service.findOneAndRemove({_id: data.s_id}, function(err, result) {
        if (err) return cb(err);

        // we have deleted the user
        return cb(null,result);
      });
    }
  };



module.exports = sModel;