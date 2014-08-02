'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
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
	employer: {
		type: Schema.ObjectId,
		ref: 'Employer'
	}
});

mongoose.model('Job', JobSchema);