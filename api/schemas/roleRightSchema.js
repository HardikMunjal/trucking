'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var role_u = require('./roleSchema');


var roleRightSchema = new Schema({
	
	role_id: {
		type:String,
		default:null,
		ref: 'role_u'
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
	},
	created_by:{
		type:String,
		default:null
	}
});

var role_right_u = mongoose.model('role_right_u', roleRightSchema);

module.exports = role_right_u;