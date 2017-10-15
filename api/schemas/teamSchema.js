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
	role_right_ids: [{

				rol_right:{
					 type: Schema.Types.ObjectId,
					  ref: 'role_right_u' 
					},
					selected:{
						type:String,
						default:null
					}
				}],
	covArea_ids: [{
					 type: Schema.Types.ObjectId,
					  ref: 'cov_area' 
					}],
	description:{
		type:String,
		default:null
	},
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