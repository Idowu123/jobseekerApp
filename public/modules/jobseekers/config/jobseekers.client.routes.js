'use strict';

//Setting up route
angular.module('jobseekers').config(['$stateProvider',
	function($stateProvider) {
		// Jobseekers state routing
		$stateProvider.
		state('listJobseekers', {
			url: '/jobseekers',
			templateUrl: 'modules/jobseekers/views/list-jobseekers.client.view.html'
		}).
		state('createJobseeker', {
			url: '/jobseekers/create',
			templateUrl: 'modules/jobseekers/views/create-jobseeker.client.view.html'
		}).
		state('viewJobseeker', {
			url: '/jobseekers/:jobseekerId',
			templateUrl: 'modules/jobseekers/views/view-jobseeker.client.view.html'
		}).
		state('editJobseeker', {
			url: '/jobseekers/:jobseekerId/edit',
			templateUrl: 'modules/jobseekers/views/edit-jobseeker.client.view.html'
		});
	}
]);