var request = require('request');
var Customer = require('../schemas/customerSchema');
var User = require('../schemas/userSchema');



var cModel = {


  fetchAllCustomer: function(data,cb){
    
     Customer.find().select("-contacts").populate({ path: 'contact_ids', select: { "firstname": 1, "lastname": 1,"telephones": 1} }).limit(data.limit).lean().exec(function(err, result){

      if(err){
        return cb(err)
      }else{
        console.log(result)
        var extensibleCustomer = result;
    
        extensibleCustomer.forEach(function(cus, index) {
          cus.service_used=2;
          cus.loads_delivered=230;
          cus.loads_inprogress=7;
          cus.rating=4;
        });

        return cb(null,extensibleCustomer);
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
        console.log('first one is working',result)
        customer=result[0];
        //delete customer['__v'];
        var contact_ids=[];
        
        customer.contacts.forEach(function(contact, index) {
          contact_ids.push(contact.user_id)
        });
        console.log('contactsssssssssssssssssssss',contact_ids);
        User.find()
        .where('_id')
        .in(contact_ids)
        .select({ "firstname": 1, "lastname": 1,"telephones": 1})
        .exec(function(err, result){
         
         console.log('contacts returnedddddddd',err,result);
         if(err){
            console.log("Error:", err);
            return cb(err)
          }else{
            if(!customer){
              return cb("Not Found")
            }

            var extensibleCustomer = customer.toObject();

            delete extensibleCustomer.contacts;

            extensibleCustomer.contact_ids= result;

            extensibleCustomer.service_used=2;
            extensibleCustomer.loads_delivered=230;
            extensibleCustomer.loads_inprogress=7;
            extensibleCustomer.rating=4;
            console.log(extensibleCustomer)
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

        // if(data.users){
        //   data.users.forEach(function(user, index) {
        //     user.customer_id=result.id;
        //   });
        
        //   var userCustomer = new UserCustomer(data.users[0]);
        //   userCustomer.save(function(err, result){
        //       return cb(null,result);
        //   })

        // }else{
            return cb(null,result);
        //}
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
      
    },

   deleteCustomer: function(data,cb){
      
      Customer.findOneAndRemove({_id: data.c_id}, function(err, result) {
        if (err) return cb(err);

        // we have deleted the user
        return cb(null,result);
      });
    },

    createNewBulkCustomers: function(data,cb){

      var rawDocuments = data.raw;

      Customer.insertMany(rawDocuments)
          .then(function(mongooseDocuments) {
               return cb(null,mongooseDocuments);
          })
          .catch(function(err) {
              return cb(err);
              /* Error handling */
          });
      // var json = data.load;
      // var load = new Load(json)
      // load.save(function(err, result){
      //       return cb(null,result);
      // })
    }
  };



module.exports = cModel;