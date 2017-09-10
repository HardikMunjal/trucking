var cstmrModel = require('../models/customerModel');

var customer = {

  fetchAllCustomer: function(req, res, next) {
   
    var data = {};
    data.limit=100;
    cstmrModel.fetchAllCustomer(data,function(err, result){
    	console.log('resrsrsr',result)
         return res.json(result)
      })
  },

  fetchCustomer: function(req, res, next) {
   
    var data = {};
    data.c_id = req.params.customer_id ? req.params.customer_id : null;

    cstmrModel.fetchCustomer(data,function(err, result){
        if(err && err==='Not Found'){
          return res.end("Customer Id Not Found")
        }
         return res.json(result);
      })

  },
  createNewCustomer: function(req, res, next) {
   
    var data = {};
    var c_id= true;   
    if(req.body.contacts && req.body.contacts.constructor === Array){
       //check user structure is correct or not
       req.body.contacts.forEach(function(contact, index) {
        if(!contact.username || !contact.type || !contact.department){
          return res.json('Mandatory parameters are missing in Contacts')
        }
      });
      data.users=req.body.contacts;
    }


    if(!req.body.name || !req.body.country || !req.body.city || !req.body.address || !req.body.active || !req.body.tax_id || !req.body.postal_code || !req.body.industry || !req.body.telephone1){
       return res.json("Mandatory parameters are missing")
    }
    data.customer = req.body;
    
    cstmrModel.createNewCustomer(data,function(err, result){
      if(result){
        console.log(result)
        return res.json("user added successfully");
      }
    })
  },

  updateCustomer: function(req, res, next) {
      
   var data={};
   data.c_id = req.params.customer_id ? req.params.customer_id : null;
   data.customer=req.body;
    cstmrModel.updateCustomer(data,function(err, result){
      if(result){
        console.log(result)
         return res.json("user updated successfully");
      }
    })

  },

  deleteCustomer: function(req, res, next) {
      
   var data={};
   data.c_id = req.params.customer_id ? req.params.customer_id : null;
   cstmrModel.deleteCustomer(data,function(err, result){
      if(result){
        console.log(result)
         return res.json("user deleted successfully");
      }
    })

  }
}
module.exports = customer;