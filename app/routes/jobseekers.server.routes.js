'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var jobseekers = require('../../app/controllers/jobseekers');

	// Jobseekers Routes
	app.route('/jobseekers')
		.get(jobseekers.list)
		.post(users.requiresLogin, jobseekers.create);

	app.route('/jobseekers/:jobseekerId')
		.get(jobseekers.read)
		.put(users.requiresLogin, jobseekers.hasAuthorization, jobseekers.update)
		.delete(users.requiresLogin, jobseekers.hasAuthorization, jobseekers.delete);

	// Finish by binding the Jobseeker middleware
	app.param('jobseekerId', jobseekers.jobseekerByID);
};