'use strict';

// Jobs controller
angular.module('jobs').controller('JobsController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Jobs',
	function($scope, $http, $stateParams, $location, Authentication, Jobs ) {
		$scope.authentication = Authentication;

		// Create new Job
		$scope.create = function() {
			// Create new Job object
			var job = new Jobs ({
				title: this.title,
				description: this.description,
				vacancyNumber: this.vacancyNumber,
				industry: this.industry,
				location: this.location

			});

			// Redirect after save
			job.$save(function(response) {
				$location.path('jobs/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.title = '';
			this.description = '';
			this.vacancyNumber = '';
			this.industry = '';
			this.location = '';
		};

		// Remove existing Job
		$scope.remove = function( job ) {
			if ( job ) { job.$remove();
					for (var i in $scope.jobs ) {
					if ($scope.jobs [i] === job ) {
						$scope.jobs.splice(i, 1);
					}
				}
			} else {
				$scope.job.$remove(function() {
					$location.path('jobs');
				});
			}
		};

		// Update existing Job
		$scope.update = function() {
			var job = $scope.job;
			job.$update(function() {
				$location.path('jobs/' + job._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};


		$scope.createApplication = function(){
			console.log($scope.job._id);
			var url = '/jobs/' + $scope.job._id + '/apply';
			console.log(url, 'done');


			$http.get(url).success(function(response) {
		    // If successful show success message and clear form
		    	console.log('in call back function');
		    	$scope.success = true;
		    		console.log('success');
			    	$location.path('/jobs/' + $scope.job._id + '/application_complete');
			  	}).error(function(response) {
			    $scope.error = response.message;

			});

		};
	
		// Find a list of Jobs
		$scope.find = function() {
		//	console.log(Jobs.query());
			$scope.jobs = Jobs.query();
			
		};

		// Find existing Job
		$scope.findOne = function() {
			// console.log($stateParams);
			$scope.job = Jobs.get({ 
				jobId: $stateParams.jobId

			});

		};
	}
]);
			
	
