'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});


		$stateProvider.
		state('employer_home', {
			url: '/employer',
			templateUrl: 'modules/jobs/views/employer_list-jobs.client.view.html'
		});
		
		$stateProvider.
		state('seeker_home', {
			url: '/seeker',
			templateUrl: 'modules/jobs/views/seeker_list-jobs.client.view.html'
		});
	}
]);

// before i changed it

		// $stateProvider.
		// state('employer_home', {
		// 	url: '/employer',
		// 	templateUrl: 'modules/jobs/views/employer_list-jobs.client.view.html'
		// });
		
		// $stateProvider.
		// state('seeker_home', {
		// 	url: '/seeker',
		// 	templateUrl: 'modules/jobs/views/seeker_list-jobs.client.view.html'
		// });