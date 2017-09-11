var request = require('request');
var Load = require('../schemas/loadSchema');


var lModel = {


  fetchAllLoad: function(data,cb){
    
     Load.find({}).limit(data.limit).lean().exec(function(err, result){

      if(err){
        return cb(err)
      }else{
        console.log(result)
        

        return cb(null,result);
      }
    })
  },

  fetchLoad: function(data,cb){
    
    var load=[];
    Load.find({_id:data.l_id}).exec(function(err, result){

      if(err){
        console.log("Error:", err);
        return cb(err)
      }else{
        console.log(result)
        load=result[0];
        
        return cb(null,load);
      
      }
    })
  },
  
  createNewLoad: function(data,cb){
      var json = data.load;
      var load = new Load(json)
      load.save(function(err, result){
            return cb(null,result);
      })
    },
 
  updateLoad: function(data,cb){
      
       Load.update({_id: data.l_id}, data.load, function(err, result) {
        console.log(err,result)
        if (err) {
          return cb(err);
        }
        return cb(null,result);
      });
      
    },

   deleteLoad: function(data,cb){
      
      Load.findOneAndRemove({_id: data.l_id}, function(err, result) {
        if (err) return cb(err);

        // we have deleted the user
        return cb(null,result);
      });
    }
  };



module.exports = lModel;