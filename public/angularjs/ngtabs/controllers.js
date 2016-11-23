app.controller('controller', function($scope, $log, $location, $uibModal) {

	$scope.alerts = [ {
		type : 'danger',
		msg : 'Oh snap! Change a few things up and try submitting again.'
	}, {
		type : 'success',
		msg : 'Well done! You successfully read this important alert message.'
	} ];

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.tabs = [ {
		title : 'Dynamic Title 1',
		content : 'Dynamic content 1'
	}, {
		title : 'Dynamic Title 2',
		content : 'Dynamic content 2',
		disabled : true
	} ];

	$scope.alertMe = function() {
		setTimeout(function() {
			$window.alert('You\'ve selected the alert tab!');
		});
	};

	$scope.model = {
		name : 'Tabs'
	};

	$scope.updateView = function(view) {
		$location.path(view);
	}
});