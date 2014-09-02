'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var applicationModuleName = 'jobseekerapp';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ui.router',
        'ui.bootstrap',
        'ui.utils'
      ];
    // Add a new vertical module
    var registerModule = function (moduleName) {
      // Create angular module
      angular.module(moduleName, []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('jobs');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    });
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }  // $('#myTab a').click(function (e) {
     // 	 	e.preventDefault()
     //  		$(this).tab('show')
     // })
]);'use strict';
//Menu service used for managing  menus
angular.module('core').service('Menus', [function () {
    // Define a set of default roles
    this.defaultRoles = ['user'];
    // Define the menus object
    this.menus = {};
    // A private function for rendering decision 
    var shouldRender = function (user) {
      if (user) {
        for (var userRoleIndex in user.roles) {
          for (var roleIndex in this.roles) {
            if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
              return true;
            }
          }
        }
      } else {
        return this.isPublic;
      }
      return false;
    };
    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exists');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
      return false;
    };
    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      return this.menus[menuId];
    };
    // Add new menu object by menu id
    this.addMenu = function (menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      delete this.menus[menuId];
    };
    // Add menu item object
    this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic || this.menus[menuId].isPublic,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      });
      // Return the menu object
      return this.menus[menuId];
    };
    // Add submenu item object
    this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || '/' + menuItemURL,
            isPublic: isPublic || this.menus[menuId].isPublic,
            roles: roles || this.defaultRoles,
            shouldRender: shouldRender
          });
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    //Adding the topbar menu
    this.addMenu('topbar');
  }]);'use strict';
// Configuring the Articles module
angular.module('jobs').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Jobs', 'jobs', 'dropdown', '/jobs(/create)?');
    Menus.addSubMenuItem('topbar', 'jobs', 'List Jobs', 'jobs');
    Menus.addSubMenuItem('topbar', 'jobs', 'New Job', 'jobs/create');
  }
]);  // <ul class="nav navbar-nav navbar-right" data-ng-hide="authentication.user">
     // 			<li ui-route="/signup" ng-class="{active: $uiRoute}">
     // 				<a href="#" class="dropdown-toggle" data-toggle="dropdown">
     // 					<span data-ng-bind="authentication.user"></span> <a href="#">JobSeekers<a><b class="caret"></b>
     // 				</a>
     // 			</li>
     // 			<li ui-route="/signup" ng-class="{active: $uiRoute}">
     // 				<a href="/#!/employer_signup">Employers Signup</a>
     // 			</li>
     // 			<li class="divider-vertical"></li>
     // 			<li ui-route="/signin" ng-class="{active: $uiRoute}">
     // 				<a href="/#!/signin">Signin</a>
     // 			</li>
     // 		</ul>
     // <div class="container" data-ng-controller="HeaderController">
     // 	<div class="navbar-header">
     // 		<button class="navbar-toggle" type="button" data-ng-click="toggleCollapsibleMenu()">
     // 			<span class="sr-only">Toggle navigation</span>
     // 			<span class="icon-bar"></span>
     // 			<span class="icon-bar"></span>
     // 			<span class="icon-bar"></span>
     // 		</button>
     // 		<a href="/#!/" class="navbar-brand">jobseekerApp</a>
     // 	</div>
     // 	<nav class="collapse navbar-collapse" collapse="!isCollapsed" role="navigation">
     // 		<ul class="nav navbar-nav" data-ng-if="menu.shouldRender(authentication.user);">
     // 			<li data-ng-repeat="item in menu.items" data-ng-if="item.shouldRender(authentication.user);" ng-switch="item.menuItemType" ui-route="{{item.uiRoute}}" class="{{item.menuItemClass}}" ng-class="{active: ($uiRoute)}" dropdown="item.menuItemType === 'dropdown'">
     // 				<a ng-switch-when="dropdown" class="dropdown-toggle">
     // 					<span data-ng-bind="item.title"></span>
     // 					<b class="caret"></b>
     // 				</a>
     // 				<ul ng-switch-when="dropdown" class="dropdown-menu">
     // 					<li data-ng-repeat="subitem in item.items" data-ng-if="subitem.shouldRender(authentication.user);" ui-route="{{subitem.uiRoute}}" ng-class="{active: $uiRoute}">
     // 						<a href="/#!/{{subitem.link}}" data-ng-bind="subitem.title"></a>
     // 					</li>
     // 				</ul>
     // 				<a ng-switch-default href="/#!/{{item.link}}" data-ng-bind="item.title"></a>
     // 			</li>
     // 		</ul>
     // 		<ul class="nav navbar-nav navbar-right" data-ng-hide="authentication.user">
     // 			<li ui-route="/signup" ng-class="{active: $uiRoute}">
     // 				<a href="#">JobSeekers<a>
     // 				<a href="#" class="dropdown-toggle" data-toggle="dropdown">
     // 					<span></span> <b class="caret"></b>
     // 				</a>
     // 			</li>
     // 			<li ui-route="/signup" ng-class="{active: $uiRoute}">
     // 				<a href="/#!/employer_signup">Employers Signup</a>
     // 			</li>
     // 			<li class="divider-vertical"></li>
     // 			<li ui-route="/signin" ng-class="{active: $uiRoute}">
     // 				<a href="/#!/signin">Signin</a>
     // 			</li>
     // 		</ul>
     // 		<!-- <ul class="nav navbar-nav navbar-right" data-ng-hide="authentication.user">
     // 			<li class="dropdown">
     // 				<a href="#" class="dropdown-toggle" data-toggle="dropdown">
     // 					<span data-ng-bind="authentication.user"></span> <b class="caret"></b>
     // 				</a>
     // 				<ul class="dropdown-menu">
     // 					<li>
     // 						<a href="/#!/settings/profile">Edit Profile</a>
     // 					</li>
     // 					<li>
     // 						<a href="/#!/settings/accounts">Manage Social Accounts</a>
     // 					</li>
     // 					<li data-ng-show="authentication.user.provider === 'local'">
     // 						<a href="/#!/settings/password">Change Password</a>
     // 					</li>
     // 					<li class="divider"></li>
     // 					<li>
     // 						<a href="/auth/signout">Signout</a>
     // 					</li>
     // 				</ul>
     // 			</li>
     // 		</ul> -->
     // 		<ul class="nav navbar-nav navbar-right" data-ng-show="authentication.user">
     // 			<li class="dropdown">
     // 				<a href="#" class="dropdown-toggle" data-toggle="dropdown">
     // 					<span data-ng-bind="authentication.user.displayName"></span> <b class="caret"></b>
     // 				</a>
     // 				<ul class="dropdown-menu">
     // 					<li>
     // 						<a href="/#!/settings/profile">Edit Profile</a>
     // 					</li>
     // 					<li>
     // 						<a href="/#!/settings/accounts">Manage Social Accounts</a>
     // 					</li>
     // 					<li data-ng-show="authentication.user.provider === 'local'">
     // 						<a href="/#!/settings/password">Change Password</a>
     // 					</li>
     // 					<li class="divider"></li>
     // 					<li>
     // 						<a href="/auth/signout">Signout</a>
     // 					</li>
     // 				</ul>
     // 			</li>
     // 		</ul>
     // 	</nav>
     // </div>
'use strict';
//Setting up route
angular.module('jobs').config([
  '$stateProvider',
  function ($stateProvider) {
    // Jobs state routing
    $stateProvider.state('listJobs', {
      url: '/jobs',
      templateUrl: 'modules/jobs/views/list-jobs.client.view.html'
    }).state('createJob', {
      url: '/jobs/create',
      templateUrl: 'modules/jobs/views/create-job.client.view.html'
    }).state('viewJob', {
      url: '/jobs/:jobId',
      templateUrl: 'modules/jobs/views/view-job.client.view.html'
    }).state('apply_Job', {
      url: '/jobs/:jobId/application_complete',
      templateUrl: 'modules/jobs/views/apply-job.client.view.html'
    }).state('editJob', {
      url: '/jobs/:jobId/edit',
      templateUrl: 'modules/jobs/views/edit-job.client.view.html'
    }).state('view_applicant', {
      url: 'jobs/:jobId/employer/view_details',
      templateUrl: 'modules/jobs/views/applicants_view-jobs.client.view.html'
    });
  }
]);  // db.name.find()
'use strict';
// Jobs controller
angular.module('jobs').controller('JobsController', [
  '$scope',
  '$http',
  '$stateParams',
  '$location',
  'Authentication',
  'Jobs',
  function ($scope, $http, $stateParams, $location, Authentication, Jobs) {
    $scope.authentication = Authentication;
    // Create new Job
    $scope.create = function () {
      // Create new Job object
      var job = new Jobs({
          title: this.title,
          description: this.description,
          vacancyNumber: this.vacancyNumber,
          industry: this.industry,
          location: this.location
        });
      // Redirect after save
      job.$save(function (response) {
        $location.path('jobs/' + response._id);
      }, function (errorResponse) {
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
    $scope.remove = function (job) {
      if (job) {
        job.$remove();
        for (var i in $scope.jobs) {
          if ($scope.jobs[i] === job) {
            $scope.jobs.splice(i, 1);
          }
        }
      } else {
        $scope.job.$remove(function () {
          $location.path('jobs');
        });
      }
    };
    // Update existing Job
    $scope.update = function () {
      var job = $scope.job;
      job.$update(function () {
        $location.path('jobs/' + job._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.createApplication = function () {
      console.log($scope.job._id);
      var url = '/jobs/' + $scope.job._id + '/apply';
      console.log(url, 'done');
      $http.get(url).success(function (response) {
        // If successful show success message and clear form
        console.log('in call back function');
        $scope.success = true;
        console.log('success');
        $location.path('jobs/' + $scope.job._id + '/application_complete');
      }).error(function (response) {
        $scope.error = response.message;
      });  // $http({method: 'GET', url: url}).
           //     success(function(data, status, headers, config) {
           //     	console.log('apply_location');
           //       $location.path('jobs/' + $scope.job._id + '/application_complete');
           //     }).
           //     error(function(data, status, headers, config) {
           //       console.log('failed to apply!');
           // });
    };
    $scope.applicants = function () {
      console.log('applicant');
      var job = $scope.job;
      $location.path('jobs/' + $scope.job._id + '/view_details');
      console.log('done');
    };
    // Find a list of Jobs
    $scope.find = function () {
      //	console.log(Jobs.query());
      $scope.jobs = Jobs.query();
    };
    // Find existing Job
    $scope.findOne = function () {
      // console.log($stateParams);
      $scope.job = Jobs.get({ jobId: $stateParams.jobId });
    };
  }
]);'use strict';  // //Jobs service used to communicate Jobs REST endpoints
               // angular.module('jobs').filter('searchFor', function(){
               // 	return function(arr, searchString){
               // 		// if(!searchString){
               // 		// 	return arr;
               // 		// }
               // 		// var result = [];
               // 		searchString = user._id.toLowerCase();
               // 		// Using the forEach helper method to loop through the array
               // 		angular.forEach(arr, function(job){
               // 			if(job.applicants.toLowerCase().indexOf(searchString) !== -1){
               // 				result.push(job);
               // 			}
               // 		});
               // 		return result;
               // 	};
               // });
'use strict';
//Jobs service used to communicate Jobs REST endpoints
angular.module('jobs').filter('searcher', function () {
  return function (arr, searchJob) {
    if (!searchJob) {
      return arr;
    }
    var result = [];
    searchJob = searchJob.toLowerCase();
    // Using the forEach helper method to loop through the array
    angular.forEach(arr, function (job) {
      if (job.title.toLowerCase().indexOf(searchJob) !== -1) {
        result.push(job);
      }
    });
    return result;
  };
});'use strict';
//Jobs service used to communicate Jobs REST endpoints
angular.module('jobs').factory('Jobs', [
  '$resource',
  function ($resource) {
    return $resource('jobs/:jobId', { jobId: '@_id' }, {
      update: { method: 'PUT' },
      post: { params: { user: '' } }
    });
  }
]);'use strict';
// Config HTTP Error Handling
angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              // Redirect to signin page
              $location.path('signin');
              break;
            case 403:
              // Add unauthorized behaviour 
              break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);'use strict';
// Setting up route
angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider.state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).state('seeker_signup', {
      url: '/seeker_signup',
      templateUrl: 'modules/users/views/seeker_signup.client.view.html'
    }).state('employer_signup', {
      url: '/employer_signup',
      templateUrl: 'modules/users/views/employer_signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/signin.client.view.html'
    });  // state('jobseeker_signin', {
         // 	url: '/signin',
         // 	templateUrl: 'modules/users/views/jobseeker_signin.client.view.html'
         // });
  }
]);  /*
		$stateProvider.
		state('employer_home', {
			url: '/',
			templateUrl: 'modules/jobs/views/employer_list-jobs.client.view.html'
		});*/
     // $stateProvider.
     // state('seeker_home', {
     // 	url: '/',
     // 	templateUrl: 'modules/jobs/views/seeker_list-jobs.client.view.html'
     // });
'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    // if ($scope.authentication.user) $location.path('/');
    $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        console.log($scope.authentication.user);
        console.log($scope.authentication.user._type);
        console.log($scope.authentication.user.companyName);
        console.log($scope.authentication.user._id);
        //And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        console.log($scope.authentication.user._type);
        console.log($scope.authentication.user.companyName);
        console.log($scope.authentication.user._id);
        console.log($scope.authentication.user);
        //And redirect to the index page
        $location.path('/jobs');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/');
    // Check if there are additional accounts 
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }
      return false;
    };
    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    };
    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;
      $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Update a user profile
    $scope.updateUserProfile = function () {
      $scope.success = $scope.error = null;
      var user = new Users($scope.user);
      console.log(user);
      user.$update(function (response) {
        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
// Authentication service for user variables
angular.module('users').factory('Authentication', [function () {
    var _this = this;
    _this._data = { user: window.user };
    return _this._data;
  }]);'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);