'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	userModels = require('../../app/models/user'),
	Schema = mongoose.Schema;

/**
 * Job Schema
 */
var JobSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill Job title',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	description: {
		type: String,
		trim: true,
		default: ''
	},
	vacancyNumber: {
		type: Number,
		trim: true,
		default: ''
	},
	industry: {
		type: String,
		trim: true,
		default: ''
	},
	location: {
		type: String,
		trim: true,
		default: ''
	},
	// check the caps
	employer: {
		type: Schema.ObjectId,
		ref: 'Employer'
	},
	applicants : {
		type: [userModels.Jobsearcher]
	}
});

mongoose.model('Job', JobSchema);