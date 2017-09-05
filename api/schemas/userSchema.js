//userSchema
'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
	username:{
		type:String,
		default:'bhai'
	},
    customer_id:{
        type: String
    },
	createdAt:{
		type:Date,
		default:Date.now
	}
});

var user = mongoose.model('useca', userSchema);

module.exports = user;