var cstmrModel = require('../models/customerModel');
var async = require('async');

var customer = {

  fetchAllCustomer: function(req, res, next) {
   
    var data = {};
    data.limit=100;
    cstmrModel.fetchAllCustomer(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }
    	console.log('resrsrsr',result)
      return res.json(result)
      })
  },

  fetchCustomer: function(req, res, next) {
   
    var data = {};
    data.c_id = req.params.customer_id ? req.params.customer_id : null;

    cstmrModel.fetchCustomer(data,function(err, result){
        if(err && err==='Not Found'){
          var message = "Customer Id Not Found"
         return res.status(410).send(message);
         }
        
        else{
          return res.status(410).send(err.message);
        }
         
         return res.json(result);
      })

  },
  createNewCustomer: function(req, res, next) {
   
    var data = {};
    var c_id= true;   
    var missing = false;
    if(req.body.contacts && req.body.contacts.constructor === Array){
       //check user structure is correct or not
       req.body.contacts.forEach(function(contact, index) {
        if(!contact.username || !contact.type || !contact.department){
          missing=true;
          //break;
        }
      });
      
    }
    if(missing){
      var message = "Mandatory parameters are missing in customer Contacts"
      return res.status(400).send(message);
    }
    data.users=req.body.contacts;

    console.log('dependency injection should not called')

    if(!req.body.name || !req.body.country || !req.body.city || !req.body.address || !req.body.active || !req.body.tax_id || !req.body.postal_code || !req.body.industry || !req.body.telephone1){
       var message = "Mandatory parameters are missing in customer";
       return res.status(400).send(message);
    }
    data.customer = req.body;
    
    cstmrModel.createNewCustomer(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }
        console.log(result)
        return res.json("Customer added successfully");
    })
  },

  updateCustomer: function(req, res, next) {
      
   var data={};
   data.c_id = req.params.customer_id ? req.params.customer_id : null;
   data.customer=req.body;
    cstmrModel.updateCustomer(data,function(err, result){
      if(err){
        return res.status(410).send(err.message);
      }

        console.log(result)
         return res.json("Customer updated successfully");
    })

  },

  deleteCustomer: function(req, res, next) {
      
   var data={};
   data.c_id = req.params.customer_id ? req.params.customer_id : null;
   cstmrModel.deleteCustomer(data,function(err, result){
        if(err){
          return res.status(410).send(err.message);
        }
        console.log(result)
        return res.json("Customer deleted successfully");
    })

  }
}
module.exports = customer;