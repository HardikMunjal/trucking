var authModel = require('../models/authModel');

var auth = {

  validateCredential: function(req, res, next) {
   
    var data = {};
    data=req.body;

    authModel.authUserC(data,function(err, result){
      if(!result){
          var message = "Wrong Credential"
          return res.status(400).send(message);
        }
    	console.log('autherrrr',result)
      req.session.user=true;
         return res.json(result)
      })

  },
  testCredential: function(req, res, next) {
   
    req.session.user=true;
    return res.end('done');

  },


  validateSession: function(req, res, next) {
   
    console.log('session info',req.session);
    if(req.session.user){
     next();
    }else{
      var message = "Session Invalidated"
      return res.status(400).send(message);
    }
   

  }

  
}
module.exports = auth;