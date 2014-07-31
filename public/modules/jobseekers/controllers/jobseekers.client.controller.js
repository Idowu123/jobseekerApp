'use strict';

// Jobseekers controller
angular.module('jobseekers').controller('JobseekersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Jobseekers',
	function($scope, $stateParams, $location, Authentication, Jobseekers ) {
		$scope.authentication = Authentication;

		// Create new Jobseeker
		$scope.create = function() {
			// Create new Jobseeker object
			var jobseeker = new Jobseekers ({
				name: this.name
			});

			// Redirect after save
			jobseeker.$save(function(response) {
				$location.path('jobseekers/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Jobseeker
		$scope.remove = function( jobseeker ) {
			if ( jobseeker ) { jobseeker.$remove();

				for (var i in $scope.jobseekers ) {
					if ($scope.jobseekers [i] === jobseeker ) {
						$scope.jobseekers.splice(i, 1);
					}
				}
			} else {
				$scope.jobseeker.$remove(function() {
					$location.path('jobseekers');
				});
			}
		};

		// Update existing Jobseeker
		$scope.update = function() {
			var jobseeker = $scope.jobseeker ;

			jobseeker.$update(function() {
				$location.path('jobseekers/' + jobseeker._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Jobseekers
		$scope.find = function() {
			$scope.jobseekers = Jobseekers.query();
		};

		// Find existing Jobseeker
		$scope.findOne = function() {
			$scope.jobseeker = Jobseekers.get({ 
				jobseekerId: $stateParams.jobseekerId
			});
		};
	}
]);