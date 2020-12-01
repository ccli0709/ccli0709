app.controller('pickTaskModalController',
		function($scope, $log, $uibModalInstance, $http) {
	
			$scope.modalTitle = "[TASK]任務挑選清單"
				
			// 取消UI載入中按鈕及輸入方法禁用,因為會造成畫面操作不便
			$scope.isLoading = false;
			$scope.isSuccess = false;
			$scope.message = "";
				
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
				// var url = "../rest/msm0/list?itemsPerPage=" +
				// $scope.pagination.itemsPerPage
				// + "&currentPage=" + $scope.pagination.currentPage
				// + "&sortField=" + $scope.pagination.sortField
				// + "&sortDirection=" + $scope.pagination.sortDirection
				// + "&queryString=" + queryString;

				
				
				// 透過RESTFul來取得分頁查詢資料
				var url = "/api/tasks?itemsPerPage=" + $scope.pagination.itemsPerPage
						+ "&currentPage=" + $scope.pagination.currentPage
						+ "&sortField=" + $scope.pagination.sortField
						+ "&sortDirection=" + $scope.pagination.sortDirection
						+ "&queryString=" + queryString;

				$scope.isLoading = true;
				$scope.isSuccess = false;
				$scope.message = '資料讀取中...';
				
				$http.get(url)
				.success(function(data) {
					$scope.isSuccess = data.isSuccess;
					$scope.message = data.message;
					$scope.pagination = data.pagination;
					$scope.items = data.tasks;
				})
				.error(function(data, status) {
					$log.error('Repos error', status, data);
				})
				.finally(function() {
					$scope.isLoading = false;
					$log.log("finally finished repos");
				});
				
// $scope.isLoading = true;
// $http.get(url).success(function(data, status) {
//
// // 回寫資料
// $scope.items = data.items;
// // 回寫分頁設定
// $scope.pagination.totalItems = data.totalItems;
// $scope.pagination.itemsPerPage = data.itemsPerPage;
// $scope.pagination.currentPage = data.currentPage;
//					
// $scope.isSuccess = data.isSuccess;
// $scope.message = data.message;
// }).error(function(data, status) {
// $scope.isSuccess = false;
// $scope.message = "..發生不明異常...";
// }).finally(function() {
// $scope.isLoading = false;
// });
			};
			$scope.read();
			
			// 按下排序按鈕
			$scope.sort = function(field,direction){
				$scope.pagination.sortField = field;
				$scope.pagination.sortDirection = direction;
				$scope.read();
			}
			
			// 按下選擇按鈕
			$scope.modalOk = function(index) {	
				$log.log($scope.items[index]);
				$uibModalInstance.close($scope.items[index]);
			};
			
			// 按下取消按鈕
			$scope.modalCancel = function() {
				$uibModalInstance.close();
			};
		});