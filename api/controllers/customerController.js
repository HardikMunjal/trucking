var cstmrModel = require('../models/customerModel');

var customer = {
  fetchCustomer: function(req, res, next) {
   
    var customer_id= true;    
    if(req.query.customer_id){
       customer_id=req.query.customer_id;
    }
    cstmrModel.extractCustomerDetails(customer_id,function(err, result){
    	console.log(result)
         //return cb(err,result);
      })

  },
  createNewCustomer: function(req, res, next) {
   
    var customer_id= true;    
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