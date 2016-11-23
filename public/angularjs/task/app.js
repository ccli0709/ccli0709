var app = angular.module("myApp", [ "ngRoute", 'ui.bootstrap' ]);

app.factory('State', [ function() {
	return {
		listModel : {
			keyword : '',
			url : ''
		}
	};
} ]);

app.config(function($routeProvider) {
	$routeProvider.when('/list', {
		templateUrl : '/assets/angularjs/task/list.htm',
		controller : 'ListController'
	}).when("/detail/:taskId", {
		templateUrl : '/assets/angularjs/task/detail.htm',
		controller : 'DetailController'
	}).otherwise('/list');
});