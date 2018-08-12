employeeApp.config(function ($routeProvider) {

	$routeProvider.when("/", {
		templateUrl: "../views/employeeListpage.html",
		controller: "employeeListControllerNew"
	}).when("/employees", {
		templateUrl: "../views/employeeListpage.html",
		controller: "employeeListControllerNew"
	}).when("/create", {
		templateUrl: "../views/employeeDetailsCreateEdit_page.html",
		controller: "createEmployeeController"
	}).when("/edit/:employeeId", {
		templateUrl: "../views/employeeDetailsCreateEdit_page.html",
		controller: "createEmployeeController"
	}).when("/:id", {
		templateUrl: "../views/employeeDetailsCreateEdit_page.html",
		controller: "employeeDetailsController"
	});

	//, $locationProvider
	// locationProvider is just to remove '#' from url in browser (optional)
	// $locationProvider.html5Mode(true).hashPrefix('');
});
