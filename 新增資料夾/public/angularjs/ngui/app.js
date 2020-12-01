var app = angular.module('app', [ 'ngAnimate', 'ui.bootstrap' ]);

app.controller('controller', function($scope, $log, $uibModal) {

	// === ui.bootstrap.pagination ===
	$scope.customers = {
		totalItems : 0,
		itemsPerPage : 20,
		currentPage : 1,
		numPages : 0,
		maxSize : 5,
		sortField : "id",
		sortDirection : "asc",
		data : []
	};

	$scope.read = function() {
		$scope.customers.totalItems = 1000;
	};
	$scope.read();
	// === ui.bootstrap.pagination (END) ===

	$scope.myDate = new Date();
	$scope.popup1 = {
		opened : false
	};
	$scope.open1 = function() {
		$scope.popup1.opened = true;
	};

	$scope.showConfirm = function() {

		var modalInstance = $uibModal.open({
			animation : true,
			templateUrl : '/assets/ng_modals/confirmModal.html',
			controller : 'confirmModalController',
			size : 'sm',
			resolve : {
				message : function() {
					return "確認是否新增這筆資料？";
				}
			}
		});

		modalInstance.result.then(function(result) {
			// 選擇確認按鈕後就會執行這個方法
			// 反之則只是關閉視窗

			$log.log(result);

			if (result == "ok") {
				$log.log("使用者按下了確認。");
			}

		}, function() {
			// dismissed
		});
	};

	$scope.pickedTask = {};
	$scope.pickTask = function() {
		var modalInstance = $uibModal.open({
			animation : true,
			templateUrl : '/assets/ng_modals/pickTaskModal.html',
			controller : 'pickTaskModalController',
			size : 'lg'
		});

		modalInstance.result.then(function(item) {
			$scope.pickedTask = item;
			$log.log($scope.pickedTask);
		}, function() {
			// dismissed
		});
	};

});