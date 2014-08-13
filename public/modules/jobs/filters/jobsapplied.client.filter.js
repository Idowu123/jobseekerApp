'use strict';

//Jobs service used to communicate Jobs REST endpoints
angular.module('jobs').filter('searcher', function(){
	return function(arr, searchJob){
		if(!searchJob){
			return arr;
		}
		var result = [];
		searchJob = searchJob.toLowerCase();
		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(job){
			if(job.title.toLowerCase().indexOf(searchJob) !== -1){
				result.push(job);
			}
		});
		return result;
	};

});