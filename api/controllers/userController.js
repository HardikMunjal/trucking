var userModel = require('../models/userModel');

var customer = {

  fetchAllUser: function(req, res, next) {
   
    var data = {};
    data.limit=100;
    userModel.fetchAllUser(data,function(err, result){
      console.log('resrsrsr',result)
         return res.json(result)
      })
  },

  fetchUser: function(req, res, next) {
   
    var data = {};
    data.u_id = req.params.user_id ? req.params.user_id : null;

    userModel.fetchUser(data,function(err, result){
        if(err && err==='Not Found'){
          return res.end("User Id Not Found")
        }
         return res.json(result);
      })

  },
  createNewUser: function(req, res, next) {
   
    var data = {};
    var u_id= true;   
   

    console.log(req.body)
    if(!req.body.username || !req.body.email || !req.body.password || !req.body.active || !req.body.firstname || !req.body.lastname || !req.body.national_id || !req.body.id_photo || !req.body.user_photo || !req.body.company || !req.body.city || !req.body.department || !req.body.position || !req.body.role){
       return res.json("Mandatory user parameters are missing")
    }

    if(req.body.role === 'Driver'){

      if(req.body.driver_details && req.body.driver_details.constructor === Array){
       //check user structure is correct or not
       req.body.driver_details.forEach(function(driver, index) {

        if(!driver.driving_license || !driver.dl_photo || !driver.dl_expiryDate || !driver.rntt_id || !driver.rntt_photo || !driver.rntt_expiryDate){
           return res.json("Mandatory driver details are missing");
         }
      });
      //data.tel=req.body.telephones;
     }

      
    }

    if(req.body.telephones && req.body.telephones.constructor === Array){
       //check user structure is correct or not
       req.body.telephones.forEach(function(telephone, index) {
        if(!telephone.tel_num || !telephone.type ){
          return res.json('Mandatory parameters are missing in Telephone details')
        }
      });
      //data.tel=req.body.telephones;
    }

    data.user = req.body;
    
    userModel.createNewUser(data,function(err, result){
      if(result){
        console.log(result)
        return res.json("user added successfully");
      }
    })
  },

   updateUser: function(req, res, next) {
      
   var data={};
   data.u_id = req.params.user_id ? req.params.user_id : null;
   data.user=req.body;
    userModel.updateUser(data,function(err, result){
      if(result){
        console.log(result)
         return res.json("user updated successfully");
      }
    })

  },

  deleteUser: function(req, res, next) {
      
   var data={};
   data.u_id = req.params.user_id ? req.params.user_id : null;
   userModel.deleteUser(data,function(err, result){
      if(result){
        console.log(result)
         return res.json("user deleted successfully");
      }
    })

  }

}
module.exports = customer;