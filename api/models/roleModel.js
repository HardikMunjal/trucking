var request = require('request');
var Role = require('../schemas/roleSchema');
var RoleRight = require('../schemas/roleRightSchema');



var cModel = {


  fetchAllRole: function(data,cb){
    
     Role.find().limit(data.limit).lean().exec(function(err, result){

      if(err){
        return cb(err)
      }else{
        console.log(result)
        var extensiblerole = result;

         extensiblerole.forEach(function(role, index) {
          RoleRight.find({ 'role_id': role._id })
            .lean()
            .select({ "right_code": 1})
            .exec(function(err, result){
             
             console.log('contacts returnedddddddd',err,result);
             if(err){
                console.log("Error:", err);
                return cb(err)
              }else{
              
                role.right_ids=result;
                console.log(index,extensiblerole.length)

                if(index+1 ==extensiblerole.length){
                 return cb(null,extensiblerole);
                }
              
              }
            })
        });

        return cb(null,extensiblerole);
      }
    })
  },

  fetchRole: function(data,cb){
    
    //var role=[];
    Role.find({_id:data.role_id}).lean().exec(function(err, result){

     if(err){
        return cb(err)
      }else{
        
        var extensiblerole = result[0];
        console.log('HBKHKHK result',extensiblerole._id)

        RoleRight.find({ 'role_id': extensiblerole._id })
          .lean()
          .select({ "right_code": 1})
          .exec(function(err, result){
           
           console.log('contacts returnedddddddd',err,result);
           if(err){
              console.log("Error:", err);
              return cb(err)
            }else{
              if(!extensiblerole){
                return cb("Not Found")
              }
              extensiblerole.right_ids=result;

             
              console.log(extensiblerole)
              return cb(null,extensiblerole);
            
            }
          })

        //return cb(null,extensiblerole);
      }
    })
  },
  
  createNewRole: function(data,cb){
      var json = data.role;
      var role = new Role(json)
      role.save(function(err, result){

        if(result && data.role.right_codes){

          var rData={};
          rData.role_id= result.id;

          data.role.right_codes.forEach(function(r_code, index) {
            rData.right_code=r_code;
            var roleRight = new RoleRight(rData);
            roleRight.save(function(err, result){
                //return cb(null,result);
                console.log(r_code,'saved successfully')
            })
          });
        
          
        }
            return cb(null,result);
        
      })
    },
 
  updateRole: function(data,cb){
      
       Role.update({_id: data.r_id}, data.role, function(err, result) {
        console.log(err,result)
        if (err) {
          return cb(err);
        }
        return cb(null,result);
      });
      
    },

   deleteRole: function(data,cb){
      
      Role.findOneAndRemove({_id: data.r_id}, function(err, result) {
        if (err) return cb(err);

        // we have deleted the user
        return cb(null,result);
      });
    }
  };



module.exports = cModel;