'use strict';

// Configuring the Articles module
angular.module('jobseekers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Jobseekers', 'jobseekers', 'dropdown', '/jobseekers(/create)?');
		Menus.addSubMenuItem('topbar', 'jobseekers', 'List Jobseekers', 'jobseekers');
		Menus.addSubMenuItem('topbar', 'jobseekers', 'New Jobseeker', 'jobseekers/create');
	}
]);