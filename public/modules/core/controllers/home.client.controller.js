'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
	// $('#myTab a').click(function (e) {
 // 	 	e.preventDefault()
 //  		$(this).tab('show')
	// })

]);