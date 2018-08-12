// ---employee list controller--
employeeApp.controller('employeeListControllerNew', function ($rootScope,
	$scope, employeeListServiceNew, NgTableParams) {

	$scope.isVisible_detailsMode = false;
	$scope.isVisible_createMode = false;
	$scope.isEditMode = false;

	$scope.error = false;

	$scope.edit_save = "Edit";
	$scope.create_discard = "Create";

	$scope.pageNo = 0;// default page number
	$scope.pageSize = 10;

	// ---show employee list---
	$rootScope.showEmployees = function () {
		$scope.pageNo = 0;// might change for pagination, so reset
		$scope.loadEmployees();

		$scope.advanceSearch = '';
		$scope.selections = [{
			id: 'selection1'
		}];
	}

	// ---load employees to show in table---
	$rootScope.loadEmployees = function () {

		var promise = employeeListServiceNew.getEmployees($scope.pageNo);

		promise.then(function (responsedEmployees) {
			if (responsedEmployees.data.length != 0) {
				$rootScope.employees = responsedEmployees.data;

				$scope.setTableData($scope.employees);

				// page info set
				$scope.serialCounter = $scope.pageNo * $scope.pageSize;
				$scope.pageInfo = ($scope.serialCounter + 1) + '-'
					+ ($scope.serialCounter + $scope.pageSize) + ' / '
					+ responsedEmployees.data.length;
			} else {
				$scope.pageNo -= 1;
			}
		}, function (response) {
			console.log(response);
		});
	}

	$scope.showEmployees();

	//--- set table data ---
	$scope.setTableData = function (data) {
		$scope.tableParams = new NgTableParams({
			page: 1,
			count: 3
		}, {
				counts: [5, 8, 10],
				dataset: data
			});
	}

	// ---pagination---

	// takes back to previous page
	$scope.gotoPreviousPage = function () {
		if ($scope.pageNo == 0) {
			// do nothing
		} else {
			$scope.pageNo -= 1;
			$scope.loadEmployees();
		}
	}
	// takes to next page
	$scope.gotoNextPage = function () {
		$scope.pageNo += 1;
		$scope.loadEmployees();
	}

	// ---normal search---
	$scope.submitSearchQuery = function () {
		var input = $scope.inputEmployeeName;

		if (input != '') {
			var promise = employeeListServiceNew
				.searchByEmployeeName(input);

			promise.then(function (response) {
				$scope.employees = response.data;

				$scope.setTableData($scope.employees);

			}, function (response) {
				console.log(response);
			});
		}
	}

	// ---advance search---

	// add a option
	$scope.addMoreSelections = function () {
		var newSelection = $scope.selections.length + 1;
		$scope.selections.push({
			'id': 'selection' + newSelection
		});
	}
	// remove the last option
	$scope.removeSelection = function () {
		var lastSelection = $scope.selections.length - 1;
		$scope.selections.splice(lastSelection);
	};

	// advance search pre phase
	$scope.submitAdvanceSearchQuery = function () {
		$scope.validSearchInputCounter = 0;

		if ($scope.selections.length == 1) {// only one search option
			if ($scope.selections[0].searchBy
				&& $scope.selections[0].input) {
				$scope.doAdvanceSearch();
			}
		} else if ($scope.selections.length > 1) {// more than one search option

			for (var i = 0; i < $scope.selections.length; i++) {

				if (i == 0) {// for first option and input
					if ($scope.selections[i].searchBy && $scope.selections[i].input) {
						$scope.validSearchInputCounter++;
					}
				} else {// for next option, input and pre AND/OR
					if ($scope.selections[i].searchBy && $scope.selections[i].input && $scope.selections[i - 1]) {
						$scope.validSearchInputCounter++;
					}
				}
			}

			if ($scope.validSearchInputCounter == $scope.selections.length) {
				$scope.doAdvanceSearch();
			}
		}

	}

	// advance search operation
	$scope.doAdvanceSearch = function () {

		// advanceSearch filter
		$scope.advanceSearch = function (item) {
			if ($scope.selections.length != 0) {
				if ($scope.selections[0].searchBy && $scope.selections[0].input) {
					var flag = item[$scope.selections[0].searchBy].toLowerCase().indexOf($scope.selections[0].input) > -1;
				}
			}

			if ($scope.selections.length > 1) {// multiple options selected

				for (var i = 1; i < $scope.selections.length; i++) {

					if ($scope.selections[i].searchBy && $scope.selections[i].input) {// option selected & input filled up

						if ($scope.selections[i - 1].operator == 'AND') {// AND operation
							flag = flag && (item[$scope.selections[i].searchBy].toLowerCase().indexOf($scope.selections[i].input) > -1);

						} else if ($scope.selections[i - 1].operator == 'OR') {// OR operation
							flag = flag || (item[$scope.selections[i].searchBy].toLowerCase().indexOf($scope.selections[i].input) > -1);
						}
					}
				}
			}
			return flag;
		}
	}
});

// ---employee details controller---
employeeApp.controller('employeeDetailsController', function ($scope, $rootScope,
	employeeListServiceNew, $routeParams) {
	$scope.isVisible_detailsMode = true;
	$scope.isVisible_createMode = false;
	$scope.isEditMode = false;
	$scope.error = false;

	$scope.selectedEmployeeId = $routeParams.id;

	$scope.employees.forEach(function (employee) {
		if (employee.id == $scope.selectedEmployeeId) {
			$rootScope.responsedEmployee = employee;
		}
	})

	// ---employee details view---
	$scope.showEmployeeDetails = function (id) {

		if ($scope.responsedEmployee) {

			if ($scope.responsedEmployee.profilePicture != null) {
				$scope.photo = '../employee-photo/'
					+ $scope.responsedEmployee.profilePicture;
			} else {
				$scope.photo = '../img/nophoto.jpg';
			}

			if ($scope.responsedEmployee.manager != null) {
				$scope.manager = $scope.responsedEmployee.manager;
			}
			if ($scope.responsedEmployee.coach != null) {
				$scope.coach = $scope.responsedEmployee.coach;
			}

		} else {
			console.log('employee selection error: ' + $scope.responsedEmployee);
		}
	}

	$scope.showEmployeeDetails($scope.selectedEmployeeId);

});

// ---employee create and edit controller---
employeeApp.controller('createEmployeeController', function ($scope, employeeListServiceNew, $location, $routeParams) {
	// ---loading and setting master data---
	$scope.loadAndSetMasterData = function () {
		var promise = employeeListServiceNew.getCompanies();
		promise.then(function (response) {
			if (response.data.length != 0) {
				$scope.companies = response.data;
			}
		}, function (response) {
			console.log(response);
		});

		promise = employeeListServiceNew.getDepartments();
		promise.then(function (response) {
			if (response.data.length != 0) {
				$scope.departments = response.data;
			}
		}, function (response) {
			console.log(response);
		});

		promise = employeeListServiceNew.getJobtitles();
		promise.then(function (response) {
			if (response.data.length != 0) {
				$scope.jobTitles = response.data;
			}
		}, function (response) {
			console.log(response);
		});

		promise = employeeListServiceNew.getAllEmployeeNames();
		promise.then(function (response) {
			if (response.data.length != 0) {
				$scope.employeeNames = response.data;
			}
		}, function (response) {
			console.log(response);
		});
		promise = employeeListServiceNew.getCountries();
		promise.then(function (response) {
			if (response.data.length != 0) {
				$scope.countries = response.data;
			}
		}, function (response) {
			console.log(response);
		});
	}

	if ($routeParams.employeeId) {//route to edit employee details

		$scope.isVisible_detailsMode = false;
		$scope.isVisible_createMode = true;
		$scope.isEditMode = true;

		$scope.edit_save = "Save";
		$scope.create_discard = "Discard";
		// ---edit employee form setup---
		$scope.editEmployeeForm = function () {

			$scope.formatedDateOfBirth = new Date($scope.responsedEmployee.dateOfBirth);
			$scope.responsedEmployee.dateOfBirth = $scope.formatedDateOfBirth;

			$scope.employeeField = $scope.responsedEmployee;
			$scope.errors = {};

			$scope.loadAndSetMasterData();
		}
		$scope.editEmployeeForm();

	} else {//route to create employee 

		$scope.isVisible_detailsMode = false;
		$scope.isVisible_createMode = true;
		$scope.isEditMode = false;

		$scope.edit_save = "Save";
		$scope.create_discard = "Discard";

		// ---create employee form setup---
		$scope.createEmployeeForm = function () {
			// --clean and setup mock photo
			angular.element("input[type='file']").val(null);
			$scope.photo = '../img/camera.png';
			$('#photoPreviewId').attr('src', $scope.photo);

			$scope.loadAndSetMasterData();

			$scope.employeeField = {};
			$scope.errors = {};
		}

		$scope.createEmployeeForm();
	}

	// ---create employee--
	$scope.createEmployee = function (id) {

		/*
		 * if (document.getElementById("profilePhoto").value !=
		 * "") { $scope.createProfilePicture(); }
		 */

		promise = employeeListServiceNew.saveEmployee($scope.employeeField);
		promise.then(function (response) {

			if (response.data.validated) {

				if ($scope.isEditMode) {
					$scope.backToEmployeeDetails(id);
				} else {
					$scope.backToEmployeeList();
				}

				$('#formId')[0].reset();
				$("span.error").hide();
			} else {

				$scope.errors = response.data.errorMessages;

			}
		}, function (response) {
			console.log(response);
		});
	}

	$scope.backToEmployeeList = function () {
		$location.path('/');
	}
	$scope.backToEmployeeDetails = function (employeeId) {
		$location.path('/' + employeeId);
	}
});