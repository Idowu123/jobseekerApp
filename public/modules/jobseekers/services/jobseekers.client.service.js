'use strict';

//Jobseekers service used to communicate Jobseekers REST endpoints
angular.module('jobseekers').factory('Jobseekers', ['$resource',
	function($resource) {
		return $resource('jobseekers/:jobseekerId', { jobseekerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);