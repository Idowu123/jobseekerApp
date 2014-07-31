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
	jobTitle: {
		type: String,
		default: '',
		required: Please fill Job title,
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	jobDescription: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in job description']
	},
	vacancyNumber: {
		type: Number,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in number of vacancies']
	},
	industry: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in your industry']
	},
	gender: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Please fill in reqire gender']
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Job', JobSchema);