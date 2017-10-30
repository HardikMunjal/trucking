'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var loadSchema = new Schema({
	
	name:{
		type:String,
        default:null
		//required: true, index: { unique: true }
	},
	type:{
        type: String,
        default:null//,required: true
	},
	weight:{
		type :Object,
        default:{}
	},
	slot_time:{
		type:Date,
        default:Date.now
	},
    organization:{
        type:String
    },
	createdAt:{
		type:Date,
		default:Date.now
	},
	created_by:{
		type:String,
		default:null
	}
});

var load = mongoose.model('load', loadSchema);

module.exports = load;