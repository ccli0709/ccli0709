var app = angular.module('app', [ 'ngAnimate', 'ui.bootstrap' ]);

app.controller('controller', function($scope, $log, $http, $uibModal) {

console.log("!!!");
	// 顯示資料與分頁設定
	$scope.items=[];
	$scope.pagination = {
		totalItems : 0,
		itemsPerPage : 10,
		currentPage : 1,
		numPages : 0,
		maxSize : 5,
		sortField : '',
		sortDirection : '',
		queryString: ''
	};		
	$scope.keyword='';
	
	$scope.read = function() {
		
		// 關鍵字
		var queryString = "keyword:" + encodeURI($scope.keyword);
		
		// 透過RESTFul來取得分頁查詢資料
		var url = "/rest/member";
		// var url = "/api/tasks?itemsPerPage=" + $scope.pagination.itemsPerPage
		// + "&currentPage=" + $scope.pagination.currentPage
		// + "&sortField=" + $scope.pagination.sortField
		// + "&sortDirection=" + $scope.pagination.sortDirection
		// + "&queryString=" + queryString;

		$scope.isLoading = true;
		$scope.severity = "Success";
		$scope.message = '資料讀取中...';
		
		$http.get(url)
		.success(function(data) {
			$scope.severity = data.severity;
			$scope.message = data.message;
			$scope.pagination = data.pagination;
			$scope.items = data.items;
		})
		.error(function(data, status) {
			$log.error('Repos error', status, data);
		})
		.finally(function() {
			$scope.isLoading = false;
			$log.log("finally finished repos");
		});
	
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