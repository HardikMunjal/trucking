var request = require('request');
var Right = require('../schemas/rightSchema');
var User = require('../schemas/userSchema');



var cModel = {


  fetchAllRight: function(data,cb){
    
     Right.find().limit(data.limit).lean().exec(function(err, result){

      if(err){
        return cb(err)
      }else{
        console.log(result)
        var extensibleRight = result;

        return cb(null,extensibleRight);
      }
    })
  },

  fetchRight: function(data,cb){
    
    var Right=[];
    Right.find({_id:data.right_id}).exec(function(err, result){

     if(err){
        return cb(err)
      }else{
        console.log(result)
        var extensibleRight = result;

        return cb(null,extensibleRight);
      }
    })
  },
  
  createNewRight: function(data,cb){
      var json = data.Right;
      var right = new Right(json)
      right.save(function(err, result){
            return cb(null,result);
        //}
      })
    },
 
  updateRight: function(data,cb){
      
       Right.update({_id: data.c_id}, data.Right, function(err, result) {
        console.log(err,result)
        if (err) {
          return cb(err);
        }
        return cb(null,result);
      });
      
    },

   deleteRight: function(data,cb){
      
      Right.findOneAndRemove({_id: data.c_id}, function(err, result) {
        if (err) return cb(err);

        // we have deleted the user
        return cb(null,result);
      });
    }
  };



module.exports = cModel;