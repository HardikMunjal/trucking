'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var right_u = require('./rightSchema');


var roleSchema = new Schema({
	name:{
		type:String,
		default:null
	},
	right_ids: [{
					 type: Schema.Types.ObjectId,
					  ref: 'right_u' 
					}],
	created_by:{
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

var role_u = mongoose.model('role_u', roleSchema);

module.exports = role_u;