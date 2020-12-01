app.controller('confirmModalController', function($scope, $uibModalInstance,
		message) {
	$scope.modalMessage = message;
	$scope.modalOk = function() {
		$uibModalInstance.close("ok");
	};

	$scope.modalCancel = function() {
		$uibModalInstance.close("cancel");
	};
});
