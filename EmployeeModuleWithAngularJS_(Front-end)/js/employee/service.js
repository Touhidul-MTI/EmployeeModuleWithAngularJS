employeeApp.service('employeeListServiceNew', function ($http) {
	//var rootUrl = 'http://192.168.96.71:8080';
	var rootUrl = "http://localhost:8080";
	this.getEmployees = function (pageNo) {
		return $http.post(rootUrl + '/allemployees/' + pageNo);
	};

	this.searchByEmployeeName = function (input) {
		var response = $http.post(rootUrl + '/employees/search/' + input).then(
			function (res) {
				return res;
			}, function (error) {
				return error;
			});
		return response;
	};
	this.saveEmployee = function (employeeField) {
		return $http.post(rootUrl + '/employees/createemployee', employeeField);
	},
		this.getCompanies = function () {
			return $http.get(rootUrl + '/allcompanies');
		};
	this.getDepartments = function () {
		return $http.get(rootUrl + '/alldepartments');
	};
	this.getJobtitles = function () {
		return $http.get(rootUrl + '/alljobtitles');
	};
	this.getCountries = function () {
		return $http.get(rootUrl + '/allcountries');
	};
	this.getAllEmployeeNames = function () {
		return $http.get(rootUrl + '/allemployeenames');
	};
});
