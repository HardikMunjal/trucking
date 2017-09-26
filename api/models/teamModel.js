var request = require('request');
var Team = require('../schemas/teamSchema');
var User = require('../schemas/userSchema');



var cModel = {


  fetchAllTeam: function(data,cb){
    
     Team.find().limit(data.limit).lean().exec(function(err, result){

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
    Team.find({_id:data.team_id}).exec(function(err, result){

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
      var team = new Team(json);
      team.save(function(err, result){
        console.log(err,result)
            return cb(null,result);
        //}
      })
    },
 
  updateTeam: function(data,cb){
      
       Team.update({_id: data.c_id}, data.team, function(err, result) {
        console.log(err,result)
        if (err) {
          return cb(err);
        }
        return cb(null,result);
      });
      
    },

   deleteTeam: function(data,cb){
      
      Team.findOneAndRemove({_id: data.c_id}, function(err, result) {
        if (err) return cb(err);

        // we have deleted the user
        return cb(null,result);
      });
    }
  };



module.exports = cModel;