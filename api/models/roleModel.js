var request = require('request');
var Role = require('../schemas/roleSchema');
var RoleRight = require('../schemas/roleRightSchema');



var cModel = {


  fetchAllrole: function(data,cb){
    
     role.find().limit(data.limit).lean().exec(function(err, result){

      if(err){
        return cb(err)
      }else{
        console.log(result)
        var extensiblerole = result;

        return cb(null,extensiblerole);
      }
    })
  },

  fetchrole: function(data,cb){
    
    var role=[];
    role.find({_id:data.role_id}).exec(function(err, result){

     if(err){
        return cb(err)
      }else{
        console.log(result)
        var extensiblerole = result;

        return cb(null,extensiblerole);
      }
    })
  },
  
  createNewRole: function(data,cb){
      var json = data.role;
      var role = new Role(json)
      role.save(function(err, result){

        if(result && data.role.right_codes){

          var rData={};
          rData.role_id= result.id;

          data.role.right_codes.forEach(function(r_code, index) {
            rData.r_code=r_code;
            var roleRight = new RoleRight(rData);
            roleRight.save(function(err, result){
                //return cb(null,result);
                console.log(r_code,'saved successfully')
            })
          });
        
          
        }
            return cb(null,result);
        
      })
    },
 
  updaterole: function(data,cb){
      
       role.update({_id: data.c_id}, data.role, function(err, result) {
        console.log(err,result)
        if (err) {
          return cb(err);
        }
        return cb(null,result);
      });
      
    },

   deleterole: function(data,cb){
      
      role.findOneAndRemove({_id: data.c_id}, function(err, result) {
        if (err) return cb(err);

        // we have deleted the user
        return cb(null,result);
      });
    }
  };



module.exports = cModel;