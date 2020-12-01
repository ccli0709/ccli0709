app
		.controller(
				'controller',
				function($scope) {

					// 在task裡可以設定click事件
					// color可以指定task的顏色
					$scope.handleTaskIconClick = function(model) {
						// alert(model);
					};

					// JavaScript counts months from 0 to 11. January is 0.
					// December is 11.
					$scope.getToday = new Date();
					$scope.getFromDate = new Date(
							$scope.getToday.getFullYear(), $scope.getToday
									.getMonth() - 1, 1);
					$scope.getToDate = new Date($scope.getFromDate
							.getFullYear(), $scope.getFromDate.getMonth() + 1,
							1);

					$scope.$watch('getFromDate', function(newValue, oldValue) {
						$scope.getToDate = new Date(newValue.getFullYear(),
								newValue.getMonth() + 1, newValue.getDate())

					}, true);

					$scope.myDate = new Date();
					$scope.popup1 = {
						opened : false
					};
					$scope.open1 = function() {
						$scope.popup1.opened = true;
					};

					$scope.headersFormats = {
						'year' : 'YYYY',
						'quarter' : '[Q]Q YYYY',
						month : 'YYYY年MM月',
						week : 'w',
						day : 'D',
						hour : 'H',
						minute : 'HH:mm'
					};

					$scope.dateFrames = {
						halloween : {
							date : moment('2014-10-31', 'YYYY-MM-DD'), // A
							// specific
							// date
							targets : [ 'day' ]
						// Use timeFrame named day for halloween. We won't close
						// for noon.
						},
						holidays : {
							start : moment('2014-08-15', 'YYYY-MM-DD'), // A
							// date
							// range
							end : moment('2014-08-30', 'YYYY-MM-DD'),
							targets : [ 'closed' ]
						// use timeFrame named closed for this date range.
						},
						weekend : {
							evaluator : function(date) { // A custom function
								// evaluated for
								// each day in the
								// gantt
								return date.isoWeekday() === 6
										|| date.isoWeekday() === 7;
							},
							targets : [ 'closed' ]
						// Use timeFrame named closed for saturday and sunday.
						}
					};

					$scope.data = [

							{
								name : 'AC001',
								tasks : [
										{
											name : '裝貨港',
											content : '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
											color : '#CCCCCC',
											from : new Date(2016, 9, 7, 0, 0, 0),
											to : new Date(2016, 9, 10, 0, 0, 0),
											progress : 100
										},
										{
											name : '由裝貨港前往高雄港',
											content : '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
											color : '#F1C232',
											from : new Date(2016, 9, 10, 0, 0,
													0),
											to : new Date(2016, 9, 16, 0, 0, 0),
											est : new Date(2016, 9, 8, 8, 0, 0),
											lct : new Date(2016, 9, 18, 20, 0,
													0),
											progress : 100
										},
										{
											name : '高雄港',
											content : '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
											color : '#009900',
											from : new Date(2016, 9, 16, 0, 0,
													0),
											to : new Date(2016, 9, 18, 0, 0, 0),
											progress : 100
										} ]
							},
							{
								name : 'AC002',
								tasks : [
										{
											name : '裝貨港',
											content : '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
											color : '#CCCCCC',
											from : new Date(2016, 9, 20, 0, 0,
													0),
											to : new Date(2016, 9, 30, 0, 0, 0),
											progress : 100
										},
										{
											name : '由裝貨港前往高雄港',
											content : '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
											color : '#F1C232',
											from : new Date(2016, 9, 30, 0, 0,
													0),
											to : new Date(2016, 10, 16, 0, 0, 0),
											est : new Date(2016, 9, 8, 8, 0, 0),
											lct : new Date(2016, 9, 18, 20, 0,
													0),
											progress : 100
										},
										{
											name : '高雄港',
											content : '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
											color : '#009900',
											from : new Date(2016, 10, 16, 0, 0,
													0),
											to : new Date(2016, 10, 18, 0, 0, 0),
											progress : 100
										} ]
							},
							{
								name : 'AC003',
								tasks : [
										{
											name : '裝貨港',
											content : '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
											color : '#CCCCCC',
											from : new Date(2016, 9, 1, 0, 0, 0),
											to : new Date(2016, 9, 2, 0, 0, 0),
											progress : 100
										},
										{
											name : '由裝貨港前往高雄港',
											content : '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
											color : '#F1C232',
											from : new Date(2016, 9, 2, 0, 0, 0),
											to : new Date(2016, 9, 4, 0, 0, 0),
											est : new Date(2016, 9, 8, 8, 0, 0),
											lct : new Date(2016, 9, 18, 20, 0,
													0),
											progress : 100
										},
										{
											name : '高雄港',
											content : '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
											color : '#009900',
											from : new Date(2016, 9, 4, 0, 0, 0),
											to : new Date(2016, 9, 6, 0, 0, 0),
											progress : 100
										} ]
							},
							{
								name : 'AC004',
								tasks : [
										{
											name : '裝貨港',
											content : '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
											color : '#CCCCCC',
											from : new Date(2016, 9, 7, 0, 0, 0),
											to : new Date(2016, 9, 10, 0, 0, 0),
											progress : 100
										},
										{
											name : '由裝貨港前往高雄港',
											content : '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
											color : '#F1C232',
											from : new Date(2016, 9, 10, 0, 0,
													0),
											to : new Date(2016, 9, 16, 0, 0, 0),
											est : new Date(2016, 9, 8, 8, 0, 0),
											lct : new Date(2016, 9, 18, 20, 0,
													0),
											progress : 100
										},
										{
											name : '高雄港',
											content : '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
											color : '#009900',
											from : new Date(2016, 9, 16, 0, 0,
													0),
											to : new Date(2016, 9, 18, 0, 0, 0),
											progress : 100
										} ]
							},
							{
								name : 'AC005',
								tasks : [
										{
											name : '裝貨港',
											content : '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
											color : '#CCCCCC',
											from : new Date(2016, 11, 1, 0, 0,
													0),
											to : new Date(2016, 11, 4, 0, 0, 0),
											progress : 100
										},
										{
											name : '由裝貨港前往高雄港',
											content : '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
											color : '#F1C232',
											from : new Date(2016, 11, 4, 0, 0,
													0),
											to : new Date(2016, 11, 9, 0, 0, 0),
											est : new Date(2016, 9, 8, 8, 0, 0),
											lct : new Date(2016, 9, 18, 20, 0,
													0),
											progress : 100
										},
										{
											name : '高雄港',
											content : '<i class="fa fa-cog" ng-click="scope.handleTaskIconClick(task.model)"></i> {{task.model.name}}',
											color : '#009900',
											from : new Date(2016, 11, 9, 0, 0,
													0),
											to : new Date(2016, 11, 11, 0, 0, 0),
											progress : 100
										} ]
							} ];
				});