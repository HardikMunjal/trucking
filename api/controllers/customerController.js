var cstmrModel = require('../models/customerModel');

var customer = {
  fetchCustomer: function(req, res, next) {
   
   
    var data= {};
    		
    if(req.query.customer_id){
       data.customer_id=req.query.customer_id;
    }

    cstmrModel.extractCustomerDetails(data,function(err, result){
    	console.log('resrsrsr',result)
         return res.json(result)
      })

  },
  createNewCustomer: function(req, res, next) {
   
    var customer_id= true;   
    if(req.query.users && req.query.users.constructor === Array){
       //check user structure is correct or not
       data.users=[];
    } 
    if(req.query.customer_id){
       customer_id=req.query.customer_id;
    }
    cstmrModel.createNewCustomer(customer_id,function(err, result){
    	console.log(result)
         //return cb(err,result);
      })

  }
}
module.exports = customer;