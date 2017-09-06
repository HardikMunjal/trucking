var allowedHosts = ['http://0.0.0.0:4000','http://swift-dev.drakulaaz.co','http://localhost:4200'];


                    
var ipsec = {

   
    CrossOriginHeaders : function (req, res, next) {

      var date = new Date();
      console.log("**************"+req.path+"*************"+req.connection.remoteAddress);
     
      if(allowedHosts.indexOf(req.headers.origin) > -1){
	    res.header('Access-Control-Allow-Origin', req.headers.origin);
	    res.header('Access-Control-Allow-Credentials', true);
	    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
	    res.header('Access-Control-Allow-Headers', 'Content-Type');
	     }
	  next();
    }
  };


module.exports = ipsec;