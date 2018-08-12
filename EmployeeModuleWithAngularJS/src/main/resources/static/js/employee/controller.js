employeeApp.controller('employeeListControllerNew', function($rootScope,
		$scope, employeeListServiceNew, NgTableParams) {

	$scope.isVisible_detailsMode = false;
	$scope.isVisible_createMode = false;
	$scope.isEditMode = false;

	$scope.error = false;

	$scope.edit_save = "Edit";
	$scope.create_discard = "Create";

	$scope.pageNo = 0;// default page number
	$scope.pageSize = 10;

	// ---employee list---
	$scope.showEmployees = function() {
		$scope.pageNo = 0;// might change for pagination, so reset
		$scope.loadEmployees();

		/*$scope.advanceSearch = '';
		$scope.selections = [ {
			id : 'selection1'
		} ];*/
	}

	// ---employee list view---
	$scope.loadEmployees = function() {

		var promise = employeeListServiceNew.getEmployees($scope.pageNo);

		promise.then(function(responsedEmployees) {
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
		}, function(response) {
			console.log(response);
		});
	}

	$scope.showEmployees();

	//--- set table data ---
	$scope.setTableData = function(data) {
		$scope.tableParams = new NgTableParams({
			page : 1,
			count : 3
		}, {
			dataset : data
		});
	}

	// ---pagination---

	// takes back to previous page
	$scope.gotoPreviousPage = function() {
		if ($scope.pageNo == 0) {
			// do nothing
		} else {
			$scope.pageNo -= 1;
			$scope.loadEmployees();
		}
	}
	// takes to next page
	$scope.gotoNextPage = function() {
		$scope.pageNo += 1;
		$scope.loadEmployees();
	}

	// ---normal search---
	$scope.submitSearchQuery = function() {
		var input = $scope.inputEmployeeName;

		if (input != '') {
			var promise = employeeListServiceNew
					.searchByEmployeeName(input);
			
			promise.then(function(response) {
				$scope.employees = response.data;
				
				$scope.setTableData($scope.employees);
				
			}, function(response) {
				console.log(response);
			});
		}
	}
});

employeeApp.controller('employeeDetailsController', function($scope,
		employeeListServiceNew, $routeParams) {

	$scope.isVisible_detailsMode = true;
	$scope.isVisible_createMode = false;
	$scope.isEditMode = false;
	$scope.error = false;

	$scope.selectedEmployeeId = $routeParams.id;
	
	$scope.employees.forEach(function(employee) {
		if (employee.id == $scope.selectedEmployeeId) {
			$scope.responsedEmployee = employee;
		}
	})

	// ---employee details view---
	$scope.showEmployeeDetails = function(id) {

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


// ---------------  old codes to remove ------------------

employeeApp
		.controller(
				'employeeListController',
				function($scope, employeeListService) {

					$scope.isVisible_employeeList = true;
					$scope.isVisible_employeeDetailsCreateEdit = false;
					$scope.isVisible_detailsMode = true;
					$scope.isVisible_createMode = false;
					$scope.isVisible_createMode = false;
					$scope.isEditMode = false;

					$scope.error = false;

					$scope.edit_save = "Edit";
					$scope.create_discard = "Create";

					$scope.pageNo = 0;// default page number
					$scope.pageSize = 5;

					// ---employee list---
					$scope.showEmployees = function() {
						$scope.pageNo = 0;// might change for pagination, so
						// reset
						$scope.loadEmployees();

						$scope.advanceSearch = '';
						$scope.selections = [ {
							id : 'selection1'
						} ];
					}

					// ---employee list view---
					$scope.loadEmployees = function() {
						if ($scope.isVisible_employeeList == false) {
							$scope.isVisible_employeeList = true;
							$scope.isVisible_employeeDetailsCreateEdit = false;
						}

						var promise = employeeListService
								.getEmployees($scope.pageNo);

						promise
								.then(
										function(responsedEmployees) {
											if (responsedEmployees.data.length != 0) {
												$scope.employees = responsedEmployees.data;

												$scope.serialCounter = $scope.pageNo
														* $scope.pageSize;
												$scope.pageInfo = ($scope.serialCounter + 1)
														+ '-'
														+ ($scope.serialCounter + $scope.pageSize)
														+ ' / '
														+ responsedEmployees.data.length;
											} else {
												$scope.pageNo -= 1;
											}
										}, function(response) {
											console.log(response);
										});
					}
					$scope.showEmployees();

					// ---pagination---

					// takes back to previous page
					$scope.gotoPreviousPage = function() {
						if ($scope.pageNo == 0) {
							// do nothing
						} else {
							$scope.pageNo -= 1;
							$scope.loadEmployees();
						}
					}
					// takes to next page
					$scope.gotoNextPage = function() {
						$scope.pageNo += 1;
						$scope.loadEmployees();
					}

					// ---employee details view---
					$scope.showEmployeeDetails = function(id) {
						// window.location.href = '/employees/' + id;

						$scope.isVisible_employeeList = false;
						$scope.isVisible_employeeDetailsCreateEdit = true;
						$scope.isVisible_detailsMode = true;
						$scope.isVisible_createMode = false;

						var promise = employeeListService
								.getEmployeeDetails(id);

						promise
								.then(
										function(response) {
											if (response.data.length != 0) {

												$scope.responsedEmployee = response.data;

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

											}
										}, function(response) {
											console.log(response);
										});

					}

					// ---create employee form setup---
					$scope.createEmployeeForm = function() {
						$scope.isVisible_employeeList = false;
						$scope.isVisible_employeeDetailsCreateEdit = true;
						$scope.isVisible_detailsMode = false;
						$scope.isVisible_createMode = true;
						$scope.isEditMode = false;

						$scope.edit_save = "Save";
						$scope.create_discard = "Discard";

						// --clean and setup mock photo
						angular.element("input[type='file']").val(null);
						$scope.photo = '../img/camera.png';
						$('#photoPreviewId').attr('src', $scope.photo);

						$scope.loadAndSetMasterData();

						$scope.employeeField = {};
						$scope.errors = {};
					}

					// ---create employee--
					$scope.createEmployee = function(id) {

						/*
						 * if (document.getElementById("profilePhoto").value !=
						 * "") { $scope.createProfilePicture(); }
						 */

						promise = employeeListService
								.saveEmployee($scope.employeeField);
						promise.then(function(response) {

							if (response.data.validated) {

								if ($scope.isEditMode) {
									$scope.showEmployeeDetails(id);
								} else {
									$scope.showEmployees();
								}

								$('#formId')[0].reset();
								$("span.error").hide();
							} else {

								$scope.errors = response.data.errorMessages;

							}
						}, function(response) {
							console.log(response);
						});
					}

					$scope.createProfilePicture = function() {
						console
								.log(document.getElementById("profilePhoto").value);
						/*
						 * $.ajax({ type : 'post', url :
						 * '/create-profile-picture',
						 *  // for multipart file upload enctype :
						 * 'multipart/form-data', data : new
						 * FormData($("#formId")[0]), processData : false,
						 * contentType : false, cache : false,
						 *  // async: true,
						 * 
						 * success : function(response) { console.log(response); },
						 * error : function() { console.log('not ok'); } });
						 */
					}

					// ---edit employee---
					$scope.editEmployeeForm = function() {
						$scope.isVisible_employeeList = false;
						$scope.isVisible_employeeDetailsCreateEdit = true;
						$scope.isVisible_detailsMode = false;
						$scope.isVisible_createMode = true;
						$scope.isEditMode = true;

						$scope.edit_save = "Save";
						$scope.create_discard = "Discard";

						$scope.formatedDateOfBirth = new Date(
								$scope.responsedEmployee.dateOfBirth);
						$scope.responsedEmployee.dateOfBirth = $scope.formatedDateOfBirth;

						$scope.employeeField = $scope.responsedEmployee;
						$scope.errors = {};

						$scope.loadAndSetMasterData();
					}

					// ---loading and setting master data---
					$scope.loadAndSetMasterData = function() {
						var promise = employeeListService.getCompanies();
						promise.then(function(response) {
							if (response.data.length != 0) {
								$scope.companies = response.data;
							}
						}, function(response) {
							console.log(response);
						});

						promise = employeeListService.getDepartments();
						promise.then(function(response) {
							if (response.data.length != 0) {
								$scope.departments = response.data;
							}
						}, function(response) {
							console.log(response);
						});

						promise = employeeListService.getJobtitles();
						promise.then(function(response) {
							if (response.data.length != 0) {
								$scope.jobTitles = response.data;
							}
						}, function(response) {
							console.log(response);
						});

						promise = employeeListService.getAllEmployeeNames();
						promise.then(function(response) {
							if (response.data.length != 0) {
								$scope.employeeNames = response.data;
							}
						}, function(response) {
							console.log(response);
						});
						promise = employeeListService.getCountries();
						promise.then(function(response) {
							if (response.data.length != 0) {
								$scope.countries = response.data;
							}
						}, function(response) {
							console.log(response);
						});
					}

					// ---normal search---
					$scope.submitSearchQuery = function() {
						var input = $scope.inputEmployeeName;

						if (input != '') {
							var promise = employeeListService
									.searchByEmployeeName(input);
							promise.then(function(response) {
								$scope.employees = response.data;
							}, function(response) {
								console.log(response);
							});
						}
					}

					// ---advance search---

					// add a option
					$scope.addMoreSelections = function() {
						var newSelection = $scope.selections.length + 1;
						$scope.selections.push({
							'id' : 'selection' + newSelection
						});
					}
					// remove the last option
					$scope.removeSelection = function() {
						var lastSelection = $scope.selections.length - 1;
						$scope.selections.splice(lastSelection);
					};

					// advance search pre phase
					$scope.submitAdvanceSearchQuery = function() {
						$scope.validSearchInputCounter = 0;

						if ($scope.selections.length == 1) {// only one search
							// option
							if ($scope.selections[0].searchBy
									&& $scope.selections[0].input) {
								$scope.doAdvanceSearch();
							}
						} else if ($scope.selections.length > 1) {// more than
							// one
							// search
							// option

							for (var i = 0; i < $scope.selections.length; i++) {

								if (i == 0) {// for first option and input
									if ($scope.selections[i].searchBy
											&& $scope.selections[i].input) {
										$scope.validSearchInputCounter++;
									}
								} else {// for next option, input and pre AND/OR
									if ($scope.selections[i].searchBy
											&& $scope.selections[i].input
											&& $scope.selections[i - 1]) {
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
					$scope.doAdvanceSearch = function() {

						// advanceSearch filter
						$scope.advanceSearch = function(item) {

							var flag = item[$scope.selections[0].searchBy]
									.toLowerCase().indexOf(
											$scope.selections[0].input) > -1;

							if ($scope.selections.length > 1) {// multiple
								// options
								// selected

								for (var i = 1; i < $scope.selections.length; i++) {

									if ($scope.selections[i].searchBy
											&& $scope.selections[i].input) {// option
										// selected
										// &
										// input
										// filled
										// up

										if ($scope.selections[i - 1].operator == 'AND') {// AND
											// operation
											flag = flag
													&& (item[$scope.selections[i].searchBy]
															.toLowerCase()
															.indexOf(
																	$scope.selections[i].input) > -1);

										} else if ($scope.selections[i - 1].operator == 'OR') {// OR
											// operation
											flag = flag
													|| (item[$scope.selections[i].searchBy]
															.toLowerCase()
															.indexOf(
																	$scope.selections[i].input) > -1);
										}
									}
								}
							}
							return flag;
						}
					}

				});

// ---image preview on upload---
function displayPictureOnBrowse(inputFile) {
	if (inputFile.files && inputFile.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {
			$('#photoPreviewId').attr('src', e.target.result);
		};
		reader.readAsDataURL(inputFile.files[0]);
	}
}

// -------searching try 1, works for AND only

/*
 * $scope.searchFilters = ''; for (var i = 0; i < $scope.selections.length; i++) {
 * if (i == ($scope.selections.length - 1)) { $scope.searchFilters =
 * $scope.searchFilters + '"' + $scope.selections[i].searchBy + '":"' +
 * $scope.selections[i].input + '"'; } else { $scope.searchFilters =
 * $scope.searchFilters + '"' + $scope.selections[i].searchBy + '":"' +
 * $scope.selections[i].input + '",'; } } $scope.searchFilters = '{' +
 * $scope.searchFilters + '}'; $scope.advanceSearch =
 * angular.fromJson($scope.searchFilters);
 */

//--multi search filter try---
/*
 * $scope.search1 = {}; $scope.search2 = {}; $scope.search3 = {};
 * $scope.search4 = {}; $scope.search5 = {}; $scope.search6 = {};
 * $scope.search7 = {};
 * 
 * for (var i = 0; i < $scope.selections.length; i++) { if (i == 0) {
 * $scope.search1 = angular.fromJson('{"' +
 * $scope.selections[i].searchBy + '":"' + $scope.selections[i].input +
 * '"}'); $scope.search.push($scope.search1); } else if (i == 1) {
 * $scope.search2 = angular.fromJson('{"' +
 * $scope.selections[i].searchBy + '":"' + $scope.selections[i].input +
 * '"}');
 * 
 * $scope.search.push($scope.search2); } else if (i == 2) {
 * $scope.search3 = angular.fromJson('{"' +
 * $scope.selections[i].searchBy + '":"' + $scope.selections[i].input +
 * '"}'); } else if (i == 3) { $scope.search4 = angular.fromJson('{"' +
 * $scope.selections[i].searchBy + '":"' + $scope.selections[i].input +
 * '"}'); } else if (i == 4) { $scope.search5 = angular.fromJson('{"' +
 * $scope.selections[i].searchBy + '":"' + $scope.selections[i].input +
 * '"}'); } else if (i == 5) { $scope.search6 = angular.fromJson('{"' +
 * $scope.selections[i].searchBy + '":"' + $scope.selections[i].input +
 * '"}'); } else if (i == 6) { $scope.search7 = angular.fromJson('{"' +
 * $scope.selections[i].searchBy + '":"' + $scope.selections[i].input +
 * '"}'); } }
 */

