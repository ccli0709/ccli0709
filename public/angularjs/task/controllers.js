app.controller("ListController", function($scope, $http, $log, $uibModal, State) {

	// 參數
	$scope.isLoading = false;
	$scope.isSuccess = false;
	
	
	$scope.severity = 'Success';
	$scope.message = '';

	$scope.tasks = [];

	// 顯示資料與分頁設定
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

	$scope.firstLoad = true;
	$log.log(State.listModel);	
	
	// TODO: 設計清單在切換到表單畫面時可以保存上次的分頁狀態
	// 首次載入時就檢查看看STATE裡有沒有
	
	$scope.read = function(){
	
		// 關鍵字
		var queryString = "keyword:" + encodeURI($scope.keyword);
		
		// 透過RESTFul來取得分頁查詢資料
		var url = "/api/tasks?itemsPerPage=" + $scope.pagination.itemsPerPage
				+ "&currentPage=" + $scope.pagination.currentPage
				+ "&sortField=" + $scope.pagination.sortField
				+ "&sortDirection=" + $scope.pagination.sortDirection
				+ "&queryString=" + queryString;

		
		// === 初次載入時檢查 State的內容 ，並回存每次查詢條件  ===
		if($scope.firstLoad && State.listModel.url != ''){
			$scope.keyword = State.listModel.keyword;
			queryString = "keyword:" + encodeURI($scope.keyword);
			url = State.listModel.url;
			
		}
		$scope.firstLoad = false;
		State.listModel.keyword = $scope.keyword;
		State.listModel.url = url;
		// === 初次載入時檢查 State的內容 ，並回存每次查詢條件(END) ===
		
		
		$scope.isLoading = true;
		$scope.isSuccess = false;
		$scope.message = '資料讀取中...';
		
		$http.get(url)
		.success(function(data) {
			$scope.isSuccess = data.isSuccess;
			
			$scope.severity = data.severity;
			$scope.message = data.message;
			$scope.pagination = data.pagination;
			$scope.tasks = data.tasks;
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

	
	
	
	
	$scope.delete = function(taskId) {
				
		var modalInstance = $uibModal.open({
			animation : true,
			templateUrl : '/assets/ng_modals/confirmModal.html',
			controller : 'confirmModalController',
			size : 'sm',
			resolve : {
				message : function() {
					return "確認是否刪除這筆資料？";
				}
			}
		});

		modalInstance.result.then(function(result) {
			// 選擇確認按鈕後就會執行這個方法
			// 反之則只是關閉視窗

			$log.log(result);

			if (result == "ok") {
				var url = '/api/tasks/' + taskId;	
				$scope.isLoading = true;
				$scope.isSuccess = false;
				$scope.message = '資料更新中...';
				
				$http.delete(url,{task: $scope.task})
				.success(function(data) {
					$scope.isSuccess = data.isSuccess;
					$scope.message = data.message;
					$scope.getTask();
				})
				.error(function(data, status) {
					console.error('error', status, data);
				})
				.finally(function() {
					$scope.isLoading = false;
					console.log("finally");
				})
			}

		}, function() {
			// dismissed
		});
		
	};
	
});

app.controller("DetailController", function($scope, $log, $http, $routeParams, $uibModal, $location) {
	
	$scope.isLoading = false;
	$scope.isSuccess = true;
	$scope.message = '---';

	$scope.taskId = $routeParams.taskId;
	$scope.task = {};

	$scope.getTask = function(){
		var url = '/api/tasks/' + $scope.taskId;	
		$scope.isLoading = true;
		$scope.isSuccess = false;
		$scope.message = '資料讀取中...';
	
		$http.get(url)
		.success(function(data) {
			$scope.isSuccess = data.isSuccess;
			$scope.message = data.message;
			$scope.task = data.task;
			$scope.task.status = $scope.task.done ? "9" : "1";
			
		})
		.error(function(data, status) {
			$log.error('Repos error', status, data);
		})
		.finally(function() {
			$scope.isLoading = false;
			$log.log("finally finished repos");
		});
	};
	$scope.getTask();

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
			
			// 挑選到任務之後,用route的redirct來做重新讀取資料的做法
			$location.path( "/detail/" + item.id );
			
		}, function() {
			// dismissed
		});
	};
	
	
	$scope.changeStatus = function() {
		$scope.task.done = $scope.task.status == "9" ? true : false;
		$log.log($scope.task);
	}
	
	$scope.back = function() {
		window.history.back();
	};

	
	$scope.create = function() {
		var url = '/api/tasks';	
		$scope.isLoading = true;
		$scope.isSuccess = false;
		$scope.message = '資料新增中...';
		
		$http.post(url,{task: $scope.task})
		.success(function(data) {
			$scope.isSuccess = data.isSuccess;
			$scope.message = data.message;
			$scope.task = data.task;
			$scope.task.status = $scope.task.done ? "9" : "1";
		})
		.error(function(data, status) {
			console.error('error', status, data);
		})
		.finally(function() {
			$scope.isLoading = false;
			console.log("finally");
		})
		
	};
	
	$scope.update = function() {
		console.log($scope.task);
		var url = '/api/tasks/' + $scope.taskId;	
		$scope.isLoading = true;
		$scope.isSuccess = false;
		$scope.message = '資料更新中...';
		
		$http.put(url,{task: $scope.task})
		.success(function(data) {
			$scope.isSuccess = data.isSuccess;
			$scope.message = data.message;
			$scope.task = data.task;
			$scope.task.status = $scope.task.done ? "9" : "1";
		})
		.error(function(data, status) {
			console.error('error', status, data);
		})
		.finally(function() {
			$scope.isLoading = false;
			console.log("finally");
		})
	};


	$scope.delete = function() {
		
		var modalInstance = $uibModal.open({
			animation : true,
			templateUrl : '/assets/ng_modals/confirmModal.html',
			controller : 'confirmModalController',
			size : 'sm',
			resolve : {
				message : function() {
					return "確認是否刪除這筆資料？";
				}
			}
		});

		modalInstance.result.then(function(result) {
			if (result != "ok") return;
			
			var url = '/api/tasks/' + $scope.taskId;	
			$scope.isLoading = true;
			$scope.isSuccess = false;
			$scope.message = '資料更新中...';
			
			$http.delete(url,{task: $scope.task})
			.success(function(data) {
				$scope.isSuccess = data.isSuccess;
				$scope.message = data.message;
				$scope.task = data.task;
			})
			.error(function(data, status) {
				console.error('error', status, data);
			})
			.finally(function() {
				$scope.isLoading = false;
				console.log("finally");
				$scope.back();
			})
			
		}, function() {
			// dismissed
		});


	};
		
	
});