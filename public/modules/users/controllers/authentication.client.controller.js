'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		// if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				$scope.authentication.user = response;
				console.log($scope.authentication.user);
				console.log($scope.authentication.user._type);
				console.log($scope.authentication.user.companyName);
				console.log($scope.authentication.user._id);
				//And redirect to the index page
					$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		}; 


		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				$scope.authentication.user = response;
				console.log($scope.authentication.user._type);
				console.log($scope.authentication.user.companyName);
				console.log($scope.authentication.user._id);
				console.log($scope.authentication.user);

				//And redirect to the index page
				$location.path('/jobs');
			}).error(function(response) {
				$scope.error = response.message;
				});
		};
	}
]);