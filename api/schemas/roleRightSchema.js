'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var right_u = require('./rightSchema');


var roleRightSchema = new Schema({
	
	role_id: {
		type:String,
		default:null
	},
	right_code:{
		type:String,
		default:null
	},
	createdAt:{
		type:Date,
		default:Date.now
	},
	updatedAt:{
		type:Date,
		default:Date.now
	}
});

var role_right_u = mongoose.model('role_right_u', roleRightSchema);

module.exports = role_right_u;