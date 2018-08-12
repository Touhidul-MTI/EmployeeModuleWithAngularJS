testApp.directive("myDirective", function() {
    return {
        restrict : "E",
   template : "<label>Made by a directive!</label><br><input type='text' placeholder='Enter name'/>"
    };
});

testApp.directive("myCustomDirective", function() {
    return {
        restrict : "C",
        template : "<label>Enter email</label><br><input type='email' placeholder='Enter valid email'/>"
    };
});

testApp.directive("customAttributeDir", function(){
	return {
		restrict: "A",
		scope : {
			inputValue : "@customAttributeDir"//only receive from view
		},
		templateUrl: 'customAttributeDir.html'
	}
});

testApp.directive("customElementDir", function(){
	return {
		restrict: "E",
		
		templateUrl: 'customElementDir.html'
	}
});

testApp.directive("directiveWithItsOwnController", function(){
	return{
		restrict: "E",
		controller: 'directiveOwnController',
		template: '<input type="text" ng-model="dwioc"/><button ng-click="testDirectiveController()">'
			+'Test directive with its own controller</button><label>{{dwiocResult}}</label>'
	}
});
