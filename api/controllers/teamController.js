var teamModel = require('../models/teamModel');
var async = require('async');

var team = {

  fetchAllTeam: function(req, res, next) {
   
    var data = {};
    data.limit=100;
    teamModel.fetchAllTeam(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }
    	console.log('resrsrsr',result)
      return res.json(result)
      })
  },

  fetchTeam: function(req, res, next) {
   
    var data = {};
    data.team_id = req.params.team_id ? req.params.team_id : null;

    teamModel.fetchTeam(data,function(err, result){
        if(err && err==='Not Found'){
          var message = "Team Id Not Found"
         return res.status(410).send(message);
         }
        
        else if(err){
          return res.status(410).send(err.message);
        }
         
         return res.json(result);
      })

  },
  createNewTeam: function(req, res, next) {
   
    var data = {};
    
    data.team = req.body;
   
    teamModel.createNewTeam(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }
        console.log(result)
        if(!result){
          var message = "Some Error Occurred";
    
          return res.status(400).send(message);
        }
        return res.json("Team added successfully");
    })
  },

  updateTeam: function(req, res, next) {
      
   var data={};
   data.c_id = req.params.team_id ? req.params.team_id : null;
   data.team=req.body;
    teamModel.updateTeam(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }

        console.log(result)
         return res.json("Team updated successfully");
    })

  },

  deleteTeam: function(req, res, next) {
      
   var data={};
   data.c_id = req.params.team_id ? req.params.team_id : null;
   teamModel.deleteTeam(data,function(err, result){
        if(err){
          return res.status(410).send(err.message);
        }
        console.log(result)
        return res.json("Team deleted successfully");
    })

  }
}
module.exports = team;