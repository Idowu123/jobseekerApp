'use strict';

(function() {
	// Jobseekers Controller Spec
	describe('Jobseekers Controller Tests', function() {
		// Initialize global variables
		var JobseekersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Jobseekers controller.
			JobseekersController = $controller('JobseekersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Jobseeker object fetched from XHR', inject(function(Jobseekers) {
			// Create sample Jobseeker using the Jobseekers service
			var sampleJobseeker = new Jobseekers({
				name: 'New Jobseeker'
			});

			// Create a sample Jobseekers array that includes the new Jobseeker
			var sampleJobseekers = [sampleJobseeker];

			// Set GET response
			$httpBackend.expectGET('jobseekers').respond(sampleJobseekers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.jobseekers).toEqualData(sampleJobseekers);
		}));

		it('$scope.findOne() should create an array with one Jobseeker object fetched from XHR using a jobseekerId URL parameter', inject(function(Jobseekers) {
			// Define a sample Jobseeker object
			var sampleJobseeker = new Jobseekers({
				name: 'New Jobseeker'
			});

			// Set the URL parameter
			$stateParams.jobseekerId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/jobseekers\/([0-9a-fA-F]{24})$/).respond(sampleJobseeker);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.jobseeker).toEqualData(sampleJobseeker);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Jobseekers) {
			// Create a sample Jobseeker object
			var sampleJobseekerPostData = new Jobseekers({
				name: 'New Jobseeker'
			});

			// Create a sample Jobseeker response
			var sampleJobseekerResponse = new Jobseekers({
				_id: '525cf20451979dea2c000001',
				name: 'New Jobseeker'
			});

			// Fixture mock form input values
			scope.name = 'New Jobseeker';

			// Set POST response
			$httpBackend.expectPOST('jobseekers', sampleJobseekerPostData).respond(sampleJobseekerResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Jobseeker was created
			expect($location.path()).toBe('/jobseekers/' + sampleJobseekerResponse._id);
		}));

		it('$scope.update() should update a valid Jobseeker', inject(function(Jobseekers) {
			// Define a sample Jobseeker put data
			var sampleJobseekerPutData = new Jobseekers({
				_id: '525cf20451979dea2c000001',
				name: 'New Jobseeker'
			});

			// Mock Jobseeker in scope
			scope.jobseeker = sampleJobseekerPutData;

			// Set PUT response
			$httpBackend.expectPUT(/jobseekers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/jobseekers/' + sampleJobseekerPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid jobseekerId and remove the Jobseeker from the scope', inject(function(Jobseekers) {
			// Create new Jobseeker object
			var sampleJobseeker = new Jobseekers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Jobseekers array and include the Jobseeker
			scope.jobseekers = [sampleJobseeker];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/jobseekers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleJobseeker);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.jobseekers.length).toBe(0);
		}));
	});
}());