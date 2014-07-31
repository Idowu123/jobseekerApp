'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Jobseeker = mongoose.model('Jobseeker'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Jobseeker already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Jobseeker
 */
exports.create = function(req, res) {
	var jobseeker = new Jobseeker(req.body);
	jobseeker.user = req.user;

	jobseeker.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(jobseeker);
		}
	});
};

/**
 * Show the current Jobseeker
 */
exports.read = function(req, res) {
	res.jsonp(req.jobseeker);
};

/**
 * Update a Jobseeker
 */
exports.update = function(req, res) {
	var jobseeker = req.jobseeker ;

	jobseeker = _.extend(jobseeker , req.body);

	jobseeker.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(jobseeker);
		}
	});
};

/**
 * Delete an Jobseeker
 */
exports.delete = function(req, res) {
	var jobseeker = req.jobseeker ;

	jobseeker.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(jobseeker);
		}
	});
};

/**
 * List of Jobseekers
 */
exports.list = function(req, res) { Jobseeker.find().sort('-created').populate('user', 'displayName').exec(function(err, jobseekers) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(jobseekers);
		}
	});
};

/**
 * Jobseeker middleware
 */
exports.jobseekerByID = function(req, res, next, id) { Jobseeker.findById(id).populate('user', 'displayName').exec(function(err, jobseeker) {
		if (err) return next(err);
		if (! jobseeker) return next(new Error('Failed to load Jobseeker ' + id));
		req.jobseeker = jobseeker ;
		next();
	});
};

/**
 * Jobseeker authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.jobseeker.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};