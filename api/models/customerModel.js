var request = require('request');
var Customer = require('../schemas/customerSchema');
var User = require('../schemas/userSchema');



var cModel = {


  fetchAllCustomer: function(data,cb){
    
     Customer.find({}).limit(data.limit).exec(function(err, result){

      if(err){
        return cb(err)
      }else{
        console.log(result)
        return cb(null,result);
      }
    })
  },

  fetchCustomer: function(data,cb){
    
    var customer=[];
    Customer.find({_id:data.c_id}).exec(function(err, result){

      if(err){
        console.log("Error:", err);
        return cb(err)
      }else{
        console.log(result)
        customer=result[0];
        //delete customer['__v'];
        User.find({customer_id:data.c_id}).exec(function(err, result){

         if(err){
            console.log("Error:", err);
            return cb(err)
          }else{
            
            var extensibleCustomer = customer.toObject();
            extensibleCustomer.contacts= result;
            return cb(null,extensibleCustomer);
          
          }
        })
      }
    })
  },
  
  createNewCustomer: function(data,cb){
      var json = data.customer;
      var customer = new Customer(json)
      customer.save(function(err, result){

        if(data.users){
          data.users.forEach(function(user, index) {
            user.customer_id=result.id;
          });
        
          var user = new User(data.users[0]);
          user.save(function(err, result){
              return cb(null,result);
          })

        }else{
            return cb(null,result);
        }
      })
    },
 
  updateCustomer: function(data,cb){
      
       Customer.update({_id: data.c_id}, data.customer, function(err, result) {
        console.log(err,result)
        if (err) {
          return cb(err);
        }
        return cb(null,result);
      });
      
    }
  };



module.exports = cModel;