var request = require('request');
var User = require('../schemas/userSchema');



var cModel = {


  
  authUserC: function(data,cb){
    
    var user;
    User.find({email:data.email,password:data.password})
    .populate(
      { path: 'team_ids' , populate: [
      { path: 'role_ids', populate : {path : 'role_id'} , select: { "role_id": 1, "right_code": 1} },
      { path: 'covArea_ids', select: { "name": 1, "code": 1} }
      ], select: { "name": 1, "role_ids": 1 ,"covArea_ids":1} }
      )
    .exec(function(err, result){

      if(err){
        console.log("Error:", err);
        return cb(err)
      }else{

        console.log('user auth result',result)
        user=result[0];
        return cb(null,user);
        //delete customer['__v'];
      }
    })
   }
  };



module.exports = cModel;