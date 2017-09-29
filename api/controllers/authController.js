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
         return res.json(result)
      })

  }

  
}
module.exports = auth;