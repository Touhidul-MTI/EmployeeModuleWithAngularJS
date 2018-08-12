employeeApp.config(function($routeProvider, $locationProvider) {
	$routeProvider.when("/", {
		templateUrl : "../templates/employeeListpage.html",
		controller : "employeeListControllerNew"
	})
	.when("/employees", {
		templateUrl : "../templates/employeeListpage.html",
		controller : "employeeListControllerNew"
	})
	.when("/details/:id", {
		templateUrl : "../templates/employeeDetailsCreateEdit_page.html",
		controller : "employeeDetailsController"
	});
	
	//// locationProvider is just to remove '#' from url in browser (optional)
	$locationProvider.html5Mode(true).hashPrefix('');
	
});
