// organization are big clients or customers,

// each organization will have some contacts


// now what is the difference b/w contacts and users?? users can be driver and else
// exact role of organization, or any example name?

// any difference b/w customers and organization


// in customer and contact, table
// name   service used   loads delivered
// belcom   3             122
// jhonson & jhonson  

// now who is belcom, they are customer or organization???
// or user, if user then who are customer contacts???
// +

//  m

// organization:

// name
// type
// description
// industry
// RNC Number
// Website
// Services used
// loads delivered
// loads in progress
// rating
// active

// add customers
// name
// country
// city
// address
// industory
// tax_idno
// postalcode
// icon
// description
// telephone r1
// telephone r2

// addcontact >>>>>>.
// type
// username
// department


// addzone >>>>>>>
// addservice>>>>>>

/////////////////////////////////////
//user account info
// username 
// email
// password
// active

// firestname
// middlename
// lastname
// national_id
// id_photo
// userphoto
// company
// city
// department
// position

// add telephone
// telephone
// type 

// role

//  if role= driver

// driving license
// dl photo
// driver lic expiration date
// rntt id_photo
// rntt photo
// rntt expiration dateo



var request = require('request');
var User = require('../schemas/userSchema');



var cModel = {


  fetchAllUser: function(data,cb){
    
     User.find({})
     .limit(data.limit)
     .lean()
     .populate(
      { path: 'team_ids' , populate: [
      { path: 'role_ids', populate : {path : 'role_id'} , select: { "role_id": 1, "right_code": 1} },
      { path: 'covArea_ids', select: { "name": 1, "code": 1} }
      ], select: { "name": 1, "role_ids": 1 ,"covArea_ids":1} }
      )
     .exec(function(err, result){

      if(err){
        return cb(err)
      }else{
        console.log(result);

        return cb(null,result);
      }
    })
  },

  fetchUser: function(data,cb){
    
    var user;
    User.find({_id:data.u_id}).exec(function(err, result){

      if(err){
        console.log("Error:", err);
        return cb(err)
      }else{
        console.log(result)
        user=result[0];
        return cb(null,user);
        //delete customer['__v'];
      }
    })
  },
  
  createNewUser: function(data,cb){
      var json = data.user;
      var user = new User(json)
      user.save(function(err, result){

          return cb(null,result);
      })
    },
 
  updateUser: function(data,cb){
      
       User.update({_id: data.u_id}, data.user, function(err, result) {
        console.log(err,result)
        if (err) {
          return cb(err);
        }
        return cb(null,result);
      });
      
    },

   deleteUser: function(data,cb){
      
      User.findOneAndRemove({_id: data.u_id}, function(err, result) {
        if (err) return cb(err);

        // we have deleted the user
        return cb(null,result);
      });
    }
  };



module.exports = cModel;