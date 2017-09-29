'use strict'


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var role_right_u = require('./roleRightSchema');
var cov_area = require('./coveringAreaSchema');


var teamSchema = new Schema({
	name:{
		type:String,
		default:null
	},
	role_ids: [{
					 type: Schema.Types.ObjectId,
					  ref: 'role_right_u' 
					}],
	covArea_ids: [{
					 type: Schema.Types.ObjectId,
					  ref: 'cov_area' 
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

var team_u = mongoose.model('team_u', teamSchema);

module.exports = team_u;