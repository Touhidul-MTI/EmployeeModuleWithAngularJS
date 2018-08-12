employeeApp.directive('directiveInputField', function () {
	return {
		restrict: "E",
		scope: {
			detailsModeVisible: "=",
			createModeVisible : "=",
			employeeDetail: "=",
			inputField: "=",
			errorMessage: "="
		},
		templateUrl: '../views/directiveTemplate_inputField.html'
	}
});






// employeeApp.directive('directiveDropdownSelection', function () {
// 	return {
// 		restrict: "E",
// 		scope: {
// 			detailsModeVisible: "=",
// 			createModeVisible : "=",
// 			employeeDetail: "=",
// 			inputField: "=",
// 			errorMessage: "="
// 		},
// 		templateUrl: '../views/directiveTemplate_dropdownSelection.html'
// 	}
// });