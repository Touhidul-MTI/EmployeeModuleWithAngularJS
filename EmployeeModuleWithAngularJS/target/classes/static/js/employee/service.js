employeeApp.service('employeeListServiceNew', function($http) {
	
	this.getEmployees = function(pageNo) {
		return $http.post('/allemployees/' + pageNo);
		var response = $http.post('/allemployees/' + pageNo).then(
				function(res) {
					return res;
				}, function(error) {
					return error;
				});
		return response;
	};
	
	this.searchByEmployeeName = function(input) {
		return $http.post('/employees/search/' + input);
	};
	
	/*
	 * var rootUrl = "http://localhost:8080/";
	 */
	/*this.getEmployees = function(pageNo) {
		var data = $http.post(rootUrl + '/allemployees/' + pageNo).then(
				function(response) {
					return response.data;
				}, function(error) {
					return error.data;
				});
		return data;
	};*/
});

/*employeeApp.service('employeeListService', function($http) {
	return {
		getEmployees : function(pageNo) {
			return $http.post('/allemployees/' + pageNo);
		},
		getEmployeeDetails : function(employeeId) {
			return $http.post('/employees/' + employeeId);
		},
		getCompanies : function() {
			return $http.get('/allcompanies');
		},
		getDepartments : function() {
			return $http.get('/alldepartments');
		},
		getJobtitles : function() {
			return $http.get('/alljobtitles');
		},
		getAllEmployeeNames : function() {
			return $http.get('/allemployeenames');
		},
		getCountries : function() {
			return $http.get('/allcountries');
		},
		saveEmployee : function(employeeField) {
			return $http.post('/employees/createemployee', employeeField);
		},
		searchByEmployeeName : function(input) {
			return $http.post('/employees/search/' + input);
		}
	}
});*/

