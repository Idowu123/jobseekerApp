'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Jobseeker Schema
 */
var JobseekerSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Jobseeker name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Jobseeker', JobseekerSchema);