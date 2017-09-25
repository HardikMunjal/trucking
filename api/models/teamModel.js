var request = require('request');
var team = require('../schemas/teamSchema');
var User = require('../schemas/userSchema');



var cModel = {


  fetchAllTeam: function(data,cb){
    
     team.find().limit(data.limit).lean().exec(function(err, result){

      if(err){
        return cb(err)
      }else{
        console.log(result)
        var extensibleteam = result;

        return cb(null,extensibleteam);
      }
    })
  },

  fetchTeam: function(data,cb){
    
    var team=[];
    team.find({_id:data.team_id}).exec(function(err, result){

     if(err){
        return cb(err)
      }else{
        console.log(result)
        var extensibleteam = result;

        return cb(null,extensibleteam);
      }
    })
  },
  
  createNewTeam: function(data,cb){
      var json = data.team;
      var team = new team(json)
      team.save(function(err, result){
            return cb(null,result);
        //}
      })
    },
 
  updateTeam: function(data,cb){
      
       team.update({_id: data.c_id}, data.team, function(err, result) {
        console.log(err,result)
        if (err) {
          return cb(err);
        }
        return cb(null,result);
      });
      
    },

   deleteTeam: function(data,cb){
      
      team.findOneAndRemove({_id: data.c_id}, function(err, result) {
        if (err) return cb(err);

        // we have deleted the user
        return cb(null,result);
      });
    }
  };



module.exports = cModel;