var request = require('request');
var CoveringArea = require('../schemas/coveringAreaSchema');
var User = require('../schemas/userSchema');



var cModel = {


  fetchAllCoveringArea: function(data,cb){
    
     CoveringArea.find().limit(data.limit).lean().exec(function(err, result){

      if(err){
        return cb(err)
      }else{
        console.log(result)
        var extensibleCoveringArea = result;

        return cb(null,extensibleCoveringArea);
      }
    })
  },

  fetchCoveringArea: function(data,cb){
    
    var CoveringArea=[];
    CoveringArea.find({_id:data.CoveringArea_id}).exec(function(err, result){

     if(err){
        return cb(err)
      }else{
        console.log(result)
        var extensibleCoveringArea = result;

        return cb(null,extensibleCoveringArea);
      }
    })
  },
  
  createNewCoveringArea: function(data,cb){
      var json = data.CoveringArea;
      var CoveringArea = new CoveringArea(json)
      CoveringArea.save(function(err, result){
            return cb(null,result);
        //}
      })
    },
 
  updateCoveringArea: function(data,cb){
      
       CoveringArea.update({_id: data.c_id}, data.CoveringArea, function(err, result) {
        console.log(err,result)
        if (err) {
          return cb(err);
        }
        return cb(null,result);
      });
      
    },

   deleteCoveringArea: function(data,cb){
      
      CoveringArea.findOneAndRemove({_id: data.c_id}, function(err, result) {
        if (err) return cb(err);

        // we have deleted the user
        return cb(null,result);
      });
    }
  };



module.exports = cModel;