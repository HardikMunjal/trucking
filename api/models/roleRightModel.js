var request = require('request');
var Role = require('../schemas/roleSchema');
var RoleRight = require('../schemas/roleRightSchema');



var cModel = {


  fetchAllRoleRight: function(data,cb){
  
     RoleRight.find().limit(data.limit).populate({ path: 'role_id', select: { "name": 1} }).lean().exec(function(err, result){

      if(err){
        return cb(err)
      }else{
        console.log(result)
        var extensiblerole = result;

         extensiblerole.forEach(function(role, index) {
          Role.find({ '_id': extensiblerole.role_id })
            .lean()
            .select({ "name": 1})
            .exec(function(err, result){
             
             console.log('contacts returnedddddddd',err,result);
             if(err){
                console.log("Error:", err);
                return cb(err)
              }else{
              
                role.name=result.name;
                // console.log(extensiblerole)
                // return cb(null,extensiblerole);
              
              }
            })
        });

        return cb(null,extensiblerole);
      }
    })
  }
};



module.exports = cModel;