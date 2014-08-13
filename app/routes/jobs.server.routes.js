

'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var jobs = require('../../app/controllers/jobs');

	// Jobs Routes create, list
	app.route('/jobs')
		.get(jobs.list)
		.post(users.requiresLogin, jobs.create);

// read,update, delete
	app.route('/jobs/:jobId') 
		.get(jobs.read)
		.put(users.requiresLogin, jobs.hasAuthorization, jobs.update)
		.delete(users.requiresLogin, jobs.hasAuthorization, jobs.delete);

	 app.route('/jobs/:jobId/apply')
	 	.get(users.requiresLogin, users.jobSearchersOnly, jobs.apply);
	 	
		
	// Finish by binding the Job middleware
	app.param('jobId', jobs.jobByID);
};