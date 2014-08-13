'use strict';

//Setting up route
angular.module('jobs').config(['$stateProvider',
	function($stateProvider) {
		// Jobs state routing
		$stateProvider.
		state('employer_listJobs', {
			url: '/jobs',
			templateUrl: 'modules/jobs/views/employer_list-jobs.client.view.html'
		}).
		state('seeker_listJobs', {
			url: '/jobs',
			templateUrl: 'modules/jobs/views/seeker_list-jobs.client.view.html'
		}).
		state('createJob', {
			url: '/jobs/create',
			templateUrl: 'modules/jobs/views/create-job.client.view.html'
		}).
		state('employer_viewJob', {
			url: '/jobs/e/:jobId',
			templateUrl: 'modules/jobs/views/employer_view-job.client.view.html'
		}).
		state('seeker_viewJob', {
			url: '/jobs/s/:jobId',
			templateUrl: 'modules/jobs/views/seeker_view-job.client.view.html'
		}).
		state('apply_Job', {
			url: '/jobs/:jobId/application_complete',
			templateUrl: 'modules/jobs/views/apply-job.client.view.html'
		}).
		state('editJob', {
			url: '/jobs/:jobId/edit',
			templateUrl: 'modules/jobs/views/edit-job.client.view.html'
		}).
		state('view_applicant', {
			url: 'jobs/:jobId/e/view_details',
			templateUrl: 'modules/jobs/views/applicants_view-jobs.client.view.html'
		});
	}
]);


// db.name.find()
