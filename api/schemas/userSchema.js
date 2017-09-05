//userSchema
'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
	customer_id:{
        type: String,
        default:''
    },
	type:{
        type: String
	},
	username:{
		type:String
	},
    department:{
        type: String
    },
	createdAt:{
		type:Date,
		default:Date.now
	}
});

var user = mongoose.model('user', userSchema);

module.exports = user;