'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Job = mongoose.model('Job'),
	User = mongoose.model('User'),
	Employer = mongoose.model('Employer'),
	Jobsearcher = mongoose.model('Jobsearcher'),
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
				message = 'Job already exists';
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
 * Create a Job
 */
exports.create = function(req, res) {
	var job = new Job(req.body);
	job.employer = req.user;
// was job.user = req.user;
	job.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(job);
		}
	});
};

/**
 * Show the current Job1
 */
exports.read = function(req, res) {
	res.jsonp(req.job);
	// console.log(req.job);
};


/**
 * Update a Job
 */
exports.update = function(req, res) {
	var job = req.job ;

	job = _.extend(job , req.body);

	job.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(job);
		}
	});
};

/**
 * Delete an Job
 */
exports.delete = function(req, res) {
	var job = req.job ;
	console.log(job);

	job.remove(function(err) {
		console.log('remove');
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(job);
		}
	});
};

/**
 * List of Jobs
 */
exports.list = function(req, res) { Job.find().sort('-created').populate('employer', 'companyName').exec(function(err, jobs) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(jobs);
		}
	});
};

/**
 * Job middleware
 */
exports.jobByID = function(req, res, next, id) { Job.findById(id).populate('employer', 'companyName').exec(function(err, job) {
		if (err) return next(err);
		if (! job) return next(new Error('Failed to load Job ' + id));
		req.job = job ;
		next();
	});
};

/**
 * Job authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	console.log('authorization');
	if (req.job.employer.id !== req.user.id) {
		console.log('notauth');
		return res.send(403, 'User is not authorized');
	}
	next();
};


exports.apply = function(req, res) {
	console.log('apply!');
	var job = req.job;
	console.log(job);
	job.applicants.push(req.user);
	job.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(job);
		}
	});
	console.log('job: ' + job);
};



